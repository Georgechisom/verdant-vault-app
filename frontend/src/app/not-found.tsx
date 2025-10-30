'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <section className="flex-1 py-20 px-4 flex items-center justify-center">
        <div className="container-custom max-w-2xl text-center">
          {/* Error Icon */}
          <div className="mb-8 flex justify-center">
            <div className="text-8xl">😕</div>
          </div>

          {/* Error Message */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Suggestions */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="font-bold text-gray-900 mb-4">Here are some helpful links:</h3>
            <ul className="space-y-2 text-left">
              <li>
                <Link href="/" className="text-green-500 hover:underline">
                  → Go to Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-green-500 hover:underline">
                  → Browse Projects
                </Link>
              </li>
              <li>
                <Link href="/carbon-credits" className="text-green-500 hover:underline">
                  → View Carbon Credits
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-green-500 hover:underline">
                  → Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Back to Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 btn-primary"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

