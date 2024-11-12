import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/Button";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Button> & {
    buttonText: string
};

const meta: Meta<StoryProps> = {
    title: "Components/Button",
    component: Button,

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Primary: Story = {
    args: {
        buttonText: "Konoha"
    },
    render: ({ buttonText, ...args }) => {
        return <Button className="w-[200px] h-[46]" {...args} >{buttonText}</Button>;
    },
};

