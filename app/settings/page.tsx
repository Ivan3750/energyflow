"use client"

import { useState } from "react";
import Button from "../components/Button";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold">Settings</h1>
          <p className="text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="space-y-6">
          <div className="bg-white text-gray-900 flex flex-col gap-6 rounded-xl  p-6 ">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-lg font-semibold">Profile Information</h2>
                <p className="text-gray-500">
                  Update your personal details and profile picture
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative w-16 h-16 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <h3 className="font-medium">Profile Photo</h3>
                <p className="text-gray-500 mb-2">
                  Add a photo to personalize your account
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-[#444] text-white">
                    Upload Photo
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-900">
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <hr className="border-gray-300 my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block font-medium">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, firstName: e.target.value }))
                  }
                  className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560] transition"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="block font-medium">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, lastName: e.target.value }))
                  }
                  className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560] transition"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560] transition"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="block font-medium">
                Gender
              </label>
              <select
                id="gender"
                value={profile.gender}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560] transition"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="birthday" className="block font-medium">
                  Birthday
                </label>
                <input
                  id="birthday"
                  type="date"
                  value={profile.birthday}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, birthday: e.target.value }))
                  }
                  className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560] transition"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="height" className="block font-medium">
                  Height
                </label>
                <input
                  id="height"
                  type="number"
                  value={profile.height}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, height: e.target.value }))
                  }
                  className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560] transition"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="weight" className="block font-medium">
                  Weight
                </label>
                <input
                  id="weight"
                  type="number"
                  value={profile.weight}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, weight: e.target.value }))
                  }
                  className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560] transition"
                />
              </div>
            </div>
            <button className="px-4 py-2 rounded-lg bg-[#444] text-white">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
