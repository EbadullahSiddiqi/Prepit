import React, { useEffect, useState } from "react";
import Why from "./Why";
import Review from "./Review";
import FAQ from "./FAQ";
import Footer from "./Footer";

export default function Home() {
  const [btnText, setBtnText] = useState("Wishlist Now!");
  return (
    <>
      <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 pt-20">
        <div className="text-blue-600 text-4xl md:text-5xl lg:text-7xl font-semibold text-center">
          Exam tomorrow, <br /> <span>and no preparation?</span>
        </div>

        <p className="text-blue-600 pt-4 text-xl md:text-2xl font-medium mt-3 text-center">
          Don't worry, we got you!
        </p>

        <button
          onClick={() => {
            localStorage.setItem("wishlist", "true");
            setBtnText("You're in Line!");
          }}
          className="home-btn px-6 py-3 mt-7 rounded-3xl bg-blue-600 hover:bg-white border-2 border-blue-600 text-white hover:text-blue-600 font-semibold transition-all duration-200 text-sm md:text-base"
        >
          {btnText}
        </button>

        <Why />

        <Review />

        <FAQ />
      </div>
      <Footer />
    </>
  );
}
