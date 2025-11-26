import { Component, OnInit, OnDestroy, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PhotoService, Photo, PhotosStore, FavoritesStore } from '@photo-library/shared/data-access';
import { PhotoGridWithFavoritesComponent, LoadingSpinnerComponent, ImagePreviewModalComponent } from '@photo-library/shared/ui';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lib-photos-list',
  imports: [CommonModule, PhotoGridWithFavoritesComponent, LoadingSpinnerComponent, ScrollingModule, ImagePreviewModalComponent],
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit, OnDestroy {
  private readonly photoService = inject(PhotoService);
  private readonly photosStore = inject(PhotosStore);
  private readonly favoritesStore = inject(FavoritesStore);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  readonly photos = this.photosStore.photos;
  readonly isLoading = this.photosStore.isLoading;
  readonly hasMore = this.photosStore.hasMore;
  
  readonly selectedPhoto = signal<(Photo & { isFavorite: boolean}) | null>(null);
  readonly itemSize = 300;

  private isLoadingMore = false;

  ngOnInit(): void {
    this.photosStore.resetPhotos();
    this.loadInitialPhotos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPhotoClick(photo: Photo): void {
    const isFavorite = this.favoritesStore.isFavorite(photo.id);
    this.selectedPhoto.set({ ...photo, isFavorite });
  }

  onClosePreview(): void {
    this.selectedPhoto.set(null);
  }

  onToggleFavorite(): void {
    const photo = this.selectedPhoto();
    if (photo) {
      this.favoritesStore.toggleFavorite(photo);
      this.selectedPhoto.update(p => p ? { ...p, isFavorite: !p.isFavorite } : null);
    }
  }

  onScroll(event: any): void {
    const scrollTop = event.target.scrollTop;
    const scrollHeight = event.target.scrollHeight;
    const clientHeight = event.target.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 500 && !this.isLoadingMore && this.hasMore() && !this.isLoading()) {
      this.loadMorePhotos();
    }
  }

  private loadInitialPhotos(): void {
    this.photosStore.setLoading(true);
    
    this.photoService.fetchPhotos(1)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (photos) => {
          this.photosStore.addPhotos(photos);
          this.photosStore.setLoading(false);
        },
        error: (error) => {
          this.photosStore.setError(error.message);
          this.photosStore.setLoading(false);
        }
      });
  }

  private loadMorePhotos(): void {
    if (this.isLoadingMore || !this.hasMore()) {
      return;
    }

    this.isLoadingMore = true;
    const currentPage = this.photosStore.currentPage();

    this.photoService.fetchPhotos(currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (photos) => {
          this.photosStore.addPhotos(photos);
          this.isLoadingMore = false;
        },
        error: (error) => {
          console.error('Error loading more photos:', error);
          this.isLoadingMore = false;
        }
      });
  }
}
