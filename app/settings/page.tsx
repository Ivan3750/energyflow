"use client"

import { useState } from "react";
import Button from "../components/Button";
import { Smartphone, Mail, MessageSquare, LogOut, User } from "lucide-react";

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    birthday: "",
    height: "",
    weight: "",
  });

  const [notifications, setNotifications] = useState({
    pushNotifications: false,
    emailNotifications: false,
    smsNotifications: false,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <h2 className="text-lg font-semibold">Profile Information</h2>

          
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <h3 className="font-medium">Profile Photo</h3>
              <p className="text-gray-500 mb-2">Add a photo to personalize your account</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-[#444] text-white">Upload Photo</button>
                <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-900">Remove</button>
              </div>
            </div>
          </div>

          <hr className="border-gray-300 my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block font-medium">First Name</label>
              <input
                id="firstName"
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block font-medium">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block font-medium">Email Address</label>
            <input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="gender" className="block font-medium">Gender</label>
            <select
              id="gender"
              value={profile.gender}
              onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="birthday" className="block font-medium">Birthday</label>
              <input
                id="birthday"
                type="date"
                value={profile.birthday}
                onChange={(e) => setProfile(prev => ({ ...prev, birthday: e.target.value }))}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="height" className="block font-medium">Height</label>
              <input
                id="height"
                type="number"
                value={profile.height}
                onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="weight" className="block font-medium">Weight</label>
              <input
                id="weight"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]"
              />
            </div>
          </div>

          <button className="px-4 py-2 rounded-lg bg-[#444] text-white mt-4">Save Changes</button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-lg font-semibold">Delivery Methods</h2>
          {[
            { icon: <Smartphone className="h-4 w-4" />, label: "Push Notifications", key: "pushNotifications" },
            { icon: <Mail className="h-4 w-4" />, label: "Email Notifications", key: "emailNotifications" },
            { icon: <MessageSquare className="h-4 w-4" />, label: "SMS Notifications", key: "smsNotifications" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center gap-2">{item.icon}<span>{item.label}</span></div>
              <input
                type="checkbox"
                checked={notifications[item.key as keyof typeof notifications]}
                onChange={(e) =>
                  setNotifications(prev => ({ ...prev, [item.key]: e.target.checked }))
                }
                className="w-5 h-5 rounded"
              />
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-lg font-semibold">Account Actions</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-start gap-2">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
            <button className="flex items-center justify-start gap-2">
              <User className="h-4 w-4" /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
