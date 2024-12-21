import type { Meta, StoryObj } from "@storybook/web-components";
import "./HelloWorld";

interface HelloWorldProps {
  title: string;
  count?: number;
}

const meta: Meta<HelloWorldProps> = {
  title: "Example/HelloWorld",
  component: "hello-world",
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    count: { control: "number" },
  },
  args: {
    title: "World",
    count: 0,
  },
};

export default meta;
type Story = StoryObj<HelloWorldProps>;

export const Default: Story = {
  args: {
    title: "World",
    count: 0,
  },
};

export const WithTitle: Story = {
  args: {
    title: "Storybook",
    count: 0,
  },
};

export const WithCount: Story = {
  args: {
    title: "World",
    count: 5,
  },
};

export const WithTitleAndCount: Story = {
  args: {
    title: "Storybook",
    count: 10,
  },
};
