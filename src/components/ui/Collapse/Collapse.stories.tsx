import type { Meta, StoryObj } from '@storybook/react-vite';

import Collapse from './index';

const meta: Meta<typeof Collapse> = {
  title: 'Components/UI/Collapse',
  component: Collapse,
  parameters: {
    layout: 'center',
  },
  args: {
    children: [
      <Collapse.Title>Title 1</Collapse.Title>,
      <Collapse.Content>Content 1</Collapse.Content>,
    ],
    name: 'test',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'arrow',
  },
};

export const PlusIcon: Story = {
  args: {
    icon: 'plus',
  },
};

export const OpenState: Story = {
  args: {
    icon: 'arrow',
    forceState: 'open',
  },
};
