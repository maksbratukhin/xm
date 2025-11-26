import { Injectable, signal, computed } from '@angular/core';
import { StorageService } from './storage.service';
import { Photo } from '../models/photo.model';

const FAVORITES_STORAGE_KEY = 'photo-library-favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly favoritesMap = signal<Map<string, Photo>>(new Map());

  readonly favorites = computed(() => Array.from(this.favoritesMap().values()));
  readonly favoritesCount = computed(() => this.favoritesMap().size);

  constructor(private readonly storageService: StorageService) {
    this.loadFavoritesFromStorage();
  }

  isFavorite(photoId: string): boolean {
    return this.favoritesMap().has(photoId);
  }

  addToFavorites(photo: Photo): void {
    if (!this.isFavorite(photo.id)) {
      const updatedMap = new Map(this.favoritesMap());
      updatedMap.set(photo.id, photo);
      this.favoritesMap.set(updatedMap);
      this.saveFavoritesToStorage();
    }
  }

  removeFromFavorites(photoId: string): void {
    if (this.isFavorite(photoId)) {
      const updatedMap = new Map(this.favoritesMap());
      updatedMap.delete(photoId);
      this.favoritesMap.set(updatedMap);
      this.saveFavoritesToStorage();
    }
  }

  toggleFavorite(photo: Photo): void {
    if (this.isFavorite(photo.id)) {
      this.removeFromFavorites(photo.id);
    } else {
      this.addToFavorites(photo);
    }
  }

  clearFavorites(): void {
    this.favoritesMap.set(new Map());
    this.saveFavoritesToStorage();
  }

  private loadFavoritesFromStorage(): void {
    const stored = this.storageService.get<Photo[]>(FAVORITES_STORAGE_KEY);
    if (stored && Array.isArray(stored)) {
      const map = new Map(stored.map(photo => [photo.id, photo]));
      this.favoritesMap.set(map);
    }
  }

  private saveFavoritesToStorage(): void {
    this.storageService.set(FAVORITES_STORAGE_KEY, this.favorites());
  }
}

