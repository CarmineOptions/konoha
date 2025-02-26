import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {Distribution} from "../components/proposal-form/Distribution";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Distribution> 


const meta: Meta<StoryProps> = {
    title: "Components/ProposalForm/Distribution",
    tags: ["autodocs"],
    component: Distribution,

};

export default meta;
type Story = StoryObj<StoryProps>;
export const Form: Story = {
    args:{
        
    },
    render: ({...args }) => {
        return <Distribution   {...args} />;
    },
};


