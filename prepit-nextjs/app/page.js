import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  SparklesIcon,
  BookOpenIcon,
  LightBulbIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import hero from "../public/prepit hero.jpg"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">
                Turn Your Notes into
                <span className="block text-blue-200">Study Superpowers</span>
              </h1>
              <p className="text-xl text-blue-100">
                Upload your notes, and let AI create personalized practice
                questions. Study smarter, not harder!
              </p>
              <Link
                href="/ai"
                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Try for Free <ArrowUpRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative h-[400px]">
              <Image
                src={hero}
                alt="Student studying"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Students Love Prepit AI
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <SparklesIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                AI-Powered Learning
              </h3>
              <p className="text-gray-600">
                Smart questions generated from your own notes, making study
                sessions actually useful.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <BookOpenIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Any Subject, Any Time
              </h3>
              <p className="text-gray-600">
                Works with all subjects and note formats. Your personal tutor
                that never sleeps.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <LightBulbIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Learn Your Way</h3>
              <p className="text-gray-600">
                Customized practice sessions that adapt to your learning style
                and pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            The Tea from Our Users
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="text-gray-800 mb-4">
                "No cap, Prepit AI is bussin fr fr! Went from struggling in Bio
                to absolutely eating it up! 💯"
              </p>
              <p className="font-semibold">- Sarah K, Bio Major</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="text-gray-800 mb-4">
                "This app is giving main character energy! My grades? We love to
                see it! Prepit understood the assignment fr 🔥"
              </p>
              <p className="font-semibold">- Alex M, High School Senior</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="text-gray-800 mb-4">
                "Literally living my best academic life rn. This app is such a
                slay for exam prep, no thoughts just straight W's 💅"
              </p>
              <p className="font-semibold">- Jordan T, Psychology Student</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Notes</h3>
              <p className="text-gray-600">
                Take a pic or upload your study materials
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Magic Happens</h3>
              <p className="text-gray-600">
                Our AI creates custom practice questions
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Level Up</h3>
              <p className="text-gray-600">
                Practice, learn, and ace your exams
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                Is Prepit AI free to use?
              </h3>
              <p className="text-gray-600">
                Yes! You can try Prepit AI for free with our basic plan. Premium
                features are available for power users.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                What types of notes work best?
              </h3>
              <p className="text-gray-600">
                Prepit AI works with handwritten notes, typed documents,
                textbook pages, and even PowerPoint slides!
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                How accurate are the questions?
              </h3>
              <p className="text-gray-600">
                Our AI generates questions directly from your notes, ensuring
                relevance and accuracy. Questions are designed to test
                understanding, not just memorization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Level Up Your Study Game?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students crushing their academic goals with Prepit
            AI
          </p>
          <Link
            href="/ai"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Started for Free <ArrowUpRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
