import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ConfigProposal from "../components/proposal-form/ConfigProposal";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof ConfigProposal> 


const meta: Meta<StoryProps> = {
    title: "Components/ProposalForm/ConfigProposal",
    tags: ["autodocs"],
    component: ConfigProposal,

};

export default meta;
type Story = StoryObj<StoryProps>;
export const Form: Story = {
    render: ({...args }) => {
        return <ConfigProposal   {...args} />;
    },
};


