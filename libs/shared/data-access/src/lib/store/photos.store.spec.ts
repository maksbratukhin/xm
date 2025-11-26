import { TestBed } from '@angular/core/testing';
import { PhotosStore } from './photos.store';
import { PhotoService } from '../services/photo.service';
import { of } from 'rxjs';

describe('PhotosStore', () => {
  let store: InstanceType<typeof PhotosStore>;

  beforeEach(() => {
    const mockPhotoService = {
      fetchPhotos: jest.fn().mockReturnValue(of([
        { id: '1', url: 'test.jpg', thumbnailUrl: 'thumb.jpg', width: 800, height: 600 }
      ]))
    };

    TestBed.configureTestingModule({
      providers: [
        PhotosStore,
        { provide: PhotoService, useValue: mockPhotoService }
      ]
    });

    store = TestBed.inject(PhotosStore);
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should have initial state', () => {
    expect(store.photos()).toEqual([]);
    expect(store.isLoading()).toBe(false);
    expect(store.hasMore()).toBe(true);
    expect(store.currentPage()).toBe(1);
  });

  it('should have computed properties', () => {
    expect(store.photosCount()).toBe(0);
    expect(store.hasPhotos()).toBe(false);
  });

  it('should have loadPhotos method', () => {
    expect(typeof store.loadPhotos).toBe('function');
  });

  it('should have loadInitialPhotos method', () => {
    expect(typeof store.loadInitialPhotos).toBe('function');
  });
});
