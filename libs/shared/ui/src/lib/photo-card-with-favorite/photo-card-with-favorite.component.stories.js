import { PhotoCardWithFavoriteComponent } from './photo-card-with-favorite.component';

export default {
  title: 'UI/Photo Card With Favorite',
  component: PhotoCardWithFavoriteComponent,
};

export const NotFavorite = {
  args: {
    photo: {
      id: '1',
      url: 'https://picsum.photos/id/1/200/300',
      thumbnailUrl: 'https://picsum.photos/id/1/200/300',
      width: 800,
      height: 600,
      isFavorite: false,
    },
  },
};

export const IsFavorite = {
  args: {
    photo: {
      id: '2',
      url: 'https://picsum.photos/id/2/200/300',
      thumbnailUrl: 'https://picsum.photos/id/2/200/300',
      width: 800,
      height: 600,
      isFavorite: true,
    },
  },
};

