import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/Button";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Button> & {
    buttonText: string
};

const meta: Meta<StoryProps> = {
    title: "Components/UI/Button",
    tags: ["autodocs"],
    component: Button,

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Primary: Story = {
    args: {
        buttonText: "Konoha"
    },
    render: ({ buttonText, ...args }) => {
        return <Button onClick={() => alert("I was clicked")} className="w-[200px] h-[46]" {...args} >{buttonText}</Button>;
    },
};

