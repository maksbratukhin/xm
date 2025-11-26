import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FavoritesStore, Photo } from '@photo-library/shared/data-access';
import { PhotoGridComponent, ImagePreviewModalComponent } from '@photo-library/shared/ui';

@Component({
  selector: 'lib-favorites-list',
  imports: [CommonModule, PhotoGridComponent, ImagePreviewModalComponent],
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent {
  private readonly favoritesStore = inject(FavoritesStore);
  private readonly router = inject(Router);

  readonly favorites = this.favoritesStore.favoritesList;
  readonly hasFavorites = this.favoritesStore.hasFavorites;
  
  readonly selectedPhoto = signal<(Photo & { isFavorite: boolean }) | null>(null);

  onPhotoClick(photo: Photo): void {
    this.selectedPhoto.set({ ...photo, isFavorite: true });
  }

  onClosePreview(): void {
    this.selectedPhoto.set(null);
  }

  onToggleFavorite(): void {
    const photo = this.selectedPhoto();
    if (photo) {
      this.favoritesStore.removeFromFavorites(photo.id);
      this.selectedPhoto.set(null);
    }
  }
}
