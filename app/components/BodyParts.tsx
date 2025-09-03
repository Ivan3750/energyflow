"use client";
import React, { useState, useEffect } from "react";
import ExercisesModal from "./ExercisesModal";

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
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [data, setData] = useState<Exercise[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                "https://energyflow.b.goit.study/api/exercises?bodypart=back&muscles=lats&limit=9"
            );
            const json = await res.json();
            setData(json.results);
        };
        fetchData();
    }, []);

    return (
        <div className="w-full flex justify-center">
            <div className="grid grid-cols-3 gap-5">
                {data.map((exercise) => (
                    <div
                        key={exercise._id}
                        className="rounded-2xl p-4 bg-white shadow"
                    >
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <span className="rounded-2xl p-1 px-2 text-white bg-[#7E847F] text-sm font-[DM_Sans] font-medium">
                                    WORKOUT
                                </span>
                                <span>⭐{exercise.rating}</span>
                            </div>

                            <button
                                onClick={() => setSelectedExercise(exercise)}
                                className="px-3 py-1 сursor-pointer"
                            >
                                Start
                            </button>
                        </div>

                        <h3 className="text-lg capitalize mt-6 font-[DM_Sans]">
                            {exercise.name}
                        </h3>

                        <div className="flex flex-col gap-1 mt-2">
                            <p className="text-sm text-black font-[DM_Sans] capitalize">
                                <span className="text-[#1B1B1B66] mr-1">Burned calories:</span>
                                {exercise.burnedCalories}/{exercise.time} min
                            </p>
                            <p className="text-sm text-black font-[DM_Sans] capitalize">
                                <span className="text-[#1B1B1B66] mr-1">Body Part:</span>
                                {exercise.bodyPart}
                            </p>
                            <p className="text-sm text-black font-[DM_Sans] capitalize">
                                <span className="text-[#1B1B1B66] mr-1">Target:</span>
                                {exercise.target}
                            </p>
                        </div>
                    </div>
                ))}
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
