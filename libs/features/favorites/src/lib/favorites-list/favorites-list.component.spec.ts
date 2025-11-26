import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesListComponent } from './favorites-list.component';
import { FavoritesStore } from '@photo-library/shared/data-access';
import { Router } from '@angular/router';

describe('FavoritesListComponent', () => {
  let component: FavoritesListComponent;
  let fixture: ComponentFixture<FavoritesListComponent>;
  let mockRouter: jest.Mocked<Router>;

  const mockPhoto = {
    id: '1',
    url: 'https://test.com/photo.jpg',
    thumbnailUrl: 'https://test.com/thumb.jpg',
    width: 800,
    height: 600
  };

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [FavoritesListComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        FavoritesStore
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty state when no favorites', () => {
    expect(component.hasFavorites()).toBe(false);
  });

  it('should handle photo click', () => {
    component.onPhotoClick(mockPhoto);
    expect(component.selectedPhoto()).toBeTruthy();
    expect(component.selectedPhoto()?.id).toBe(mockPhoto.id);
    expect(component.selectedPhoto()?.isFavorite).toBe(true);
  });

  it('should close preview', () => {
    component.selectedPhoto.set({ ...mockPhoto, isFavorite: true });
    component.onClosePreview();
    expect(component.selectedPhoto()).toBeNull();
  });

  it('should remove from favorites and close modal', () => {
    const favoritesStore = TestBed.inject(FavoritesStore);
    const removeSpy = jest.spyOn(favoritesStore, 'removeFromFavorites');
    
    component.selectedPhoto.set({ ...mockPhoto, isFavorite: true });
    component.onToggleFavorite();
    
    expect(removeSpy).toHaveBeenCalledWith(mockPhoto.id);
    expect(component.selectedPhoto()).toBeNull();
  });
});

