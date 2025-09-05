"use client";

import { useState } from "react";
import { useTranslate } from "../hooks/useTranslate";
import Switch from "@mui/material/Switch";
import {
  Smartphone,
  Mail,
  MessageSquare,
  LogOut,
  User,
  Earth,
} from "lucide-react";

const Settings = () => {
  const { t } = useTranslate();

  const [profile, setProfile] = useState({
    name: "",
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
      <div className="container max-w-[1200px] mx-auto p-2">
        {/* Заголовок */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{t("settings_title")}</h1>
          <p className="text-gray-500">{t("settings_subtitle")}</p>
        </div>

        {/* Профиль */}
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <h2 className="text-lg font-semibold">{t("settings_profile_info")}</h2>

          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <h3 className="font-medium">{t("settings_profile_photo")}</h3>
              <p className="text-gray-500 mb-2">{t("settings_profile_photo_desc")}</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-[#444] text-white">{t("settings_upload")}</button>
                <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-900">{t("settings_remove")}</button>
              </div>
            </div>
          </div>

          <hr className="border-gray-300 my-4" />

          <div className="space-y-2">
            <label htmlFor="name" className="block font-medium">{t("settings_first_name")}</label>
            <input
              id="name"
              type="text"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block font-medium">{t("settings_email")}</label>
            <input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="gender" className="block font-medium">{t("settings_gender")}</label>
            <select
              id="gender"
              value={profile.gender}
              onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]"
            >
              <option value="">{t("settings_gender_select")}</option>
              <option value="male">{t("settings_gender_male")}</option>
              <option value="female">{t("settings_gender_female")}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="birthday" className="block font-medium">{t("settings_birthday")}</label>
              <input
                id="birthday"
                type="date"
                value={profile.birthday}
                onChange={(e) => setProfile(prev => ({ ...prev, birthday: e.target.value }))}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="height" className="block font-medium">{t("settings_height")}</label>
              <input
                id="height"
                type="number"
                value={profile.height}
                onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="weight" className="block font-medium">{t("settings_weight")}</label>
              <input
                id="weight"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]"
              />
            </div>
          </div>

          <button className="px-4 py-2 rounded-lg bg-[#444] text-white mt-4">{t("settings_save_changes")}</button>
        </div>

        
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-lg font-semibold">{t("settings_delivery")}</h2>
          {[ 
            { icon: <Smartphone className="h-4 w-4" />, label: t("settings_push_notifications"), key: "pushNotifications" },
            { icon: <Mail className="h-4 w-4" />, label: t("settings_email_notifications"), key: "emailNotifications" },
            { icon: <MessageSquare className="h-4 w-4" />, label: t("settings_sms_notifications"), key: "smsNotifications" }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center gap-2">{item.icon}<span>{item.label}</span></div>
              <Switch
                checked={notifications[item.key as keyof typeof notifications]}
                onChange={(e) => setNotifications(prev => ({ ...prev, [item.key]: e.target.checked }))}
              />
            </div>
          ))}
        </div>

       
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <div className="flex gap-5 items-center">
            <Earth className="w-6 h-6" />
            <div>
              <h2 className="text-lg font-semibold">{t("settings_preferences")}</h2>
              <p className="text-gray-500 mb-2">{t("settings_preferences_desc")}</p>
            </div>
          </div>
          <hr className="border-gray-300 my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block font-medium">{t("settings_language")}</label>
              <select className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]">
                <option value="EN">English</option>
                <option value="UA">Ukrainian</option>
                <option value="PL">Polish</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-medium">{t("settings_theme")}</label>
              <select className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#5F6560]">
                <option value="dark">{t("settings_theme_dark")}</option>
                <option value="light">{t("settings_theme_light")}</option>
              </select>
            </div>
          </div>
        </div>

       
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-lg font-semibold">{t("settings_account_actions")}</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-start gap-2 bg-white rounded-2xl p-2 font-semibold">
              <LogOut className="h-4 w-4" /> {t("settings_sign_out")}
            </button>
            <button className="flex items-center justify-start gap-2 bg-[#C54B63] rounded-2xl p-2 text-white font-semibold">
              <User className="h-4 w-4" /> {t("settings_delete_account")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
