import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PhotoDisplay {
  id: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'lib-photo-card',
  imports: [CommonModule],
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent<T extends PhotoDisplay = PhotoDisplay> {
  photo = input.required<T>();
  photoClick = output<T>();

  onPhotoClick(): void {
    this.photoClick.emit(this.photo());
  }
}

