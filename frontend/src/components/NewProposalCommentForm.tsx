import React, {  } from "react";
import toast from "react-hot-toast";
import { useAccount } from "@starknet-react/core";
import { submitCommentApi } from "../api/apiService";

export default function NewcommentCommentForm({
    setIsModalOpen,
}: {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { isConnected, address } = useAccount();
    // State variables for the payload and to_upgrade
    const [comment, setComment] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    // Create a call to submit a comment
    // const calls = useMemo(() => {
    //     const tx = {
    //         contractAddress: "",
    //         entrypoint: "",
    //         calldata: [payload.toString()],
    //     };
    //     return [tx];
    // }, [payload, submitComment]);

    // Use the useContractWrite hook to write the comment
    // const { writeAsync } = useContractWrite({ calls });

    async function submitComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Check if the user is connected
        if (!isConnected) {
            toast.error("Please connect your wallet");
            return;
        }

        if (!comment ) {
            toast.error("Please fill out all fields");
            return;
        }

        const payload = {
            text: comment,
            address: address
        }


        try {
            setIsLoading(true)
            await submitCommentApi(payload);
            toast.success("Comment submitted successfully");
            setIsLoading(false)

        } catch (e) {
            setIsLoading(false)
            toast.error("Something went wrong");
            console.error(e);
        } finally {
            setIsLoading(false)
            setIsModalOpen(false);
        }
        
        // Call the write function to submit the comment
        // writeAsync()
        //     .then(() => {
        //         toast.success("Comment submitted successfully");
        //     })
        //     .catch((e) => {
        //         toast.error("Something went wrong");
        //         console.error(e);
        //     })
        //     .finally(() => {
        //         setIsModalOpen(false);
        //     });
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
                {
                    isLoading ? "Loading...": "Submit"
                }
            </button>
        </form>
        </div>
    );
}
