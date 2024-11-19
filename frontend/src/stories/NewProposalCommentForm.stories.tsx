import { Meta, StoryObj } from "@storybook/react";
import NewProposalCommentForm from "../components/NewProposalCommentForm";
import { ComponentProps, useState } from "react";

type StoryProps = ComponentProps<typeof NewProposalCommentForm>  & {
    isModalOpen: boolean,
}

const meta: Meta<StoryProps> = {
    title: "Components/AddProposalComment",
    tags: ["autodocs"],
    component: NewProposalCommentForm,
    

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Form: Story = {
    args: {
        propId: "1"
    },
    render: ({...args }) => {
        const [_, setIsModalOpen] = useState(true)
        return <NewProposalCommentForm setIsModalOpen={setIsModalOpen}   {...args} />;
    },
};


