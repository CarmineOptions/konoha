import { Meta, StoryObj } from "@storybook/react";
import VestingTable from "../components/VestingTable";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof VestingTable> 

const meta: Meta<StoryProps> = {
    title: "Components/VestingTable",
    tags: ["autodocs"],
    component: VestingTable,

};

export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
    render: ({...args }) => {
        return <VestingTable   {...args} />;
    },
};


