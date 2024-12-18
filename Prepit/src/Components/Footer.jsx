import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">About Prepit AI</h3>
          <p className="text-sm">
            Founded by Ebadullah Siddiqi, Prepit AI helps students ace their
            exams by turning their notes into smart study materials using
            artificial intelligence.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-200 transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Connect With Me</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/EbadullahSiddiqi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/ebadullah-siddiqi-06a323310"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:dev.ebadullah@gmail.com"
              className="hover:text-blue-200 transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>
          <p className="text-sm">For inquiries: dev.ebadullah@gmail.com</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 pt-8 border-t border-blue-400 text-center text-sm">
        <p>© {new Date().getFullYear()} Prepit AI. All rights reserved.</p>
        <p className="mt-2">Developed with ❤️ by Ebadullah Siddiqi</p>
      </div>
    </footer>
  );
}
