"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import { mockProjects } from "../../../../lib/mockData";
import { ChevronRight, CheckCircle } from "lucide-react";

export default function InvestPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.projectId ?? "";

  const project = mockProjects.find((p) => p.id === projectId);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Project not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleNextStep = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setStep(2);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Integrate Hedera smart contract for investment
      // const investment = await submitInvestment(projectId, parseFloat(amount), userAccountId);

      toast.success("Investment confirmed!");
      setTimeout(() => {
        router.push("/purchase-confirmation");
      }, 1500);
    } catch (error) {
      toast.error("Investment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <section className="flex-1 py-12 px-4">
        <div className="container-custom max-w-2xl">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= 1
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step > 1 ? <CheckCircle size={24} /> : "1"}
                </div>
                <span className="font-semibold text-gray-900">
                  Project Selection
                </span>
              </div>
              <ChevronRight
                className={step >= 2 ? "text-green-500" : "text-gray-300"}
              />
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= 2
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step > 2 ? <CheckCircle size={24} /> : "2"}
                </div>
                <span className="font-semibold text-gray-900">
                  Investment Amount
                </span>
              </div>
              <ChevronRight
                className={step >= 3 ? "text-green-500" : "text-gray-300"}
              />
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= 3
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  3
                </div>
                <span className="font-semibold text-gray-900">
                  Confirmation
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-300 h-1 rounded-full">
              <div
                className="bg-green-500 h-1 rounded-full transition-all"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Project Selection */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Selected Project
              </h2>
              <div className="border border-gray-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Category</p>
                    <p className="font-semibold text-gray-900">
                      {project.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">
                      {project.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Target Amount</p>
                    <p className="font-semibold text-gray-900">
                      ${project.targetAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Progress</p>
                    <p className="font-semibold text-green-500">
                      {project.progress}%
                    </p>
                  </div>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="w-full btn-primary">
                Continue to Investment Amount
              </button>
            </div>
          )}

          {/* Step 2: Investment Amount */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Investment Amount
              </h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How much would you like to invest?
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-600 font-semibold">
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="1000"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    min="1"
                  />
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Payment Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment Amount</span>
                    <span className="font-semibold text-gray-900">
                      ${amount || "0"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carbon Credits (est.)</span>
                    <span className="font-semibold text-gray-900">
                      {amount ? Math.floor(parseFloat(amount) / 10) : 0} credits
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-lg text-green-500">
                      ${amount || "0"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 btn-secondary"
                >
                  Back
                </button>
                <button onClick={handleNextStep} className="flex-1 btn-primary">
                  Review Investment
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Confirm Investment
              </h2>
              <div className="border border-green-200 bg-green-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Investment Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Project</span>
                    <span className="font-semibold text-gray-900">
                      {project.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment Amount</span>
                    <span className="font-semibold text-gray-900">
                      ${amount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carbon Credits</span>
                    <span className="font-semibold text-green-500">
                      {Math.floor(parseFloat(amount) / 10)} credits
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 btn-secondary"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Confirm Investment"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
