import React from "react";

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
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="flex bg-white rounded-2xl p-6 w-[732px] shadow-lg">
                <img src={exercise.gifUrl} alt="" />
                <div>  <div className="flex ">
                    <h2 className="text-xl font-bold  text-center">{exercise.name}</h2>
                    <button
                        onClick={onClose}
                        className="text-xl text-black  cursor-pointer text-center"
                    >
                        X
                    </button>
                </div>
                    <div><p className="mb-4">⭐ Rating: {exercise.rating}</p>
                        <p className="mb-2 capitalize">
                            <span className="text-gray-500 font-[DM_Sans] capitalize">Target:</span> {exercise.target}
                        </p>
                        <p className="mb-2 capitalize">
                            <span className="text-gray-500 font-[DM_Sans] capitalize">Body part:</span> {exercise.bodyPart}
                        </p>
                        <p className="mb-2 capitalize">
                            <span className="text-gray-500 font-[DM_Sans] capitalize">Equipment:</span> {exercise.equipment}
                        </p>
                        <p className="mb-2 capitalize">
                            <span className="text-gray-500 font-[DM_Sans] capitalize">Body part:</span> {exercise.bodyPart}
                        </p>
                        <p className="mb-2 capitalize">
                            <span className="text-gray-500 font-[DM_Sans] capitalize">Popularity:</span> {exercise.popularity}
                        </p>
                        <p className="mb-2 capitalize">
                            <span className="text-gray-500 font-[DM_Sans]" >Burned calories:</span>{" "}
                            {exercise.burnedCalories} / {exercise.time} min
                        </p>
                        <p className="text-gray-500 font-[DM_Sans] capitalize">
                            {exercise.description}
                        </p>
                        <div>
                            <button>Add to favorites</button>
                            <button>Give a rating</button>
                        </div>
                    </div></div>

            </div>
        </div>
    );
}
