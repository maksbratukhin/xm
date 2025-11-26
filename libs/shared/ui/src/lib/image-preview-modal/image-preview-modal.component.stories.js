import { ImagePreviewModalComponent } from './image-preview-modal.component';

export default {
  title: 'UI/Image Preview Modal',
  component: ImagePreviewModalComponent,
};

export const NotFavorite = {
  args: {
    photo: {
      id: '1',
      url: 'https://picsum.photos/id/1/1000/1000',
      thumbnailUrl: 'https://picsum.photos/id/1/200/300',
      width: 1000,
      height: 1000,
      isFavorite: false,
    },
  },
};

export const IsFavorite = {
  args: {
    photo: {
      id: '2',
      url: 'https://picsum.photos/id/2/1000/1000',
      thumbnailUrl: 'https://picsum.photos/id/2/200/300',
      width: 1000,
      height: 1000,
      isFavorite: true,
    },
  },
};

