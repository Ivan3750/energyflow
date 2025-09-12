"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslate } from "../hooks/useTranslate";

type Exercise = {
  _id: string;
  bodyPart: string;
  name: string;
  target: string;
  rating: number;
  burnedCalories: number;
  time: number;
  equipment: string;
  popularity: string;
  description: string;
  gifUrl: string;
};

type FavoriteItem = {
  id: string;
  bodyPart: string;
  name: string;
  target: string;
  rating: number;
  burnedCalories: number;
  time: number;
};

type ExercisesModalProps = {
  exercise: Exercise;
  onClose: () => void;
};

export default function ExercisesModal({ exercise, onClose }: ExercisesModalProps) {
  const { t } = useTranslate();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const favorites: FavoriteItem[] = JSON.parse(storedFavorites);
      const exists = favorites.some((f) => f.id === exercise._id);
      setIsAdded(exists);
    }
  }, [exercise._id]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleAddToFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");
    let favorites: FavoriteItem[] = storedFavorites ? JSON.parse(storedFavorites) : [];

    const exists = favorites.some(fav => fav.id === exercise._id);
    if (!exists) {
      const newFavorite: FavoriteItem = {
        id: exercise._id,
        bodyPart: exercise.bodyPart,
        name: exercise.name,
        target: exercise.target,
        rating: exercise.rating,
        burnedCalories: exercise.burnedCalories,
        time: exercise.time,
      };

      favorites.push(newFavorite);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsAdded(true);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative flex bg-white rounded-2xl !p-[40px] w-[732px] shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-xl text-black cursor-pointer"
        >
          X
        </button>

        <img src={exercise.gifUrl} alt={exercise.name} className="w-[270px]" />

        <div className="ml-4">
          <h2 className="text-2xl !mb-[8px] font-bold capitalize">{exercise.name}</h2>
          <p className="!mb-[16px]">⭐ {t("rating")}: {exercise.rating}</p>
          <div className="flex grid grid-cols-4 gap-[20px]">
            <p className="capitalize whitespace-nowrap">
              <span className="block text-gray-500 text-sm font-[DM_Sans] capitalize">
                {t("target")}
              </span>
              {exercise.target}
            </p>
            <p className="capitalize whitespace-nowrap">
              <span className="block text-gray-500 text-sm font-[DM_Sans] capitalize">
                {t("bodyPart")}
              </span>
              {exercise.bodyPart}
            </p>
            <p className="capitalize whitespace-nowrap">
              <span className="block text-gray-500 text-sm font-[DM_Sans] capitalize">
                {t("equipment")}
              </span>
              {exercise.equipment}
            </p>
            <p className="capitalize whitespace-nowrap">
              <span className="block text-gray-500 text-sm font-[DM_Sans] capitalize">
                {t("popularity")}
              </span>
              {exercise.popularity}
            </p>
            <p className="capitalize whitespace-nowrap col-span-4">
              <span className="block text-gray-500 text-sm font-[DM_Sans]">
                {t("burnedCalories")}
              </span>
              {exercise.burnedCalories} / {exercise.time} min
            </p>
          </div>

          <p className="text-gray-500 font-[DM_Sans] capitalize !mb-[32px] mt-4">
            {exercise.description}
          </p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAddToFavorites}
              disabled={isAdded}
              className={`rounded-3xl !py-[11px] !px-[20px] cursor-pointer font-[DM_Sans] text-white ${isAdded ? " cursor-not-allowed bg-[#7E847F] hover:bg-[#5F6560] " : "bg-[#7E847F] hover:bg-[#5F6560]"
                }`}
            >
              {isAdded ? t("Already added") : t("Add to favorites")}
            </button>

            <button className="rounded-3xl !py-[11px] !px-[15px] cursor-pointer font-[DM_Sans] border border-black hover:border-[#7E847F] hover:text-[#7E847F]">
              {t("giveRating")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
