import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PhotoPreview {
  id: string;
  url: string;
  isFavorite: boolean;
}

@Component({
  selector: 'lib-image-preview-modal',
  imports: [CommonModule],
  templateUrl: './image-preview-modal.component.html',
  styleUrls: ['./image-preview-modal.component.scss']
})
export class ImagePreviewModalComponent {
  photo = input.required<PhotoPreview>();
  close = output<void>();
  toggleFavorite = output<void>();

  onClose(): void {
    this.close.emit();
  }

  onToggleFavorite(): void {
    this.toggleFavorite.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }
}

