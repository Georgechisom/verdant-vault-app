"use client";

import { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function PurchaseConfirmationPage() {
  useEffect(() => {
    toast.success("Purchase completed successfully!");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10 py-10"
        style={{ backgroundImage: `url(/background.png)` }}
      />
      <Header />

      <section className="flex-1 py-20 px-4 flex items-center justify-center">
        <div className="container-custom max-w-2xl text-center">
          {/* Checkmark Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Thank You for Your Purchase!
          </h1>
          <p className="text-lg text-gray-100 mb-12">
            Your investment has been successfully processed. You can now track
            your carbon credits and investment returns in your dashboard.
          </p>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Purchase Summary
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600">Investment Amount</span>
                <span className="font-bold text-gray-900">$500.00</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600">Carbon Credits Earned</span>
                <span className="font-bold text-green-500">50 credits</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-mono text-sm text-gray-900">
                  TXN-2024-001234
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Date</span>
                <span className="text-gray-900">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Back to Dashboard
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/projects"
              className="btn-secondary inline-flex items-center justify-center"
            >
              Explore More Projects
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-2">What's Next?</h3>
            <ul className="text-blue-800 text-sm space-y-2 text-left">
              <li>
                ✓ Your carbon credits will be added to your account within 24
                hours
              </li>
              <li>✓ You can track your investment returns in the dashboard</li>
              <li>✓ Receive monthly updates on project progress and impact</li>
              <li>✓ Trade or sell your carbon credits on the marketplace</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
