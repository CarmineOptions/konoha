import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import TreasuryStatus from "../components/TreasuryStatus";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof TreasuryStatus> 

const meta: Meta<StoryProps> = {
    title: "Components/TreasuryStatus",
    tags: ["autodocs"],
    component: TreasuryStatus,

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: ({...args }) => {
        return <TreasuryStatus   {...args} />;
    },
};


