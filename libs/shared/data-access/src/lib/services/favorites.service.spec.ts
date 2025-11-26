import { FavoritesService } from './favorites.service';
import { StorageService } from './storage.service';
import { Photo } from '../models/photo.model';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let storageService: StorageService;

  const mockPhoto: Photo = {
    id: '1',
    url: 'https://test.com/photo.jpg',
    thumbnailUrl: 'https://test.com/thumb.jpg',
    width: 800,
    height: 600
  };

  beforeEach(() => {
    storageService = new StorageService();
    service = new FavoritesService(storageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add photo to favorites', () => {
    service.addToFavorites(mockPhoto);
    expect(service.isFavorite(mockPhoto.id)).toBe(true);
  });

  it('should remove photo from favorites', () => {
    service.addToFavorites(mockPhoto);
    service.removeFromFavorites(mockPhoto.id);
    expect(service.isFavorite(mockPhoto.id)).toBe(false);
  });

  it('should toggle favorite status', () => {
    service.toggleFavorite(mockPhoto);
    expect(service.isFavorite(mockPhoto.id)).toBe(true);
    service.toggleFavorite(mockPhoto);
    expect(service.isFavorite(mockPhoto.id)).toBe(false);
  });
});
