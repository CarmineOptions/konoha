import { Meta, StoryObj } from "@storybook/react";
import Dialog from "../components/ui/Dialog";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Dialog> & {
    buttonText: string
};

const meta: Meta<StoryProps> = {
    title: "Components/Dialog",
    component: Dialog,
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
    args: {
        buttonText: "Konoha"
    },
    render: ({ buttonText, ...args }) => {
        return <Dialog  {...args} >{buttonText}</Dialog>;
    },
};

