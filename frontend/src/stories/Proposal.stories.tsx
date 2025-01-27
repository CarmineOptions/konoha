import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Proposal from "../components/Proposal";
import {num} from "starknet"
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Proposal>;
const meta: Meta<StoryProps> = {
  title: "Components/Proposals",
  component: Proposal,
  argTypes:{
    proposalId: {
      control: "number",
      options: [0, 8, 5]
    }
  }
 
};

export default meta;
type Story = StoryObj<StoryProps>;
export const Default: Story = {
  args: { 
    proposalId: num.toBigInt(0)
  },
  render: ({proposalId, ...args}) => {
    return <Proposal proposalId={proposalId} {...args} />;
  },
};
