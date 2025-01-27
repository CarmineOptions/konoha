import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import NewStake from "../components/staking/NewStake";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof NewStake> 

const meta: Meta<StoryProps> = {
    title: "Components/Staking/NewStake",
    tags: ["autodocs"],
    component: NewStake,

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
    args:{
        floatingBalance: "50000"
    },
    render: ({...args }) => {
        return <NewStake   {...args} />;
    },
};


