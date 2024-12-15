import React from "react";
import WhyCards from "./WhyCards";

export default function Why() {
  const whyCases = [
    {
      title: "Pass Easily",
      description:
        "If you have prepared nothing for an exam, Prepit will help you! Just give it your notes and Prepit will help you pass easily!",
    },
    {
      title: "No More Cheating",
      description:
        "With Prepit, you don't need to cheat anymore! Simply use Prepit and say goodbye to cheating forever!",
    },
    {
      title: "Student Friendly",
      description:
        "Prepit has a Student Friendly Interface. Meaning, any student from all around the globe can use Prepit and Ace their exams!",
    },
    {
      title: "Cost Friendly",
      description:
        "Unlike big Colleges and Academies, Prepit does not have a big Fee! It's inexpenive and provides better education than most institutions",
    },
  ];

  return (
    <div className="pt-16 md:pt-24 lg:pt-32 px-4 md:px-6 lg:px-8">
      <h1 className="text-blue-600 font-semibold text-4xl md:text-5xl lg:text-7xl text-center">
        Why Prepit?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-8 md:py-12 max-w-7xl mx-auto">
        {whyCases.map((item, index) => {
          return (
            <WhyCards
              key={index}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
}
