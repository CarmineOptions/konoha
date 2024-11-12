import { Meta, StoryObj, } from "@storybook/react";
import Comments from "../components/Comments";
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof Comments>;



type Story = StoryObj<StoryProps>;

const meta: Meta<StoryProps> = {
    title: "Components/Comments",
    component: Comments,
};

export default meta;



export const Default: Story = {
    args: {
        proposalId: "123",
    },
};

export const EmptyComments: Story = {
    args: {
        proposalId: "456",
    },
};

export const Loading: Story = {
    args: {
        proposalId: "789",
    },
    
};
