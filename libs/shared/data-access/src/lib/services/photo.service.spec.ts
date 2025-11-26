import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoService]
    });
    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch photos from API', (done) => {
    const mockResponse = [
      {
        id: '1',
        author: 'Test',
        width: 800,
        height: 600,
        url: 'https://test.com',
        download_url: 'https://test.com/download'
      }
    ];

    service.fetchPhotos(1).subscribe(photos => {
      expect(photos.length).toBeGreaterThan(0);
      done();
    });

    const req = httpMock.expectOne(req => req.url.includes('picsum.photos'));
    req.flush(mockResponse);
  });
});
