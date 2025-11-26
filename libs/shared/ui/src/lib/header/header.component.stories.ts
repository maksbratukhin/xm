import type { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  title: 'UI/Header',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {
  args: {
    tabs: [
      { label: 'Photos', path: '/' },
      { label: 'Favorites', path: '/favorites' }
    ],
    activeTab: '/'
  }
};

export const FavoritesActive: Story = {
  args: {
    tabs: [
      { label: 'Photos', path: '/' },
      { label: 'Favorites', path: '/favorites' }
    ],
    activeTab: '/favorites'
  }
};

