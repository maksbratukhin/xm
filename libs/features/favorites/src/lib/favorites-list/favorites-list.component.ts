import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FavoritesService, Photo } from '@photo-library/shared/data-access';
import { PhotoGridComponent } from '@photo-library/shared/ui';

@Component({
  selector: 'lib-favorites-list',
  imports: [CommonModule, PhotoGridComponent],
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent {
  private readonly favoritesService = inject(FavoritesService);
  private readonly router = inject(Router);

  readonly favorites = computed(() => this.favoritesService.favorites());
  readonly hasFavorites = computed(() => this.favorites().length > 0);

  onPhotoClick(photo: Photo): void {
    this.router.navigate(['/photos', photo.id]);
  }
}

