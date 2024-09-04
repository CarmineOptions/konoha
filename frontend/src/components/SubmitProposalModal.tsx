import React from "react";
import NewProposalForm from "./NewProposalForm";

interface SubmitProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitProposalModal: React.FC<SubmitProposalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <dialog className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-6 bg-black bg-opacity-50">
      <div className="relative flex flex-col items-center gap-4 p-8 bg-white rounded-lg">
        <button
          className="absolute right-3 top-3 text-slate-400"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p className="text-xl font-bold">New proposal</p>
        <NewProposalForm setIsModalOpen={onClose} />
      </div>
    </dialog>
  );
};

export default SubmitProposalModal;