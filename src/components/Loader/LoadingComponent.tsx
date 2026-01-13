import React from "react";

type LoadingComponentProps = {
  isLoading: boolean;
  loadingText?: string;
};

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  isLoading,
  loadingText,
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center">
        {/* <img src="/loader-tansp.gif" alt="Loading..." className="" /> */}
        {loadingText ? (
          <p className="text-white text-lg">{loadingText}</p>
        ) : (
          <p className="text-white text-lg">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default LoadingComponent;
