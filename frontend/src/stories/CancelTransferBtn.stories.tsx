import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import CancelTransferBtn from "../components/CancelTransferBtn";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof CancelTransferBtn> 

const meta: Meta<StoryProps> = {
    title: "Components/CancelTransferButton",
    tags: ["autodocs"],
    component: CancelTransferBtn,

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Button: Story = {
    args:{
        transferId: 0
    },
    render: ({...args }) => {
        return <CancelTransferBtn   {...args} />;
    },
};


