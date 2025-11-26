import type { Meta, StoryObj } from '@storybook/angular';
import { LoadingSpinnerComponent } from './loading-spinner.component';

const meta: Meta<LoadingSpinnerComponent> = {
  component: LoadingSpinnerComponent,
  title: 'UI/LoadingSpinner',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<LoadingSpinnerComponent>;

export const Default: Story = {};

