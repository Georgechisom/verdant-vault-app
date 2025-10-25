'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="font-bold text-xl text-gray-800">Verdant Vault</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-green-500 transition">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-green-500 transition">
            About
          </Link>
          <Link href="/projects" className="text-gray-700 hover:text-green-500 transition">
            Projects
          </Link>
          <Link href="/carbon-credits" className="text-gray-700 hover:text-green-500 transition">
            Carbon Credits
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-green-500 transition">
            Contact
          </Link>
        </div>

        {/* Sign In Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/register"
            className="btn-primary"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container-custom py-4 flex flex-col gap-4">
            <Link href="/" className="text-gray-700 hover:text-green-500 transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-500 transition">
              About
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-green-500 transition">
              Projects
            </Link>
            <Link href="/carbon-credits" className="text-gray-700 hover:text-green-500 transition">
              Carbon Credits
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-500 transition">
              Contact
            </Link>
            <Link
              href="/register"
              className="btn-primary text-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

