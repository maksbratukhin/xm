import { PhotoCardComponent } from './photo-card.component';

export default {
  title: 'UI/Photo Card',
  component: PhotoCardComponent,
};

export const Default = {
  args: {
    photo: {
      id: '1',
      url: 'https://picsum.photos/id/1/200/300',
      thumbnailUrl: 'https://picsum.photos/id/1/200/300',
      width: 800,
      height: 600,
    },
  },
};

export const Landscape = {
  args: {
    photo: {
      id: '10',
      url: 'https://picsum.photos/id/10/300/200',
      thumbnailUrl: 'https://picsum.photos/id/10/300/200',
      width: 1200,
      height: 800,
    },
  },
};

export const Portrait = {
  args: {
    photo: {
      id: '20',
      url: 'https://picsum.photos/id/20/200/300',
      thumbnailUrl: 'https://picsum.photos/id/20/200/300',
      width: 600,
      height: 900,
    },
  },
};

