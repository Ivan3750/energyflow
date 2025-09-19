"use client";
import { useState, useEffect } from "react";

type Muscle = {
    name: string;
    imgUrl: string;
    filter: string;
};

export default function Muscles({
    onSelectMuscle,
}: {
    onSelectMuscle: (name: string) => void;
}) {
    const [data, setData] = useState<Muscle[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

    useEffect(() => {
        fetch("https://energyflow.b.goit.study/api/filters?filter=Muscles&page=1&limit=12")
            .then((res) => res.json())
            .then((json) => {
                setData(json.results || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="w-full flex justify-center">
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-x-5 gap-y-10">
                {data.map((muscle) => {
                    const isSelected = selectedMuscle === muscle.name;
                    return (
                        <div
                            key={muscle.name}
                            onClick={() => {
                                setSelectedMuscle(muscle.name);
                                onSelectMuscle(muscle.name);
                            }}
                            className={`relative shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-[250px] h-[200px] rounded-2xl overflow-hidden cursor-pointer ${isSelected ? "ring-4 ring-[#FFD700]" : ""
                                }`}
                        >
                            <img
                                src={muscle.imgUrl}
                                alt={muscle.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/55" />
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                                <h2 className="font-[DM_Sans] font-normal text-white text-[24px] capitalize">
                                    {muscle.name}
                                </h2>
                                <p className="font-[DM_Sans] font-normal text-[#F6F6F666] text-[18px] mt-1">
                                    {muscle.filter}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
