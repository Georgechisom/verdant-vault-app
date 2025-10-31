"use client";

import Link from "next/link";
import { Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="flex items-center gap-2">
                <img
                  src="/verdant-logo.png"
                  alt="Verdant Vault Logo"
                  className="w-8 h-8"
                />
                <span className="font-bold text-xl text-white text-nowrap pr-4">
                  Verdant Vault
                </span>
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              Making climate finance inclusive for green projects at the base
              level.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-green-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-green-500 transition"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/carbon-credits"
                  className="hover:text-green-500 transition"
                >
                  Carbon
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-500 transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="#" className="hover:text-green-500 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-500 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-green-500 transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Verdant Vault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
