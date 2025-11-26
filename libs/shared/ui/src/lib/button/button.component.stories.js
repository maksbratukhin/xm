import { ButtonComponent } from './button.component';

export default {
  title: 'UI/Button',
  component: ButtonComponent,
};

export const Primary = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    disabled: false,
  },
};

export const Secondary = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    disabled: false,
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    disabled: true,
  },
};

