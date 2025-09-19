"use client";
import { useState } from "react";
import Muscles from "./Muscles";
import ExercisesList from "./ExercisesList";
import Equipment from "./Equipment";
import { useTranslate } from "../hooks/useTranslate";

export default function Exercises() {
  const { t } = useTranslate();
  const [active, setActive] = useState<
    "muscles" | "exerciseslist" | "equipment"
  >("muscles");
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  );

  return (
    <div className=" flex w-full sm:h-[930px] flex justify-center overflow-auto">
      <section className="bg-[#E8E8E8]  w-full h-full rounded-[50px] px-[48px] py-[55px]">
        <h2 className="text-[44px] font-[DM_Sans] font-semibold mb-4">
          {t("Exercises")}
          {(selectedMuscle || selectedEquipment) && (
            <span className="capitalize text-[#7E847F] text-3xl font-medium">
              <span className="text-[44px] text-black font-[DM_Sans] font-medium">
                {" "}
                /{" "}
              </span>
              {selectedMuscle || selectedEquipment}
            </span>
          )}
        </h2>

        <div className="flex  gap-2 mb-8">
          <button
            onClick={() => {
              setActive("muscles");
              setSelectedMuscle(null);
              setSelectedEquipment(null);
            }}
            className={`px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-[#7E847F] hover:text-white ${active === "muscles" && !selectedMuscle && !selectedEquipment
              ? "bg-[#7E847F] text-white"
              : "bg-white text-gray-700"
              }`}
          >
            {t("Muscles")}
          </button>

          <button
            onClick={() => {
              setActive("exerciseslist");
              setSelectedMuscle(null);
              setSelectedEquipment(null);
            }}
            className={`px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-[#7E847F] hover:text-white ${active === "exerciseslist" ||
              (active === "muscles" && selectedMuscle) ||
              (active === "equipment" && selectedEquipment)
              ? "bg-[#7E847F] text-white"
              : "bg-white text-gray-700"
              }`}
          >
            {t("Body parts")}
          </button>

          <button
            onClick={() => {
              setActive("equipment");
              setSelectedMuscle(null);
              setSelectedEquipment(null);
            }}
            className={`px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-[#7E847F] hover:text-white ${active === "equipment" && !selectedEquipment
              ? "bg-[#7E847F] text-white"
              : "bg-white text-gray-700"
              }`}
          >
            {t("Equipment")}
          </button>
        </div>


        <div>
          {active === "muscles" && !selectedMuscle && (
            <Muscles onSelectMuscle={setSelectedMuscle} />
          )}
          {active === "muscles" && selectedMuscle && (
            <ExercisesList muscle={selectedMuscle} />
          )}

          {active === "exerciseslist" && <ExercisesList />}

          {active === "equipment" && !selectedEquipment && (
            <Equipment onSelectEquipment={setSelectedEquipment} />
          )}
          {active === "equipment" && selectedEquipment && (
            <ExercisesList equipment={selectedEquipment} />
          )}
        </div>
      </section>
    </div>
  );
}
