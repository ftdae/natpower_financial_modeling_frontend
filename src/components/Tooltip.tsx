import React, { ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative group inline-block">
      {children}

      <div className="absolute w-[500px] left-1/2 -translate-x-1/2 bottom-full mb-3 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 flex flex-col items-center">
        <div className="bg-gray-400 text-white text-sm rounded-md py-2 px-3 shadow-lg">
          {content}
        </div>
        <div className="w-3 h-3 bg-gray-400 -mt-2 rotate-45" />
      </div>
    </div>
  );
};
