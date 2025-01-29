import React from "react";
import { CircleNotch } from "../../assets/icons/icons";

interface ModalProps {
  type: string;
  token?: string;
  amount?: string;
  handleClose: () => void;
}

export default function ProgressModal({
  type,
  token,
  amount,
}: ModalProps) {
  return (
    <dialog className="fixed inset-0 z-50 flex  items-center justify-center w-full h-full p-6 bg-black bg-opacity-50">
      <div className="grid grid-rows-3 w-full md:w-[360px] h-[350px]  gap-4 bg-[#2D2B2B] rounded-none">
       

        <div className="row-span-1 py-8">
        <div className="flex items-center justify-center">
          <img src="/noun-paper.png" alt="paper" />
        </div>
        </div>

        <div className="bg-[#585858] row-span-2">
          <div className="flex items-center flex-col  py-[18px] ">
            <p className="text-center text-[#FEFBF3] font-inter text-normal ">
              {type}
            </p>
            <div className="">
              <p className="font-inter text-[#FEFBF3] font-normal text-[30px] text-center">
                {amount} {token}
              </p>
            </div>

            <div className="pt-10">
              <CircleNotch />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
