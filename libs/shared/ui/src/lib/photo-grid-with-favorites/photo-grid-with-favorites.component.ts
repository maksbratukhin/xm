import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoCardWithFavoriteComponent } from '../photo-card-with-favorite/photo-card-with-favorite.component';

interface PhotoDisplay {
  id: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'lib-photo-grid-with-favorites',
  imports: [CommonModule, PhotoCardWithFavoriteComponent],
  templateUrl: './photo-grid-with-favorites.component.html',
  styleUrls: ['./photo-grid-with-favorites.component.scss']
})
export class PhotoGridWithFavoritesComponent<T extends PhotoDisplay = PhotoDisplay> {
  photos = input.required<T[]>();
  photoClick = output<T>();

  onPhotoClick(photo: T): void {
    this.photoClick.emit(photo);
  }
}


