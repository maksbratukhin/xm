import { Component, OnInit, OnDestroy, AfterViewInit, inject, signal, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxVirtualView, RxVirtualViewContent, RxVirtualViewObserver, RxVirtualViewPlaceholder } from '@rx-angular/template/virtual-view';
import { Photo, PhotosStore, FavoritesStore } from '@photo-library/shared/data-access';
import { PhotoCardWithFavoriteComponent, LoadingSpinnerComponent, ImagePreviewModalComponent } from '@photo-library/shared/ui';
import { Subject, takeUntil, fromEvent, throttleTime, debounceTime } from 'rxjs';

@Component({
  selector: 'lib-photos-list',
  imports: [
    CommonModule, 
    PhotoCardWithFavoriteComponent, 
    LoadingSpinnerComponent, 
    ImagePreviewModalComponent,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewObserver,
    RxVirtualViewPlaceholder
  ],
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer?: ElementRef;

  private readonly photosStore = inject(PhotosStore);
  private readonly favoritesStore = inject(FavoritesStore);
  private readonly destroy$ = new Subject<void>();

  readonly photos = this.photosStore.photos;
  readonly isLoading = this.photosStore.isLoading;
  readonly hasMore = this.photosStore.hasMore;
  readonly selectedPhoto = signal<(Photo & { isFavorite: boolean}) | null>(null);

  private isLoadingMore = false;

  ngOnInit(): void {
    this.photosStore.loadInitialPhotos();
    this.setupResizeListener();
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

  private setupResizeListener(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        if (this.scrollContainer) {
          const element = this.scrollContainer.nativeElement;
          const currentScroll = element.scrollTop;
          element.scrollTop = currentScroll + 1;
          requestAnimationFrame(() => {
            element.scrollTop = currentScroll;
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  enrichPhotoWithFavorite(photo: Photo): Photo & { isFavorite: boolean } {
    return {
      ...photo,
      isFavorite: this.favoritesStore.isFavorite(photo.id)
    };
  }

  onPhotoClick(photo: Photo): void {
    const isFavorite = this.favoritesStore.isFavorite(photo.id);
    this.selectedPhoto.set({ ...photo, isFavorite });
  }

  onToggleFavoriteForPhoto(photo: Photo): void {
    this.favoritesStore.toggleFavorite(photo);
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
    if (!this.scrollContainer) {
      return;
    }

    const element = this.scrollContainer.nativeElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    const threshold = 1000;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    const atBottom = distanceFromBottom <= threshold;

    if (atBottom && !this.isLoadingMore && this.hasMore() && !this.isLoading()) {
      this.isLoadingMore = true;
      this.photosStore.loadPhotos(this.photosStore.currentPage());
      setTimeout(() => {
        this.isLoadingMore = false;
      }, 500);
    }
  }
}
