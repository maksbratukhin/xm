import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Photo } from '../models/photo.model';
import { PhotoService } from '../services/photo.service';

interface PhotosState {
  photos: Photo[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
}

const initialState: PhotosState = {
  photos: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  hasMore: true
};

export const PhotosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ photos }) => ({
    photosCount: computed(() => photos().length),
    hasPhotos: computed(() => photos().length > 0)
  })),
  withMethods((store, photoService = inject(PhotoService)) => ({
    setLoading(isLoading: boolean) {
      patchState(store, { isLoading });
    },
    setError(error: string | null) {
      patchState(store, { error });
    },
    resetPhotos() {
      patchState(store, initialState);
    },
    
    loadPhotos: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((page) => {
          return photoService.fetchPhotos(page).pipe(
            tapResponse({
              next: (newPhotos: Photo[]) => {
                patchState(store, (state) => ({
                  photos: [...state.photos, ...newPhotos],
                  currentPage: state.currentPage + 1,
                  hasMore: newPhotos.length > 0,
                  isLoading: false
                }));
              },
              error: (error: Error) => {
                patchState(store, { 
                  error: error.message || 'Failed to load photos',
                  isLoading: false 
                });
              }
            })
          );
        })
      )
    ),
    
    loadInitialPhotos: rxMethod<void>(
      pipe(
        tap(() => patchState(store, initialState)),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return photoService.fetchPhotos(1).pipe(
            tapResponse({
              next: (newPhotos: Photo[]) => {
                patchState(store, {
                  photos: newPhotos,
                  currentPage: 2,
                  hasMore: newPhotos.length > 0,
                  isLoading: false
                });
              },
              error: (error: Error) => {
                patchState(store, { 
                  error: error.message || 'Failed to load photos',
                  isLoading: false 
                });
              }
            })
          );
        })
      )
    )
  }))
);
