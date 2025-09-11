import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/mongoose";
import Muscle from "@/app/model/Muscle";

const musclesData = [
  {
    name: "abductors",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Abductors.webp",
    translations: { ua: "Привідні м'язи", en: "Abductors", pl: "Mięśnie odwodziciele" }
  },
  {
    name: "abs",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Abs.webp",
    translations: { ua: "Прес", en: "Abs", pl: "Mięśnie brzucha" }
  },
  {
    name: "adductors",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Adductors.webp",
    translations: { ua: "Приведення м'язи", en: "Adductors", pl: "Mięśnie przywodziciele" }
  },
  {
    name: "biceps",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Biceps.webp",
    translations: { ua: "Біцепс", en: "Biceps", pl: "Biceps" }
  },
  {
    name: "calves",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Calves.webp",
    translations: { ua: "Ікри", en: "Calves", pl: "Łydki" }
  },
  {
    name: "cardiovascular system",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Cardiovascular_System.webp",
    translations: { ua: "Серцево-судинна система", en: "Cardiovascular System", pl: "uaład sercowo-naczyniowy" }
  },
  {
    name: "delts",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Delts.webp",
    translations: { ua: "Дельти", en: "Delts", pl: "Mięśnie naramienne" }
  },
  {
    name: "forearms",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Forearms.webp",
    translations: { ua: "Передпліччя", en: "Forearms", pl: "Przedramiona" }
  },
  {
    name: "glutes",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Glutes.webp",
    translations: { ua: "Сідниці", en: "Glutes", pl: "Pośladki" }
  },
  {
    name: "hamstrings",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Hamstrings.webp",
    translations: { ua: "Задня поверхня стегна", en: "Hamstrings", pl: "Mięśnie tylnej części uda" }
  },
  {
    name: "lats",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Lats.webp",
    translations: { ua: "Широчайші м'язи спини", en: "Lats", pl: "Mięśnie najszersze pleców" }
  },
  {
    name: "levator scapulae",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Levator_Scapulae.webp",
    translations: { ua: "Піднімач лопатки", en: "Levator Scapulae", pl: "Mięsień dźwigacz łopatki" }
  },
  {
    name: "pectorals",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Pectorals.webp",
    translations: { ua: "Грудні м'язи", en: "Pectorals", pl: "Mięśnie piersiowe" }
  },
  {
    name: "quads",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Quads.webp",
    translations: { ua: "Чотириголові м'язи стегна", en: "Quads", pl: "Mięśnie czworogłowe uda" }
  },
  {
    name: "serratus anterior",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Serratus_anterior.webp",
    translations: { ua: "Передній зубчастий м'яз", en: "Serratus Anterior", pl: "Mięsień zębaty przedni" }
  },
  {
    name: "spine",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Spine.webp",
    translations: { ua: "Хребет", en: "Spine", pl: "Kręgosłup" }
  },
  {
    name: "traps",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Traps.webp",
    translations: { ua: "Трапецієвидні м'язи", en: "Traps", pl: "Mięśnie czworoboczne" }
  },
  {
    name: "triceps",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Triceps.webp",
    translations: { ua: "Трицепс", en: "Triceps", pl: "Triceps" }
  },
  {
    name: "upper back",
    filter: { ua: "М'язи", en: "Muscles", pl: "Mięśnie" },
    imgUrl: "https://ftp.goit.study/img/energy-flow/Upper_Back.webp",
    translations: { ua: "Верхня частина спини", en: "Upper Back", pl: "Górna część pleców" }
  }
];



export async function GET() {
  try {
    await dbConnect();

    await Muscle.deleteMany({});
    console.log("Existing muscles deleted");

    const inserted = await Muscle.insertMany(musclesData);
    console.log(`${inserted.length} muscles inserted`);

    return NextResponse.json({ success: true, insertedCount: inserted.length });
  } catch (error) {
    console.error(error);
  }
}
