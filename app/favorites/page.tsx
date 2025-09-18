"use client";

import React, { useEffect, useState } from "react";
import QuoteCardFav from "../components/QuoteCardFav";
import { FaStar } from "react-icons/fa6";
import { useTranslate } from "../hooks/useTranslate";
import { useRouter } from "next/navigation";

interface FavoriteItem {
  id: string;
  bodyPart: string;
  name: string;
  target: string;
  rating: number;
  burnedCalories: number;
  time: number;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const { t } = useTranslate();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/not-acess");
      return;
    }

    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        const parsed: FavoriteItem[] = JSON.parse(stored);

        const uniqueFavorites = parsed
          .filter((item) => item && item.id)
          .filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.id === item.id)
          );

        setFavorites(uniqueFavorites);
      } catch (error) {
        console.error("Ошибка парсинга избранного:", error);
      }
    }
  }, [router]);

  const removeFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <QuoteCardFav />
      </div>

      <h1 className="text-xl font-bold mb-4">{t("favorites_title")}</h1>

      <section className="bg-[#E8E8E8] rounded-[50px] px-[48px] py-[55px]">
        {favorites.length === 0 ? (
          <p>{t("favorites_empty")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favorites.map((exercise) => (
              <div
                key={exercise.id}
                className="rounded-2xl p-4 bg-white shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="rounded-2xl p-1 px-2 text-white bg-[#7E847F] text-sm font-medium capitalize">
                      {t("favorites_workout")}
                    </span>
                    <span className="text-yellow-400 text-lg flex items-center gap-1">
                      <FaStar /> {exercise.rating}
                    </span>
                  </div>

                  <span
                    className="font-medium cursor-pointer"
                    onClick={() => removeFavorite(exercise.id)}
                  >
                    {t("favorites_delete")}
                  </span>
                </div>

                <h3 className="text-lg capitalize mt-6">{exercise.name}</h3>

                <div className="flex flex-wrap gap-4 mt-2 text-sm">
                  <p className="capitalize">
                    <span className="text-gray-500 mr-1">{t("favorites_burned")}:</span>
                    {exercise.burnedCalories}/{exercise.time} {t("favorites_min")}
                  </p>
                  <p className="capitalize">
                    <span className="text-gray-500 mr-1">{t("favorites_bodyPart")}:</span>
                    {exercise.bodyPart}
                  </p>
                  <p className="capitalize">
                    <span className="text-gray-500 mr-1">{t("favorites_target")}:</span>
                    {exercise.target}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}


      </section>
    </div>
  );
}
