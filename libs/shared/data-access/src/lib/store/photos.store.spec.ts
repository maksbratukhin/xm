import { TestBed } from '@angular/core/testing';
import { PhotosStore } from './photos.store';
import { Photo } from '../models/photo.model';

describe('PhotosStore', () => {
  let store: ReturnType<typeof PhotosStore>;

  const mockPhotos: Photo[] = [
    {
      id: '1',
      url: 'https://test.com/1.jpg',
      thumbnailUrl: 'https://test.com/thumb1.jpg',
      width: 800,
      height: 600
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(PhotosStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should initialize with empty state', () => {
    expect(store.photos()).toEqual([]);
    expect(store.isLoading()).toBe(false);
    expect(store.hasMore()).toBe(true);
  });

  it('should add photos', () => {
    store.addPhotos(mockPhotos);
    expect(store.photos().length).toBe(1);
    expect(store.photosCount()).toBe(1);
  });

  it('should set loading state', () => {
    store.setLoading(true);
    expect(store.isLoading()).toBe(true);
  });

  it('should reset photos', () => {
    store.addPhotos(mockPhotos);
    store.resetPhotos();
    expect(store.photos()).toEqual([]);
  });
});
