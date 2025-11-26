import type { Meta, StoryObj } from '@storybook/angular';
import { PhotoCardComponent } from './photo-card.component';

const meta: Meta<PhotoCardComponent> = {
  component: PhotoCardComponent,
  title: 'UI/PhotoCard',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<PhotoCardComponent>;

export const Default: Story = {
  args: {
    photo: {
      id: '1',
      url: 'https://picsum.photos/id/1/600/400',
      thumbnailUrl: 'https://picsum.photos/id/1/300/300'
    }
  }
};

export const LandscapePhoto: Story = {
  args: {
    photo: {
      id: '2',
      url: 'https://picsum.photos/id/10/800/400',
      thumbnailUrl: 'https://picsum.photos/id/10/300/300'
    }
  }
};

export const PortraitPhoto: Story = {
  args: {
    photo: {
      id: '3',
      url: 'https://picsum.photos/id/20/400/600',
      thumbnailUrl: 'https://picsum.photos/id/20/300/300'
    }
  }
};

