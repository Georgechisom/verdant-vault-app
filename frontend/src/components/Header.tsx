"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const path = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`shadow-sm sticky top-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-green-900 font-bold" : "bg-background"
      }`}
    >
      {/* Progress Line */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      <nav className="container flex justify-between items-center py-4">
        {/* Logo */}
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
        {/* Desktop Navigation */}
        <div
          className={`hidden md:flex justify-between rounded-full border-2 blur-[24] md:px-4 lg:px-1.5 py-2 ${
            isScrolled ? "border-[1px] border-white lg:px-1.5" : ""
          } ${path === "/" ? "" : "border-none"}`}
        >
          <div className="hidden items-center gap-8 md:px-4 lg:px-10 text-nowrap">
            <Link
              href="/"
              className="text-white hover:text-green-500 hover:font-semibold hover:italic transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-green-500 hover:font-semibold transition"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-white hover:text-green-500 hover:font-semibold transition"
            >
              Projects
            </Link>
            <Link
              href="/carbon-credits"
              className="text-white hover:text-green-500 hover:font-semibold transition"
            >
              Carbon Credits
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-green-500 hover:font-semibold transition"
            >
              Contact
            </Link>
          </div>

          {/* Sign In Button */}
          {path === "/" ? (
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/dashboard"
                className="btn-primary bg-green-700 font-bold px-5 py-3 rounded-full text-nowrap flex md:hidden lg:flex"
              >
                Joint the Vault
              </Link>
            </div>
          ) : (
            <ConnectButton  />
          )}
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
        <div className="md:hidden bg-background border-t border-green-700">
          <div className="container-custom py-4 flex flex-col gap-4 px-4">
            <Link href="/" className="text-white hover:text-white transition">
              Home
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-white transition"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-white hover:text-white transition"
            >
              Projects
            </Link>
            <Link
              href="/carbon-credits"
              className="text-white hover:text-white transition"
            >
              Carbon Credits
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-white transition"
            >
              Contact
            </Link>
            <Link
              href="/register"
              className="btn-primary text-center rounded-full bg-green-700 py-2 "
            >
              Joint the Vault
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
