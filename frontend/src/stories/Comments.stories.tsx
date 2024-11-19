import { Meta, StoryObj, } from "@storybook/react";
import Comments from "../components/Comments";
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof Comments> 



type Story = StoryObj<StoryProps>;

const meta: Meta<StoryProps> = {
    title: "Components/Comments",
    tags: ["autodocs"],
    component: Comments,
   
};

export default meta;


export const CommentList: Story = {
    args: {
       proposalId: "0",
    },
};
