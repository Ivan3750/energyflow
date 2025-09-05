"use client";

import React from "react";
import { FaDumbbell } from "react-icons/fa";
import { useTranslate } from "../hooks/useTranslate";

export const SportsCard = () => {
  const { t } = useTranslate();

  return (
    <div className="sports-card">
      <FaDumbbell size={24} color="black" className="sports-icon" />
      <p className="sports-duration">{t("info_time")}</p>
      <p className="sports-description">{t("info_subtitle")}</p>
    </div>
  );
};
