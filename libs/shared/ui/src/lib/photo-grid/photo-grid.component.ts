import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoCardComponent } from '../photo-card/photo-card.component';

interface PhotoDisplay {
  id: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'lib-photo-grid',
  imports: [CommonModule, PhotoCardComponent],
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss']
})
export class PhotoGridComponent<T extends PhotoDisplay = PhotoDisplay> {
  photos = input.required<T[]>();
  photoClick = output<T>();

  onPhotoClick(photo: T): void {
    this.photoClick.emit(photo);
  }
}

