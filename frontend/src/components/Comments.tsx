import React from "react";
import CopyIcon from "../assets/icons/copy";

export default function Comments() {
	return (
		<div className="w-[35rem] pt-5">
			<div className="py-2">
				<div className="grid grid-cols-[1fr_3fr] gap-3 ">
					<p className="text-sm font-[400] ">Senders Address:</p>
					<div className="flex gap-2">
          <p className="font-[600]  text-sm">0x058d259a9c...cf1fea3e53cd33f</p>
            <CopyIcon />
          </div>

					<p className="text-sm font-[400] ">Comment:</p>
					<p className="font-[600]  text-sm">Proposal on governance</p>

					<p className="text-sm font-[400">Token Balance:</p>
					<p className="font-[600]  text-sm">0</p>
				</div>
				<div className="border border-b-gray-200 mt-2" />
			</div>

			
		</div>
	);
}
