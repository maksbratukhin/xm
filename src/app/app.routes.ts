import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@photo-library/feature/photos').then(m => m.PhotosListComponent)
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('@photo-library/feature/favorites').then(m => m.FavoritesListComponent)
  },
  {
    path: 'photos/:id',
    loadComponent: () =>
      import('@photo-library/feature/photos').then(m => m.PhotoDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
