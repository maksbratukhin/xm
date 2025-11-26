import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map, catchError, of } from 'rxjs';
import { Photo, PhotoApiResponse } from '../models/photo.model';

const BASE_URL = 'https://picsum.photos';
const MIN_DELAY = 200;
const MAX_DELAY = 300;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly http = inject(HttpClient);
  private readonly pageSize = 12;

  fetchPhotos(page: number): Observable<Photo[]> {
    const randomDelay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
    
    return this.http
      .get<PhotoApiResponse[]>(`${BASE_URL}/v2/list`, {
        params: {
          page: page.toString(),
          limit: this.pageSize.toString()
        }
      })
      .pipe(
        delay(randomDelay),
        map(responses => this.mapApiResponseToPhotos(responses)),
        catchError(error => {
          console.error('Error fetching photos:', error);
          return of([]);
        })
      );
  }

  getPhotoById(id: string): Observable<Photo | null> {
    return this.http
      .get<PhotoApiResponse>(`${BASE_URL}/id/${id}/info`)
      .pipe(
        map(response => this.mapApiResponseToPhoto(response)),
        catchError(() => of(null))
      );
  }

  private mapApiResponseToPhotos(responses: PhotoApiResponse[]): Photo[] {
    return responses.map(response => this.mapApiResponseToPhoto(response));
  }

  private mapApiResponseToPhoto(response: PhotoApiResponse): Photo {
    return {
      id: response.id,
      url: `${BASE_URL}/id/${response.id}/${response.width}/${response.height}`,
      thumbnailUrl: `${BASE_URL}/id/${response.id}/300/300`,
      width: response.width,
      height: response.height
    };
  }
}

