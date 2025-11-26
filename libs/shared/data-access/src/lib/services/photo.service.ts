import { Injectable, signal } from '@angular/core';
import { Photo, PhotoApiResponse } from '../models/photo.model';

const BASE_URL = 'https://picsum.photos';
const MIN_DELAY = 200;
const MAX_DELAY = 300;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly loadingState = signal<boolean>(false);
  private currentPage = 1;
  private readonly pageSize = 12;

  readonly isLoading = this.loadingState.asReadonly();

  async fetchPhotos(): Promise<Photo[]> {
    this.loadingState.set(true);

    try {
      const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
      await this.simulateDelay(delay);

      const response = await fetch(
        `${BASE_URL}/v2/list?page=${this.currentPage}&limit=${this.pageSize}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }

      const data: PhotoApiResponse[] = await response.json();
      this.currentPage++;

      return this.mapApiResponseToPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];
    } finally {
      this.loadingState.set(false);
    }
  }

  async getPhotoById(id: string): Promise<Photo | null> {
    try {
      const response = await fetch(`${BASE_URL}/id/${id}/info`);

      if (!response.ok) {
        return null;
      }

      const data: PhotoApiResponse = await response.json();
      return this.mapApiResponseToPhoto(data);
    } catch {
      return null;
    }
  }

  resetPagination(): void {
    this.currentPage = 1;
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

  private simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

