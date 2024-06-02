import React, { useMemo } from "react";
import toast from "react-hot-toast";
import { useAccount, useContractWrite } from "@starknet-react/core";
import { submitCommentApi } from "../api/apiService";
import { CONTRACT_ADDR } from "../lib/config";

export default function NewcommentCommentForm({
    setIsModalOpen,
}: {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { isConnected, address } = useAccount();
    const [comment, setComment] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const calls = useMemo(() => {
        const tx = {
            contractAddress: CONTRACT_ADDR,
            entrypoint: "add_comment",
            calldata: [comment.toString()],
        };
        return [tx];
    }, [comment, submitComment]);

    const { writeAsync } = useContractWrite({ calls });

    async function submitComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!isConnected) {
            toast.error("Please connect your wallet");
            return;
        }

        if (!comment) {
            toast.error("Please fill out all fields");
            return;
        }

        const payload = {
            text: comment,
            address: address,
        };

        setIsLoading(true);

        try {
            await submitCommentApi(payload);
            toast.success("Comment submitted successfully");

            try {
                await writeAsync();
                toast.success("Proposal updated successfully");
            } catch (error) {
                toast.error("Unable to update proposal with comment");
                console.error(error);
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
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
                    onChange={(e) => setComment(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full p-2 mt-4 text-white bg-blue-500 rounded-lg"
                >
                    {isLoading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
