"use client";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import ExercisesModal from "./ExercisesModal";
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

export default function ExercisesList({ muscle }: { muscle?: string }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { t } = useTranslate();

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));

    const url = muscle
      ? `https://energyflow.b.goit.study/api/exercises?muscles=${muscle}&limit=9&page=${page}`
      : `https://energyflow.b.goit.study/api/exercises?limit=9&page=${page}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setExercises(data.results);
        setTotalPages(data.totalPages);
      });
  }, [muscle, page]);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const toggleFavorite = (exercise: Exercise) => {
    setFavorites((prev) => {
      const updated = prev.includes(exercise._id)
        ? prev.filter((id) => id !== exercise._id)
        : [...prev, exercise._id];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-3 gap-5">
        {exercises.map((exercise) => {
          const isFav = favorites.includes(exercise._id);
          return (
            <div
              key={exercise._id}
              className="rounded-2xl p-4 bg-white shadow-md"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="rounded-2xl p-1 px-2 text-white bg-[#7E847F] text-sm font-medium capitalize">
                    {t("workout")}
                  </span>
                  <span
                    className={`cursor-pointer text-lg flex items-center gap-0.5 ${
                      isFav ? "text-yellow-400" : "text-gray-400"
                    }`}
                    onClick={() => toggleFavorite(exercise)}
                  >
                    <FaStar /> {exercise.rating}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedExercise(exercise)}
                  className="px-3 py-1 cursor-pointer font-medium capitalize"
                >
                  {t("start")}
                </button>
              </div>

              <h3 className="text-lg capitalize mt-6">{exercise.name}</h3>

              <div className="flex gap-4 mt-2 text-sm">
                <p>
                  <span className="text-gray-500 mr-1">
                    {t("burnedCalories")}:
                  </span>
                  {exercise.burnedCalories}/{exercise.time} min
                </p>
                <p className="capitalize">
                  <span className="text-gray-500 mr-1">{t("bodyPart")}:</span>
                  {exercise.bodyPart}
                </p>
                <p className="capitalize">
                  <span className="text-gray-500 mr-1">{t("target")}:</span>
                  {exercise.target}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mt-6">
        {getPageNumbers().map((p, idx) =>
          p === "..." ? (
            <span key={idx} className="px-3 py-1">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => setPage(p as number)}
              className={`px-3 py-1 rounded-lg ${
                page === p ? "bg-[#7E847F] text-white" : "bg-gray-200"
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      {selectedExercise && (
        <ExercisesModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
}
