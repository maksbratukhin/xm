import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of, debounceTime } from 'rxjs';
import { Photo } from '../models/photo.model';

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
  withMethods((store) => ({
    setLoading(isLoading: boolean) {
      patchState(store, { isLoading });
    },
    setError(error: string | null) {
      patchState(store, { error });
    },
    addPhotos(newPhotos: Photo[]) {
      patchState(store, (state) => ({
        photos: [...state.photos, ...newPhotos],
        currentPage: state.currentPage + 1,
        hasMore: newPhotos.length > 0
      }));
    },
    resetPhotos() {
      patchState(store, initialState);
    }
  }))
);

