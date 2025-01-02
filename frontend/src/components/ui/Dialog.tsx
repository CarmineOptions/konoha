import React from "react";
import { Button } from "./Button";

export default function Dialog({
  children,
  title,
}: { children: React.ReactNode; title: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="">
      <Button onClick={() => setIsOpen(true)}>{title}</Button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="flex flex-col p-8 bg-white rounded-md gap-12">
            <div className="flex flex-row justify-between w-full">
              <h1 className="text-xl font-semibold">{title}</h1>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 font-medium text-white bg-gray-300 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              >
                x
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
