import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Proposal from "../components/Proposal";
import {num} from "starknet"
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Proposal>;
const meta: Meta<StoryProps> = {
  title: "Components/Proposals",
  component: Proposal,
 
};

export default meta;
type Story = StoryObj<StoryProps>;
export const Default: Story = {
  args: {
    proposalId:  num.toBigInt(0)
  },
  render: (args) => {
    return <Proposal {...args} />;
  },
};
