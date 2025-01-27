import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import VotingPower from "../components/staking/VotingPower";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof VotingPower> 

const meta: Meta<StoryProps> = {
    title: "Components/Staking/VotingPower",
    tags: ["autodocs"],
    component: VotingPower,

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: ({...args }) => {
        return <VotingPower   {...args} />;
    },
};


