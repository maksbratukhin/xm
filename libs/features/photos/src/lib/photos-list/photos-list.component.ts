import { Component, OnInit, OnDestroy, signal, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PhotoService, FavoritesService, Photo } from '@photo-library/shared/data-access';
import { PhotoGridComponent, LoadingSpinnerComponent } from '@photo-library/shared/ui';

@Component({
  selector: 'lib-photos-list',
  imports: [CommonModule, PhotoGridComponent, LoadingSpinnerComponent],
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit, OnDestroy {
  private readonly photoService = inject(PhotoService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly router = inject(Router);

  readonly photos = signal<Photo[]>([]);
  readonly isLoading = this.photoService.isLoading;

  private isLoadingMore = false;
  private destroyed = false;

  ngOnInit(): void {
    this.photoService.resetPagination();
    this.loadInitialPhotos();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.destroyed || this.isLoadingMore || this.isLoading()) {
      return;
    }

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      this.loadMorePhotos();
    }
  }

  onPhotoClick(photo: Photo): void {
    this.favoritesService.addToFavorites(photo);
  }

  private async loadInitialPhotos(): Promise<void> {
    const newPhotos = await this.photoService.fetchPhotos();
    this.photos.set(newPhotos);
  }

  private async loadMorePhotos(): Promise<void> {
    if (this.isLoadingMore) {
      return;
    }

    this.isLoadingMore = true;
    const newPhotos = await this.photoService.fetchPhotos();
    this.photos.update(current => [...current, ...newPhotos]);
    this.isLoadingMore = false;
  }
}

