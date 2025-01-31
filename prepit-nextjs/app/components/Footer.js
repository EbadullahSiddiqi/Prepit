import React from 'react'
import Link from 'next/link'
import { BookOpenIcon } from '@heroicons/react/24/outline'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpenIcon className="h-8 w-8 text-white" />
              <span className="text-white font-bold text-xl">Prepit AI</span>
            </div>
            <p className="text-blue-100 text-sm">
              Transform your study notes into interactive learning experiences with AI
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-blue-100 hover:text-white text-sm">
                  Upload Notes
                </Link>
              </li>
              <li>
                <Link href="/practice" className="text-blue-100 hover:text-white text-sm">
                  Practice
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-blue-100 hover:text-white text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-blue-100 hover:text-white text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-blue-100 hover:text-white text-sm">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-blue-100 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-blue-100 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-600 mt-8 pt-8">
          <p className="text-center text-blue-100 text-sm">
            © {new Date().getFullYear()} Prepit AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
