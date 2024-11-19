import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Dialog from "../components/ui/Dialog";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Dialog> & {
    numberOfChildren: number
}

const meta: Meta<StoryProps> = {
    title: "Components/UI/Dialog",
    tags: ["autodocs"],
    component: Dialog,
    argTypes: {
        numberOfChildren: {
            control: 'select',
            options: [1, 3, 5]
        }
    }
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
    args: {
        title: "Open Dialog",
        numberOfChildren: 1
    },
    render: ({ numberOfChildren, ...args }) => {
        return <Dialog  {...args} >{ createChildren(numberOfChildren)}</Dialog>;
    },
};


function createChildren(numberOfChildren: number) {
    return Array(numberOfChildren).fill(null).map((_, index) => (
        <div key={index}>
            <div className="p-2">
                <p className="text-gray-700">
                    This is a sample dialog content. You can add any custom children
                    components here.
                </p>

            </div>
        </div>
    ))
}
