import React from 'react'
import Link from 'next/link'
import { BookOpenIcon } from '@heroicons/react/24/outline'

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpenIcon className="h-8 w-8 text-white" />
              <span className="text-white font-bold text-xl">Prepit AI</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                href="/"
                className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/upload"
                className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Upload Notes
              </Link>
              <Link 
                href="/practice"
                className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Practice
              </Link>
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar