"use client";

import React, { useState, useEffect } from "react";

type Equipment = {
    _id: string;
    name: string;
    gifUrl: string;
};

export default function Equipment() {
    const [data, setData] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(
            "https://energyflow.b.goit.study/api/exercises?bodypart=back&muscles=lats&limit=12"
        )
            .then((res) => res.json())
            .then((json) => {
                setData(json.results);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
                {data.map((equipment) => (
                    <div
                        key={equipment._id}
                        className="relative w-[313px] h-[250px] rounded-2xl overflow-hidden"
                    >
                        <img
                            src={equipment.gifUrl}
                            alt={equipment.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/55" />
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                            <h2 className="font-[DM_Sans] font-normal text-white text-[24px] capitalize">
                                {equipment.name}
                            </h2>
                            <p className="font-[DM_Sans] font-normal text-[#F6F6F666] text-[18px] mt-1">
                                Equipment
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
