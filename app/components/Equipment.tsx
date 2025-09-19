"use client";
import { useState, useEffect } from "react";

type Equipment = {
  name: string;
  imgUrl: string;
  filter: string;
};

export default function Equipments({
  onSelectEquipment,
}: {
  onSelectEquipment: (name: string) => void;
}) {
  const [data, setData] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://energyflow.b.goit.study/api/filters?filter=Equipment&page=1&limit=12")
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
    <div className="w-fullflex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
        {data.map((equipment) => {
          const isSelected = selectedEquipment === equipment.name;
          return (
            <div
              key={equipment.name}
              onClick={() => {
                setSelectedEquipment(equipment.name);
                onSelectEquipment(equipment.name);
              }}
              className={`relative shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl  w-[250px] h-[200px] rounded-2xl overflow-hidden cursor-pointer ${isSelected ? "ring-4 ring-[#FFD700]" : ""
                }`}
            >
              <img
                src={equipment.imgUrl}
                alt={equipment.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                <h2 className="font-[DM_Sans] font-normal text-white text-[24px] capitalize">
                  {equipment.name}
                </h2>
                <p className="font-[DM_Sans] font-normal text-[#F6F6F666] text-[18px] mt-1">
                  {equipment.filter}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
