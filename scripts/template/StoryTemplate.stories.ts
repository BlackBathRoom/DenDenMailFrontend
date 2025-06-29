import type { Meta, StoryObj } from '@storybook/react-vite';
import __COMPONENT__ from './index';

const meta: Meta<typeof __COMPONENT__> = {
  title: 'Components/__COMPONENT__',
  component: __COMPONENT__,
  parameters: {
    layout: 'center',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
