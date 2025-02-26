import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Treasury from "../components/proposal-form/Treasury";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Treasury> 


const meta: Meta<StoryProps> = {
    title: "Components/ProposalForm/Treasury",
    tags: ["autodocs"],
    component: Treasury,

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Form: Story = {
  
    render: ({...args }) => {
        return <Treasury   {...args} />;
    },
};


