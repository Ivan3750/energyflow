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

export default function ExercisesList() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const { t } = useTranslate();

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }

    fetch(
      "https://energyflow.b.goit.study/api/exercises?bodypart=back&muscles=lats&limit=9"
    )
      .then((res) => res.json())
      .then((data) => setExercises(data.results))
      .catch((err) => console.error(err));
  }, []);

  const toggleFavorite = (exercise: Exercise) => {
    setFavorites((prev) => {
      let updated: string[];
      if (prev.includes(exercise._id)) {
        updated = prev.filter((id) => id !== exercise._id);
      } else {
        updated = [...prev, exercise._id];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-3 gap-5">
        {exercises.map((exercise) => {
          const isFav = favorites.includes(exercise._id);
          return (
            <div
              key={exercise._id}
              className="rounded-2xl !p-4 bg-white shadow-md hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="rounded-2xl !p-1 !px-2 text-white bg-[#7E847F] text-sm  font-medium">
                    {t("workout")}
                  </span>
                  <span
                    className={`cursor-pointer text-lg flex justify-between items-center gap-0.5 ${
                      isFav ? "text-yellow-400" : "text-gray-400"
                    }`}
                    onClick={() => toggleFavorite(exercise)}
                  >
                    <FaStar /> {exercise.rating}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedExercise(exercise)}
                  className="!px-3 !py-1 cursor-pointer  font-medium"
                >
                  {t("start")}
                </button>
              </div>

              <h3 className="text-lg capitalize !mt-6 ">
                {exercise.name}
              </h3>

              <div className="flex flex-col !gap-1 !mt-2">
                <p className="text-sm text-black  capitalize">
                  <span className="text-[#1B1B1B66] !mr-1">
                    {t("burnedCalories")}:
                  </span>
                  {exercise.burnedCalories}/{exercise.time} min
                </p>
                <p className="text-sm text-black  capitalize">
                  <span className="text-[#1B1B1B66] !mr-1">{t("bodyPart")}:</span>
                  {exercise.bodyPart}
                </p>
                <p className="text-sm text-black  capitalize">
                  <span className="text-[#1B1B1B66] !mr-1">{t("target")}:</span>
                  {exercise.target}
                </p>
              </div>
            </div>
          );
        })}
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
