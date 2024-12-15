import React from "react";

export default function WhyCards({ title, description }) {
  return (
    <div className="w-full">
      <div className="p-4 md:p-6 rounded-xl min-h-[15rem] w-full backdrop-blur-md bg-gray-50 font-medium overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        <p className="pt-2 md:pt-3 text-sm md:text-base font-normal text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
}
