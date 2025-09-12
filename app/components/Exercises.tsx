"use client";
import { useState } from "react";
import Muscles from "./Muscles";
import BodyParts from "./BodyParts";
import Equipment from "./Equipment";
import { useTranslate } from "../hooks/useTranslate";
export default function Exercises() {
    const { t } = useTranslate();
    const [active, setActive] = useState<"muscles" | "bodyparts" | "equipment">("muscles");

    return (
        <div className="w-full flex justify-center">
            <section className="bg-[#E8E8E8] rounded-[50px] !px-[48px] !py-[55px]">
                <h2 className="text-[44px] font-[DM_Sans] font-semibold !mb-4">{t("Exercises")}</h2>
                

                <div className="flex gap-2 !mb-8">
                    <button
                        onClick={() => setActive("muscles")}
                        className={`!px-4 cursor-pointer !py-2 rounded-full font-medium hover:bg-[#7E847F] hover:text-white  ${active === "muscles" ? "bg-[#7E847F] text-white" : "bg-white text-gray-700"
                            }`}
                    >
                        Muscles
                    </button>
                    <button
                        onClick={() => setActive("bodyparts")}
                        className={`!px-4 cursor-pointer !py-2 rounded-full font-medium hover:bg-[#7E847F] hover:text-white   ${active === "bodyparts" ? "bg-[#7E847F] text-white" : "bg-white text-gray-700"
                            }`}
                    >
                        Body parts
                    </button>
                    <button
                        onClick={() => setActive("equipment")}
                        className={`!px-4 cursor-pointer !py-2 rounded-full font-medium hover:bg-[#7E847F] hover:text-white   ${active === "equipment" ? "bg-[#7E847F] text-white" : "bg-white text-gray-700"
                            }`}
                    >
                        Equipment
                    </button>
                </div>

                <div>
                    {active === "muscles" && <Muscles />}
                    {active === "bodyparts" && <BodyParts />}
                    {active === "equipment" && <Equipment />}
                </div>
            </section>
        </div>
    );
}
