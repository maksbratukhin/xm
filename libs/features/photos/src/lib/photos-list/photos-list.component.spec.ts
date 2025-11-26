import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotosListComponent } from './photos-list.component';
import { PhotoService, PhotosStore, FavoritesStore } from '@photo-library/shared/data-access';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('PhotosListComponent', () => {
  let component: PhotosListComponent;
  let fixture: ComponentFixture<PhotosListComponent>;
  let mockPhotoService: jest.Mocked<PhotoService>;
  let mockRouter: jest.Mocked<Router>;

  const mockPhotos = [
    {
      id: '1',
      url: 'https://test.com/1.jpg',
      thumbnailUrl: 'https://test.com/thumb1.jpg',
      width: 800,
      height: 600
    }
  ];

  beforeEach(async () => {
    mockPhotoService = {
      fetchPhotos: jest.fn().mockReturnValue(of(mockPhotos))
    } as any;

    mockRouter = {
      navigate: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [PhotosListComponent],
      providers: [
        { provide: PhotoService, useValue: mockPhotoService },
        { provide: Router, useValue: mockRouter },
        PhotosStore,
        FavoritesStore
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial photos on init', () => {
    fixture.detectChanges();
    expect(mockPhotoService.fetchPhotos).toHaveBeenCalledWith(1);
  });

  it('should handle photo click', () => {
    const photo = mockPhotos[0];
    component.onPhotoClick(photo);
    expect(component.selectedPhoto()).toBeTruthy();
    expect(component.selectedPhoto()?.id).toBe(photo.id);
  });

  it('should close preview', () => {
    component.selectedPhoto.set({ ...mockPhotos[0], isFavorite: false });
    component.onClosePreview();
    expect(component.selectedPhoto()).toBeNull();
  });

  it('should handle error when loading photos', () => {
    const error = new Error('Network error');
    mockPhotoService.fetchPhotos.mockReturnValue(throwError(() => error));
    
    fixture.detectChanges();
    
    expect(component.isLoading()).toBe(false);
  });
});

