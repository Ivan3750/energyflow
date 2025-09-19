"use client";
import { useState } from "react";
import Muscles from "./Muscles";
import ExercisesList from "./ExercisesList";
import Equipment from "./Equipment";
import { useTranslate } from "../hooks/useTranslate";

export default function Exercises() {
  const { t } = useTranslate();
  const [active, setActive] = useState<"muscles" | "exerciseslist" | "equipment">("muscles");
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

  return (
    <div className="flex justify-center w-full h-full overflow-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-12">
      <section className="bg-[#E8E8E8] w-full max-w-[1200px] rounded-[50px] px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 md:py-12 lg:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-[DM_Sans] font-semibold mb-4">
          {t("Exercises")}
          {(selectedMuscle || selectedEquipment) && (
            <span className="capitalize text-[#7E847F] text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">
              <span className="text-black text-lg sm:text-xl md:text-2xl lg:text-[44px] font-[DM_Sans] font-medium">
                {" "}/{" "}
              </span>
              {selectedMuscle || selectedEquipment}
            </span>
          )}
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => {
              setActive("muscles");
              setSelectedMuscle(null);
              setSelectedEquipment(null);
            }}
            className={`px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-[#7E847F] hover:text-white ${
              active === "muscles" && !selectedMuscle && !selectedEquipment
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
            className={`px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-[#7E847F] hover:text-white ${
              active === "exerciseslist" ||
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
            className={`px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-[#7E847F] hover:text-white ${
              active === "equipment" && !selectedEquipment
                ? "bg-[#7E847F] text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {t("Equipment")}
          </button>
        </div>

        <div>
          {active === "muscles" && !selectedMuscle && <Muscles onSelectMuscle={setSelectedMuscle} />}
          {active === "muscles" && selectedMuscle && <ExercisesList muscle={selectedMuscle} />}
          {active === "exerciseslist" && <ExercisesList />}
          {active === "equipment" && !selectedEquipment && <Equipment onSelectEquipment={setSelectedEquipment} />}
          {active === "equipment" && selectedEquipment && <ExercisesList equipment={selectedEquipment} />}
        </div>
      </section>
    </div>
  );
}
