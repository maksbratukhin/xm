import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Photo } from '../models/photo.model';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

interface FavoritesState {
  favorites: Map<string, Photo>;
}

const initialState: FavoritesState = {
  favorites: new Map()
};

const FAVORITES_STORAGE_KEY = 'photo-library-favorites';

export const FavoritesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ favorites }) => ({
    favoritesList: computed(() => Array.from(favorites().values())),
    favoritesCount: computed(() => favorites().size),
    hasFavorites: computed(() => favorites().size > 0)
  })),
  withMethods((store, storageService = inject(StorageService)) => ({
    isFavorite(photoId: string): boolean {
      return store.favorites().has(photoId);
    },
    addToFavorites(photo: Photo) {
      const currentFavorites = store.favorites();
      if (!currentFavorites.has(photo.id)) {
        const updatedFavorites = new Map(currentFavorites);
        updatedFavorites.set(photo.id, photo);
        patchState(store, { favorites: updatedFavorites });
        storageService.set(FAVORITES_STORAGE_KEY, Array.from(updatedFavorites.values()));
      }
    },
    removeFromFavorites(photoId: string) {
      const currentFavorites = store.favorites();
      if (currentFavorites.has(photoId)) {
        const updatedFavorites = new Map(currentFavorites);
        updatedFavorites.delete(photoId);
        patchState(store, { favorites: updatedFavorites });
        storageService.set(FAVORITES_STORAGE_KEY, Array.from(updatedFavorites.values()));
      }
    },
    toggleFavorite(photo: Photo) {
      if (store.favorites().has(photo.id)) {
        this.removeFromFavorites(photo.id);
      } else {
        this.addToFavorites(photo);
      }
    },
    loadFromStorage() {
      const stored = storageService.get<Photo[]>(FAVORITES_STORAGE_KEY);
      if (stored && Array.isArray(stored)) {
        const favoritesMap = new Map(stored.map(photo => [photo.id, photo]));
        patchState(store, { favorites: favoritesMap });
      }
    }
  })),
  withHooks({
    onInit(store) {
      store.loadFromStorage();
    }
  })
);

