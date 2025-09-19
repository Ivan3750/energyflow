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

export default function ExercisesModal({
  exercise,
  onClose,
}: ExercisesModalProps) {
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
    const favorites: FavoriteItem[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];

    const exists = favorites.some((fav) => fav.id === exercise._id);
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
      className="fixed inset-0 flex  items-center justify-center bg-black/50 z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="
  relative flex flex-col sm:flex-row 
  bg-white rounded-2xl p-6 sm:p-[40px] shadow-lg w-[335px] sm:w-[690px] md:w-[732px]  
"      >
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-xl text-black cursor-pointer"
        >
          X
        </button>
        <div className="flex items-center">    <img src={exercise.gifUrl} alt={exercise.name} className=" w-[270px] !h-[280px] sm:w-[270px] mb-4 sm:mb-0 mx-auto" /></div>

        <div className="ml-0 sm:ml-4 flex-1 flex flex-col">
          <h2 className="text-2xl mb-2 font-bold capitalize">{exercise.name}</h2>
          <p className="mb-4">
            ⭐ {t("rating")}: {exercise.rating}
          </p>

          <div className="flex flex-wrap gap-4 mb-4">
            <p className="flex-1 min-w-[120px] capitalize">
              <span className="block text-gray-500 text-sm">{t("target")}</span>
              {exercise.target}
            </p>
            <p className="flex-1 min-w-[120px] capitalize">
              <span className="block text-gray-500 text-sm">{t("bodyPart")}</span>
              {exercise.bodyPart}
            </p>
            <p className="flex-1 min-w-[120px] capitalize">
              <span className="block text-gray-500 text-sm">{t("equipment")}</span>
              {exercise.equipment}
            </p>
            <p className="flex-1 min-w-[120px] capitalize">
              <span className="block text-gray-500 text-sm">{t("popularity")}</span>
              {exercise.popularity}
            </p>
            <p className="flex-1 min-w-[120px] capitalize">
              <span className="block text-gray-500 text-sm">{t("burnedCalories")}</span>
              {exercise.burnedCalories} / {exercise.time} min
            </p>
          </div>

          <p className="text-gray-500 font-[DM_Sans] capitalize mb-8">
            {exercise.description}
          </p>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleAddToFavorites}
              className="rounded-3xl py-3 px-5 w-full sm:w-auto cursor-pointer text-white bg-[#7E847F] font-[DM_Sans] hover:bg-[#5F6560] capitalize"
            >
              {isAdded ? t("added") : t("add to favorites")}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
