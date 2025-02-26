import React from "react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";

interface ModalProps {
  type: string;
  token?: string;
  amount?: string;
  handleClose: () => void;
}

export default function SuccessModal({ type, token, amount }: ModalProps) {
  return (
    <dialog className="fixed inset-0 z-50 flex  items-center justify-center w-full h-full  bg-black bg-opacity-50">
      <div className="grid grid-rows-3 w-full md:w-[360px] h-[350px] bg-[#2D2B2B] rounded-none">
        <div className="row-span-1 ">
          <div className="flex items-center justify-center">
            <img src="/success-top.png" alt="paper" />
          </div>
        </div>

        <div className="bg-[#258D23] pt-5 row-span-2">
          <div className="flex items-center flex-col  py-[18px] ">
            <p className="text-center text-[#FEFBF3] font-inter text-normal ">
              {type}
            </p>
            <div className="">
              <p className="font-inter text-[#FEFBF3] font-normal text-[30px] text-center">
                {amount} {token}
              </p>
            </div>

            <div className="flex items-center justify-center gap-x-5 mt-5">
              <Button className="bg-white text-black rounded-none text-center font-inter" >View Transaction</Button>

              <Link to="/" className="bg-[#156113] px-3 py-2 text-white text-center rounded-none font-inter">Go Home</Link>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
