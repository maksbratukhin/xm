import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoCardComponent, Photo } from './photo-card.component';

describe('PhotoCardComponent', () => {
  let component: PhotoCardComponent;
  let fixture: ComponentFixture<PhotoCardComponent>;

  const mockPhoto: Photo = {
    id: '1',
    url: 'https://test.com/photo.jpg',
    thumbnailUrl: 'https://test.com/thumb.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('photo', mockPhoto);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display photo', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toBe(mockPhoto.thumbnailUrl);
  });

  it('should emit photo click event', () => {
    let emittedPhoto: Photo | null = null;
    component.photoClick.subscribe((photo: Photo) => {
      emittedPhoto = photo;
    });

    const card = fixture.nativeElement.querySelector('.photo-card');
    card.click();

    expect(emittedPhoto).toEqual(mockPhoto);
  });
});

