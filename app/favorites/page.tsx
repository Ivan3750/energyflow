"use client";

import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import QuoteCardFav from "../components/QuoteCardFav";
import { FaStar } from "react-icons/fa6";

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

  useEffect(() => {
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
  }, []);

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

      <h1 className="text-xl font-bold mb-4">Favorites</h1>

      <section className="bg-[#E8E8E8] rounded-[50px] px-[48px] py-[55px]">
        {favorites.length === 0 ? (
          <p>
            It appears that you haven&apos;t added any exercises to your favorites
            yet. To get started, you can add exercises that you like to your
            favorites for easier access in the future.
          </p>
        ) : (
          <div className="flex gap-4 flex-wrap">
            {favorites.map((exercise) => (
              <div
                key={exercise.id}
                className="rounded-2xl p-4 bg-white shadow-md hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="rounded-2xl p-1 px-2 text-white bg-[#7E847F] text-sm font-[DM_Sans] font-medium">
                      WORKOUT
                    </span>
                    <span className="text-yellow-400 text-lg flex items-center gap-1">
                      <FaStar />
                      {exercise.rating}
                    </span>
                  </div>

                  <span className="font-[DM_Sans] font-medium cursor-pointer" onClick={() => removeFavorite(exercise.id)}>
                    Delete
                  </span>
                </div>

                <h3 className="text-lg capitalize mt-6 font-[DM_Sans]">
                  {exercise.name}
                </h3>

                <div className="flex justify-between mt-2">
                  <p className="text-sm text-black font-[DM_Sans] capitalize">
                    <span className="text-[#1B1B1B66] mr-1">Burned calories:</span>
                    {exercise.burnedCalories}/{exercise.time} min
                  </p>
                  <p className="text-sm text-black font-[DM_Sans] capitalize">
                    <span className="text-[#1B1B1B66] mr-1">Body Part:</span>{" "}
                    {exercise.bodyPart}
                  </p>
                  <p className="text-sm text-black font-[DM_Sans] capitalize">
                    <span className="text-[#1B1B1B66] mr-1">Target:</span>{" "}
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
