import { Component, input, output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesStore } from '@photo-library/shared/data-access';

interface PhotoDisplay {
  id: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'lib-photo-card-with-favorite',
  imports: [CommonModule],
  templateUrl: './photo-card-with-favorite.component.html',
  styleUrls: ['./photo-card-with-favorite.component.scss']
})
export class PhotoCardWithFavoriteComponent<T extends PhotoDisplay = PhotoDisplay> {
  private readonly favoritesStore = inject(FavoritesStore);
  
  photo = input.required<T>();
  photoClick = output<T>();
  
  readonly isFavorite = computed(() => this.favoritesStore.isFavorite(this.photo().id));

  onPhotoClick(): void {
    this.photoClick.emit(this.photo());
  }

  onToggleFavorite(event: Event): void {
    event.stopPropagation();
    this.favoritesStore.toggleFavorite(this.photo() as any);
  }
}


