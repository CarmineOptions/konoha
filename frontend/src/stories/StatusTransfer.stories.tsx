import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import StatusTransfer from "../components/StatusTransfer";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof StatusTransfer> 

const meta: Meta<StoryProps> = {
    title: "Components/TransferStatus",
    tags: ["autodocs"],
    component: StatusTransfer,

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: ({...args }) => {
        return <StatusTransfer   {...args} />;
    },
};


