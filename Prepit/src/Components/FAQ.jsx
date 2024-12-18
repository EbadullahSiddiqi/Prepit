import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "How does Prepit AI work?",
      answer:
        "Simply upload your study notes in PDF or text format, and Prepit AI will analyze them to create flashcards with important questions and answers. Our AI identifies key concepts and creates effective study materials for you.",
    },
    {
      question: "What file formats does Prepit AI support?",
      answer:
        "Prepit AI currently supports PDF files and plain text formats. We're working on adding support for more file types like Word documents and images with text.",
    },
    {
      question: "How accurate are the generated questions?",
      answer:
        "Our AI is trained to identify key concepts and important information from your notes, creating relevant and accurate study materials. The questions focus on main topics and crucial details from your content.",
    },
    {
      question: "Can I edit the generated flashcards?",
      answer:
        "Currently, Prepit AI provides read-only flashcards. However, we're developing features to let students customize and edit cards to match their study preferences.",
    },
    {
      question: "Is there a limit to how many notes I can upload?",
      answer:
        "During our beta phase, you can upload notes up to 50 pages per PDF. We plan to increase this limit based on user feedback and requirements.",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-[17rem] pb-[15rem]">
      <h1 className="text-blue-600 pb-14 font-semibold text-4xl md:text-5xl lg:text-7xl text-center">
        FAQs
      </h1>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <h3 className="text-lg md:text-xl font-medium text-left">
                {item.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            <div
              className={`transition-all duration-200 ease-in-out ${
                openIndex === index
                  ? "max-h-48 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="p-4 text-gray-600 bg-gray-50">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
