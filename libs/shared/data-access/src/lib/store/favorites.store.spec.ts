import { TestBed } from '@angular/core/testing';
import { FavoritesStore } from './favorites.store';
import { StorageService } from '../services/storage.service';
import { Photo } from '../models/photo.model';

describe('FavoritesStore', () => {
  let store: ReturnType<typeof FavoritesStore>;

  const mockPhoto: Photo = {
    id: '1',
    url: 'https://test.com/photo.jpg',
    thumbnailUrl: 'https://test.com/thumb.jpg',
    width: 800,
    height: 600
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    localStorage.clear();
    store = TestBed.inject(FavoritesStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should initialize with empty favorites', () => {
    expect(store.favoritesList()).toEqual([]);
    expect(store.favoritesCount()).toBe(0);
  });

  it('should add photo to favorites', () => {
    store.addToFavorites(mockPhoto);
    expect(store.isFavorite(mockPhoto.id)).toBe(true);
    expect(store.favoritesCount()).toBe(1);
  });

  it('should remove photo from favorites', () => {
    store.addToFavorites(mockPhoto);
    store.removeFromFavorites(mockPhoto.id);
    expect(store.isFavorite(mockPhoto.id)).toBe(false);
  });

  it('should toggle favorite', () => {
    store.toggleFavorite(mockPhoto);
    expect(store.isFavorite(mockPhoto.id)).toBe(true);
    store.toggleFavorite(mockPhoto);
    expect(store.isFavorite(mockPhoto.id)).toBe(false);
  });
});
