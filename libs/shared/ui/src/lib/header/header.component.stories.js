import { HeaderComponent } from './header.component';

export default {
  title: 'UI/Header',
  component: HeaderComponent,
};

export const Default = {
  args: {},
};

export const WithActivePhotos = {
  render: (args) => ({
    props: {
      ...args,
      activeRoute: '/',
    },
  }),
};

export const WithActiveFavorites = {
  render: (args) => ({
    props: {
      ...args,
      activeRoute: '/favorites',
    },
  }),
};

