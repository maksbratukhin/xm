import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService, Photo } from '@photo-library/shared/data-access';
import { ButtonComponent } from '@photo-library/shared/ui';

@Component({
  selector: 'lib-photo-detail',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly favoritesService = inject(FavoritesService);

  readonly photo = signal<Photo | null>(null);

  ngOnInit(): void {
    const photoId = this.route.snapshot.paramMap.get('id');
    if (photoId) {
      this.loadPhoto(photoId);
    }
  }

  removeFromFavorites(): void {
    const currentPhoto = this.photo();
    if (currentPhoto) {
      this.favoritesService.removeFromFavorites(currentPhoto.id);
      this.router.navigate(['/favorites']);
    }
  }

  private loadPhoto(photoId: string): void {
    const favorites = this.favoritesService.favorites();
    const foundPhoto = favorites.find(p => p.id === photoId);

    if (foundPhoto) {
      this.photo.set(foundPhoto);
    } else {
      this.router.navigate(['/favorites']);
    }
  }
}

