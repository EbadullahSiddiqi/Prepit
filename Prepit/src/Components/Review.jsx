import React from "react";
import ReviewCards from "./ReviewCard";

export default function Why() {
  return (
    <div className="pt-16 md:pt-24 lg:pt-32 px-4 md:px-6 lg:px-8">
      <h1 className="text-blue-600 font-semibold text-4xl md:text-5xl lg:text-7xl text-center">
        Here's What Students Say,
      </h1>
      <div className="relative max-w-7xl mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="transform translate-y-0">
            <ReviewCards
              title="YO this is lit!"
              description="I passed my mids with literally no study, but by using Prepit!"
              name="Wania - Student at LGU"
            />
          </div>
          <div className="transform translate-y-12 md:translate-y-16">
            <ReviewCards
              title="Best study hack ever!"
              description="Prepit saved me during finals week! Hadn't touched my books all semester but still aced it."
              name="Ahmed - Student at FAST"
            />
          </div>
          <div className="transform translate-y-24 md:translate-y-32">
            <ReviewCards
              title="No more all-nighters!"
              description="Used to stay up all night before exams. Now I just run my notes through Prepit and I'm good to go!"
              name="Fatima - Student at NUST"
            />
          </div>
          <div className="transform translate-y-36 md:translate-y-48">
            <ReviewCards
              title="Actually works!"
              description="Thought it was too good to be true but tried it anyway. Ended up getting an A in Chemistry without opening the book!"
              name="Hassan - Student at UET"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
