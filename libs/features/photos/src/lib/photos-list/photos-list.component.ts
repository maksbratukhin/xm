import { Component, OnInit, OnDestroy, inject, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PhotoService, Photo, PhotosStore, FavoritesStore } from '@photo-library/shared/data-access';
import { PhotoGridWithFavoritesComponent, LoadingSpinnerComponent, ImagePreviewModalComponent } from '@photo-library/shared/ui';
import { Subject, takeUntil, fromEvent, debounceTime, throttleTime } from 'rxjs';

@Component({
  selector: 'lib-photos-list',
  imports: [CommonModule, PhotoGridWithFavoritesComponent, LoadingSpinnerComponent, ImagePreviewModalComponent],
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  private readonly photoService = inject(PhotoService);
  private readonly photosStore = inject(PhotosStore);
  private readonly favoritesStore = inject(FavoritesStore);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  readonly photos = this.photosStore.photos;
  readonly isLoading = this.photosStore.isLoading;
  readonly hasMore = this.photosStore.hasMore;
  
  readonly selectedPhoto = signal<(Photo & { isFavorite: boolean}) | null>(null);

  private isLoadingMore = false;

  ngOnInit(): void {
    this.photosStore.resetPhotos();
    this.loadInitialPhotos();
  }

  ngAfterViewInit(): void {
    if (this.scrollContainer) {
      fromEvent(this.scrollContainer.nativeElement, 'scroll')
        .pipe(
          throttleTime(200),
          takeUntil(this.destroy$)
        )
        .subscribe(() => this.onScroll());
    }
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

  private onScroll(): void {
    if (!this.scrollContainer) return;

    const element = this.scrollContainer.nativeElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    const threshold = 300;
    const atBottom = scrollTop + clientHeight >= scrollHeight - threshold;

    if (atBottom && !this.isLoadingMore && this.hasMore() && !this.isLoading()) {
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
    this.photosStore.setLoading(true);
    const currentPage = this.photosStore.currentPage();

    this.photoService.fetchPhotos(currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (photos) => {
          this.photosStore.addPhotos(photos);
          this.photosStore.setLoading(false);
          this.isLoadingMore = false;
        },
        error: (error) => {
          console.error('Error loading more photos:', error);
          this.photosStore.setLoading(false);
          this.isLoadingMore = false;
        }
      });
  }
}
