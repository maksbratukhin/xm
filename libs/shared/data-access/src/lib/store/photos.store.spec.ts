import { TestBed } from '@angular/core/testing';
import { PhotosStore } from './photos.store';
import { PhotoService } from '../services/photo.service';
import { of } from 'rxjs';

describe('PhotosStore', () => {
  let store: InstanceType<typeof PhotosStore>;
  let mockPhotoService: jest.Mocked<PhotoService>;

  beforeEach(() => {
    mockPhotoService = {
      fetchPhotos: jest.fn().mockReturnValue(of([]))
    } as any;

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
  });

  it('should add photos', () => {
    const mockPhotos = [
      { id: '1', url: 'test.jpg', thumbnailUrl: 'thumb.jpg', width: 800, height: 600 }
    ];
    
    store.addPhotos(mockPhotos);
    
    expect(store.photos().length).toBe(1);
    expect(store.currentPage()).toBe(2);
  });

  it('should reset photos', () => {
    const mockPhotos = [
      { id: '1', url: 'test.jpg', thumbnailUrl: 'thumb.jpg', width: 800, height: 600 }
    ];
    
    store.addPhotos(mockPhotos);
    expect(store.photos().length).toBe(1);
    
    store.resetPhotos();
    expect(store.photos()).toEqual([]);
    expect(store.currentPage()).toBe(1);
  });

  it('should set loading state', () => {
    store.setLoading(true);
    expect(store.isLoading()).toBe(true);
    
    store.setLoading(false);
    expect(store.isLoading()).toBe(false);
  });
});
