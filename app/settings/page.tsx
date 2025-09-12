"use client";

import { useState, useEffect } from "react";
import { useTranslate } from "../hooks/useTranslate";
import Switch from "@mui/material/Switch";
import {
  Smartphone,
  Mail,
  MessageSquare,
  LogOut,
  User,
  Earth,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Settings = () => {
  const { t } = useTranslate();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (typeof window === "undefined") return;

        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch("/api/user", {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        });

        if (!res.ok) throw new Error("Fetch profile failed");
        const data = await res.json();

        if (!data.error) {
          // додамо мову з localStorage якщо є
          const storedLang = localStorage.getItem("lang");
          setUser({
            ...data,
            lang: storedLang || data.lang || "EN",
          });
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const saveProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    setSaving(true);
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (!data.error) {
        // оновимо user тільки з новими полями
        setUser((prev: any) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error("Save profile error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: any) => {
    setUser((prev: any) => ({ ...prev, [key]: value }));

    if (key === "lang") {
      localStorage.setItem("lang", value);
    }
  };

  const deleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await fetch("/api/user", {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    localStorage.removeItem("token");
    router.push("/login");
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
    });
    localStorage.removeItem("token");
    router.push("/login");
  };

  // Лоадер
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
          <p className="text-gray-600 font-medium">{t("settings_loading")}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">{t("settings_no_user")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-[1200px] mx-auto p-2">
        <div className="bg-white p-6 rounded-xl shadow space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {t("settings_profile_info")}
            </h2>
            <button
              onClick={saveProfile}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-[#444] text-white flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? t("settings_saving") : t("settings_save_changes")}
            </button>
          </div>

          <div className="space-y-2">
            <label className="block font-medium">
              {t("settings_first_name")}
            </label>
            <input
              type="text"
              value={user.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full rounded-xl border px-3 py-2"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">{t("settings_email")}</label>
            <input
              type="email"
              value={user.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full rounded-xl border px-3 py-2"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">{t("settings_gender")}</label>
            <select
              value={user.sex || ""}
              onChange={(e) => handleChange("sex", e.target.value)}
              className="w-full rounded-xl border px-3 py-2"
            >
              <option value="">{t("settings_gender_select")}</option>
              <option value="male">{t("settings_gender_male")}</option>
              <option value="female">{t("settings_gender_female")}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="date"
              value={user.birthday ? user.birthday.substring(0, 10) : ""}
              onChange={(e) => handleChange("birthday", e.target.value)}
              className="rounded-xl border px-3 py-2"
            />
            <input
              type="number"
              placeholder={t("settings_height")}
              value={user.height || ""}
              onChange={(e) => handleChange("height", e.target.value)}
              className="rounded-xl border px-3 py-2"
            />
            <input
              type="number"
              placeholder={t("settings_weight")}
              value={user.weight || ""}
              onChange={(e) => handleChange("weight", e.target.value)}
              className="rounded-xl border px-3 py-2"
            />
          </div>
        </div>

         <div className="bg-white p-6 rounded-xl shadow space-y-4 mt-6">
          <h2 className="text-lg font-semibold">{t("settings_delivery")}</h2>
          {[
            {
              icon: <Smartphone className="h-4 w-4" />,
              label: t("settings_push_notifications"),
              key: "pushNotifications",
            },
            {
              icon: <Mail className="h-4 w-4" />,
              label: t("settings_email_notifications"),
              key: "emailNotifications",
            },
            {
              icon: <MessageSquare className="h-4 w-4" />,
              label: t("settings_sms_notifications"),
              key: "smsNotifications",
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <Switch
                checked={user[item.key] || false}
                onChange={(e) => handleChange(item.key, e.target.checked)}
              />
            </div>
          ))}
        </div>

         <div className="bg-white p-6 rounded-xl shadow space-y-4 mt-6">
          <div className="flex gap-5 items-center">
            <Earth className="w-6 h-6" />
            <div>
              <h2 className="text-lg font-semibold">
                {t("settings_preferences")}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">
                {t("settings_language")}
              </label>
              <select
                value={user.lang || "EN"}
                onChange={(e) => handleChange("lang", e.target.value)}
                className="w-full rounded-xl border px-3 py-2"
              >
                <option value="EN">English</option>
                <option value="UA">Ukrainian</option>
                <option value="PL">Polish</option>
              </select>
            </div>
            <div className="hidden">
               {/* ПРИХОВАНО */}
              <label className="block font-medium">{t("settings_theme")}</label>
              <select
                value={user.theme || "light"}
                onChange={(e) => handleChange("theme", e.target.value)}
                className="w-full rounded-xl border px-3 py-2"
              >
                <option value="dark">{t("settings_theme_dark")}</option>
                <option value="light">{t("settings_theme_light")}</option>
              </select>
            </div>
          </div>
        </div>

         <div className="bg-white p-6 rounded-xl shadow space-y-4 mt-6">
          <h2 className="text-lg font-semibold">
            {t("settings_account_actions")}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-white rounded-2xl p-2 font-semibold"
            >
              <LogOut className="h-4 w-4" /> {t("settings_sign_out")}
            </button>
            <button
              onClick={deleteAccount}
              className="flex items-center gap-2 bg-[#C54B63] rounded-2xl p-2 text-white font-semibold"
            >
              <User className="h-4 w-4" /> {t("settings_delete_account")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
