"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { validateForm } from "@/lib/validation";
import { Bell, Lock, User } from "lucide-react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    email: "john@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    projectUpdates: true,
    creditAlerts: true,
    weeklyReport: false,
  });
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-10 py-10"
        style={{ backgroundImage: `url(/background.png)` }}
      />
      <Header />

      <section className="flex-1 py-12 px-4">
        <div className="container-custom max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-100 mb-12">
            Manage your account and preferences
          </p>

          <div className="space-y-8">
            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User size={24} /> Account Settings
              </h2>

              <form onSubmit={handleSaveChanges} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Password Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Lock size={20} /> Change Password
                  </h3>

                  {/* Current Password */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleFormChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* New Password */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleFormChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleFormChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Bell size={24} /> Notification Preferences
              </h2>

              <div className="space-y-4">
                {/* Email Notifications */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Email Notifications
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Receive email updates about your account
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={() =>
                      handleNotificationChange("emailNotifications")
                    }
                    className="w-5 h-5 text-green-500 rounded cursor-pointer"
                  />
                </div>

                {/* Project Updates */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Project Updates
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Get notified about project progress
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.projectUpdates}
                    onChange={() => handleNotificationChange("projectUpdates")}
                    className="w-5 h-5 text-green-500 rounded cursor-pointer"
                  />
                </div>

                {/* Credit Alerts */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Carbon Credit Alerts
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Alerts for carbon credit price changes
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.creditAlerts}
                    onChange={() => handleNotificationChange("creditAlerts")}
                    className="w-5 h-5 text-green-500 rounded cursor-pointer"
                  />
                </div>

                {/* Weekly Report */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Weekly Report
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Receive weekly investment and impact reports
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.weeklyReport}
                    onChange={() => handleNotificationChange("weeklyReport")}
                    className="w-5 h-5 text-green-500 rounded cursor-pointer"
                  />
                </div>
              </div>

              <button
                onClick={() =>
                  toast.success("Notification preferences updated!")
                }
                className="w-full btn-primary mt-6"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
