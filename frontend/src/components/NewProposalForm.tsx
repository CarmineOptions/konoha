import React, { useMemo } from "react";
import toast from "react-hot-toast";
import { CONTRACT_ADDR } from "../lib/config";
import { useAccount, useContractWrite } from "@starknet-react/core";

export default function NewProposalForm() {
    const { isConnected } = useAccount();

    const [payload, setPayload] = React.useState<string>("");
    const [to_upgrade, setToUpgrade] = React.useState<string>("");

    const calls = useMemo(() => {
        const tx = {
            contractAddress: CONTRACT_ADDR,
            entrypoint: "submit_proposal",
            calldata: [payload.toString(), to_upgrade.toString()],
        };
        return [tx];
    }, [payload, to_upgrade]);

    const { write } = useContractWrite({ calls });

    function submitProposal(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!isConnected) {
            toast.error("Please connect your wallet");
            return;
        }

        const payload = e.currentTarget["#payload"].value;
        const to_upgrade = e.currentTarget["#to_upgrade"].value;

        if (!payload || !to_upgrade) {
            toast.error("Please fill out all fields");
            return;
        }

        setPayload(payload);
        setToUpgrade(to_upgrade);

        write();

        console.log(payload, to_upgrade);
    }

    return (
        <form onSubmit={submitProposal}>
            <label htmlFor="#payload">Payload</label>
            <input
                id="#payload"
                type="text"
                placeholder="(integer or hex, e.g.: 1 or 0x1)"
                className="w-full p-2 mb-2 border rounded-lg border-slate-300"
            />
            <label htmlFor="#to_upgrade">To Upgrade</label>
            <select
                id="#to_upgrade"
                className="w-full p-2 border rounded-lg border-slate-300"
            >
                {/* Carmine 0 = amm, 1 = governance, 2 = CARM token, 3 = merkle tree root, 4 = no-op/signal vote */}
                <option value="0">amm</option>
                <option value="1">governance</option>
                <option value="2">CARM token</option>
                <option value="3">merkle tree root</option>
                <option value="4">no-op/signal vote</option>
            </select>

            <button
                type="submit"
                className="w-full p-2 mt-4 text-white bg-blue-500 rounded-lg"
            >
                Submit
            </button>
        </form>
    );
}
