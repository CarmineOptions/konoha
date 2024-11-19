import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { num } from "starknet"
import SubmitProposalModal from "../components/SubmitProposalModal";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof SubmitProposalModal>

const meta: Meta<StoryProps> = {

    title: "Components/SubmitProposalModal",
    tags: ["autodocs"],
    component: SubmitProposalModal,

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
    args: {
       isOpen: true
    },
    render: ({ ...args }) => {
        return <SubmitProposalModal   {...args} />;
    },
};


