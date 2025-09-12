import React from "react";
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

type ExercisesModalProps = {
  exercise: Exercise;
  onClose: () => void;
};

export default function ExercisesModal({ exercise, onClose }: ExercisesModalProps) {
  const { t } = useTranslate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative flex bg-white rounded-2xl !p-[40px] w-[732px] shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-xl text-black cursor-pointer"
        >
          X
        </button>

        <img src={exercise.gifUrl} alt="" className="w-[270px]" />

        <div className="ml-4">
          <h2 className="text-2xl !mb-[8px] font-bold capitalize">{exercise.name}</h2>
          <p className="!mb-[16px]">⭐ {t("rating")}: {exercise.rating}</p>
          <div className="flex grid grid-cols-4 gap-[20px]">
            <p className="capitalize whitespace-nowrap">
              <span className="block text-gray-500 text-sm  capitalize">
                {t("target")}
              </span>
              {exercise.target}
            </p>
            <p className="capitalize whitespace-nowrap">
              <span className="block text-gray-500 text-sm  capitalize">
                {t("bodyPart")}
              </span>
              {exercise.bodyPart}
            </p>
            <p className="capitalize whitespace-nowrap">
              <span className="block text-gray-500 text-sm  capitalize">
                {t("equipment")}
              </span>
              {exercise.equipment}
            </p>
            <p className="capitalize whitespace-nowrap">
              <span className="block text-gray-500 text-sm  capitalize">
                {t("popularity")}
              </span>
              {exercise.popularity}
            </p>
            <p className="capitalize whitespace-nowrap">
              <span className="block text-gray-500 text-sm ">
                {t("burnedCalories")}
              </span>
              {exercise.burnedCalories} / {exercise.time} min
            </p>
          </div>

          <p className="text-gray-500  capitalize !mb-[32px]">
            {exercise.description}
          </p>

          <div className="flex gap-2 mt-4">
            <button className="rounded-3xl !py-[11px] !px-[20px] cursor-pointer text-white bg-[#7E847F]  hover:bg-[#5F6560]">
              {t("addToFavorites")}
            </button>
            <button className="rounded-3xl !py-[11px] !px-[15px] cursor-pointer  border border-black hover:border-[#7E847F] hover:text-[#7E847F]">
              {t("giveRating")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
