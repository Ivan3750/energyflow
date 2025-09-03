import React from "react";

type Exercise = {
    _id: string;
    bodyPart: string;
    name: string;
    target: string;
    rating: number;
    burnedCalories: number;
    time: number;
};

export default async function ExercisesList() {
    const res = await fetch(
        "https://energyflow.b.goit.study/api/exercises?bodypart=back&muscles=lats&limit=9"
    );

    const data = await res.json();

    return (<div className="w-full flex justify-center">
        <div className="grid grid-cols-3 gap-5">
            {data.results.map((exercise: Exercise) => (
                <div
                    key={exercise._id}
                    className=" rounded-2xl p-4 bg-white "
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <span className="rounded-2xl p-1 px-2 text-white bg-[#7E847F] text-sm font-[DM_Sans] font-medium">
                                WORKOUT
                            </span>
                            <span>⭐{exercise.rating}</span>
                        </div>

                        <span className=" font-[DM_Sans] font-medium">Start</span>
                    </div>

                    <h3 className="text-lg capitalize mt-6 font-[DM_Sans]">{exercise.name}</h3>


                    <div className="flex justify-between mt-2">
                        <p className="text-sm text-black font-[DM_Sans] capitalize">
                            <span className="text-[#1B1B1B66] mr-1 ">Burned calories:</span>{exercise.burnedCalories}/{exercise.time} min
                        </p>
                        <p className="text-sm text-black font-[DM_Sans] capitalize ">
                            <span className="text-[#1B1B1B66] mr-1 ">Body Part:</span> {exercise.bodyPart}
                        </p>
                        <p className="text-sm text-black font-[DM_Sans] capitalize">
                            <span className="text-[#1B1B1B66] mr-1">Target: </span>
                            {exercise.target}
                        </p>

                    </div>
                </div>
            ))}
        </div>
    </div>

    );
}
