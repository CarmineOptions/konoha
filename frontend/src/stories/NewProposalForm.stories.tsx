import { Meta, StoryObj } from "@storybook/react";
import NewProposalForm from "../components/NewProposalForm";
import { ComponentProps, useState } from "react";

type StoryProps = ComponentProps<typeof NewProposalForm>  & {
    isModalOpen: boolean,
}

const meta: Meta<StoryProps> = {
    title: "Components/NewProposal",
    tags: ["autodocs"],
    component: NewProposalForm,
    argTypes: {
        isModalOpen:{
            control: "select",
            options: [true, false]
        }
    }
    

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Form: Story = {
   args:{
    isModalOpen: true
   },   
    render: ({isModalOpen, ...args }) => {
        const [_, setIsModalOpen] = useState(isModalOpen)
        
        return <NewProposalForm setIsModalOpen={setIsModalOpen}   {...args} />;
    },
};


