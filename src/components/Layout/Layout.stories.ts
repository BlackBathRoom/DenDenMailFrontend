import type { Meta, StoryObj } from '@storybook/react-vite';
import Layout from './index';

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'center',
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'Content to be displayed inside the layout',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'null' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      'Welcome to the AI App. This is a sample page showcasing the latest web technologies.',
  },
};
