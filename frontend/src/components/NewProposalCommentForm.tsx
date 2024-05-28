import React, { useMemo } from "react";
import toast from "react-hot-toast";
import { useAccount, useContractWrite } from "@starknet-react/core";

export default function NewcommentCommentForm({
    setIsModalOpen,
}: {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { isConnected } = useAccount();
    // State variables for the payload and to_upgrade
    const [payload, setPayload] = React.useState<string>("");

    // Create a call to submit a comment
    const calls = useMemo(() => {
        const tx = {
            contractAddress: "",
            entrypoint: "",
            calldata: [payload.toString()],
        };
        return [tx];
    }, [payload, submitComment]);

    // Use the useContractWrite hook to write the comment
    const { writeAsync } = useContractWrite({ calls });

    function submitComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Check if the user is connected
        if (!isConnected) {
            toast.error("Please connect your wallet");
            return;
        }

        // Check if the payload and to_upgrade fields are filled out
        if (!payload ) {
            toast.error("Please fill out all fields");
            return;
        }

        // Call the write function to submit the comment
        writeAsync()
            .then(() => {
                toast.success("Comment submitted successfully");
            })
            .catch((e) => {
                toast.error("Something went wrong");
                console.error(e);
            })
            .finally(() => {
                setIsModalOpen(false);
            });
    }

    return (
        <div className="w-[35rem]">
          <form onSubmit={submitComment}>
            <label htmlFor="#comment">Comment</label>
            <input
                id="#comment"
                type="text"
                placeholder="Leave a comment here"
                className="w-full p-2 mb-2 border rounded-lg border-slate-300"
                onChange={(e) => setPayload(e.target.value)}
            />
         
            <button
                type="submit"
                className="w-full p-2 mt-4 text-white bg-blue-500 rounded-lg"
            >
                Submit
            </button>
        </form>
        </div>
    );
}
