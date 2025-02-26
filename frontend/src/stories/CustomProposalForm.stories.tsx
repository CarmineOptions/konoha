import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import CustomProposalForm from "../components/CustomProposal";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof CustomProposalForm> & {
    isModalOpen: boolean
}

const meta: Meta<StoryProps> = {
    argTypes:{
        isModalOpen:{
            control: "boolean",
        }
    },
    title: "Components/CustomProposalForm",
    tags: ["autodocs"],
    component: CustomProposalForm,

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Form: Story = {
    args: {
       isModalOpen: true
    },

    render: ({ isModalOpen, ...args }) => {
        const [, setIsModalOpen] = useState(isModalOpen);
        return <CustomProposalForm setIsModalOpen={setIsModalOpen}  {...args} />;
    },
};


