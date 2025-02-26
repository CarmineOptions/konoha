import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import CommentCard from "../components/CommentCard";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof CommentCard>;
const meta: Meta<StoryProps> = {
  title: "Components/CommentCard",
  tags: ["autodocs"],
  component: CommentCard,
 
};

export default meta;
type Story = StoryObj<StoryProps>;
export const Card: Story = {
  args: {
    address: "0x05662997723d56add3da71a86105788cb29b4e4e55325c2cc61fb600ac975d80",
    text: "Yaaaaaay!!!",
  },
  render: (args) => {
    return <CommentCard {...args} />;
  },
};
