import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ConnectModal from "../components/starknet/ConnectModal";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof ConnectModal>;
const meta: Meta<StoryProps> = {
  title: "Components/ConnectModal",
  component: ConnectModal,
};
export default meta;
type Story = StoryObj<StoryProps>;

export const Modal: Story = {
    render: (args) => <ConnectModal {...args} />,
};
