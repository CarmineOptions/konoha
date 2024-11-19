import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import StakeList from "../components/staking/StakeList";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof StakeList> 

const address = "0x05662997723d56add3da71a86105788cb29b4e4e55325c2cc61fb600ac975d80"

const meta: Meta<StoryProps> = {
    title: "Components/Staking/StakeList",
    tags: ["autodocs"],
    component: StakeList,

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
   args:{
    address: address
   },
    render: ({...args }) => {
        return <StakeList   {...args} />;
    },
};


