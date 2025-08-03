import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './index';

const meta: Meta<typeof Header> = {
  title: 'Components/ui/Header',
  component: Header,
  parameters: {
    layout: 'center',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
