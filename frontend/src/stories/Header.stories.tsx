import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Header from "../components/Header";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Header>;
const meta: Meta<StoryProps> = {
  title: "Components/Header",
  component: Header,
};
export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: (args) => <Header {...args} />,
};
