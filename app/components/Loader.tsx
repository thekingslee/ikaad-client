import React from 'react';

const Loader = () => (
  <div className="flex flex-col items-center justify-center min-h-[40vh]">
    <svg
      className="animate-spin h-10 w-10 text-custom-text mb-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        fill="#A3E635"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="#114B5F"
        d="M4 12a8 8 0 018-8v8z"
      ></path>
    </svg>
    <p className="text-title-body text-sm">Analyzing your document...</p>
  </div>
);

export default Loader;
