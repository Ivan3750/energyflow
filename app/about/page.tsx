"use client";
import Image from "next/image";
import { Dumbbell, Users, Clock, User } from "lucide-react";
import { useTranslate } from "../hooks/useTranslate";
import s1 from "@/public/img/sport.webp";
import s2 from "@/public/img/fitnes-2.jpg";
import s3 from "@/public/img/fitnes-3.jpg";

export default function Home() {
  const { t } = useTranslate();

  const advantages = [
    {
      icon: <Dumbbell className="w-7 h-7" />,
      title: t("modernEquipment"),
      description: t("modernEquipmentDesc"),
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: t("professionalTrainers"),
      description: t("professionalTrainersDesc"),
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: t("flexibleSchedule"),
      description: t("flexibleScheduleDesc"),
    },
    {
      icon: <User className="w-7 h-7" />,
      title: t("personalTraining"),
      description: t("personalTrainingDesc"),
    },
  ];

  const users = [
    { name: "Alice", icon: "A", comment: t("reviewAlice") },
    { name: "Bob", icon: "B", comment: t("reviewBob") },
    { name: "Clara", icon: "C", comment: t("reviewClara") },
    { name: "David", icon: "D", comment: t("reviewDavid") },
    { name: "Eva", icon: "E", comment: t("reviewEva") },
    { name: "Frank", icon: "F", comment: t("reviewFrank") },
  ];

  return (
    <main className="p-8 space-y-24 bg-white">
      <section className="mx-auto">
        <h2 className="text-[44px] text-center font-semibold mb-6">
          {t("ourAdvantages")}
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            {advantages.map(({ icon, title, description }, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-[#8B4513] text-white p-6 rounded-[40px]"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 shrink-0 text-xl">
                  {icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Image
            src={s1}
            alt={t("trainingAlt")}
            className="rounded-[40px] w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-[44px] text-center font-semibold mb-6">
          {t("personalTraining")}
        </h2>

        <div className="flex flex-col md:flex-row gap-6 mx-auto">
          <div className="flex-1 rounded-[40px] overflow-hidden">
            <Image
              src={s2}
              alt={t("hallAlt")}
              className="w-full h-full object-cover"
              width={600}
              height={400}
            />
          </div>
          <div className="flex-1 rounded-[40px] bg-[#718096] text-white p-8 flex flex-col justify-center">
            <p className="text-lg leading-relaxed opacity-95">{t("persZan")}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse gap-6 mx-auto">
          <div className="flex-1 rounded-[40px] overflow-hidden">
            <Image
              src={s3}
              alt={t("machinesAlt")}
              className="w-full h-full object-cover"
              width={600}
              height={400}
            />
          </div>
          <div className="flex-1 rounded-[40px] bg-[#718096] text-white p-8 flex flex-col justify-center">
            <p className="text-lg leading-relaxed opacity-95">{t("persZan")}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto space-y-8">
        <h2 className="text-[44px] text-center font-semibold mb-6">
          {t("clientReviews")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {users.map(({ name, icon, comment }, i) => (
            <div
              key={i}
              className="bg-[#1e1e1e] border border-[#2c2c2c] rounded-[40px] p-6 w-full shadow-lg backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#2f2f2f] flex items-center justify-center border border-[#3a3a3a] text-white font-bold text-lg">
                  {icon}
                </div>
                <p className="text-white text-sm">{name}</p>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{comment}</p>
            </div>
          ))}
        </div>
      </section>

      <h2 className="text-[32px] font-semibold text-center">
        {t("changeYourself")}
      </h2>
      <div className="relative flex justify-center items-center my-24 h-[400px]">
        <div className="absolute w-[440px] h-[420px] bg-gray-300 rounded-full z-0" />
        <img
          src="https://static.tildacdn.com/tild3961-6236-4630-b266-353563303964/WhatsApp_Image_2021-.jpeg"
          alt="Sport"
          className="w-[390px] h-[390px] rounded-full object-cover relative z-10"
        />
        <div className="absolute text-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-1/3 bg-black/60 p-4 rounded-2xl">
          <h3 className="text-base mb-2">{t("individualTraining")}</h3>
          <p className="text-sm">{t("programPersonalized")}</p>
        </div>
      </div>

      <section className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-6 justify-center items-stretch">
          <div className="flex-1 min-w-[280px] max-w-[500px] bg-black text-white p-8 rounded-[40px] flex flex-col justify-center">
            <span className="flex items-center gap-2 mb-2">
              <User /> {t("personalApproach")}
            </span>
            <p>{t("personalApproachText")}</p>
          </div>
          <img
            className="flex-1 min-w-[280px] max-w-[500px] h-[250px] object-cover rounded-[40px]"
            src="https://img.championat.com/i/p/y/1631097555885234001.jpg"
            alt="Training"
          />
        </div>

        <div className="flex flex-wrap gap-6 justify-center items-stretch">
          <img
            className="flex-1 min-w-[280px] max-w-[500px] h-[250px] object-cover rounded-[40px]"
            src="https://feromon.ua/wp-content/uploads/2021/07/IMG_9515-1024x683.jpg"
            alt="Training"
          />
          <div className="flex-1 min-w-[280px] max-w-[500px] bg-black text-white p-8 rounded-[40px] flex flex-col justify-center">
            <span className="flex items-center gap-2 mb-2">
              <User /> {t("resultsInMonth")}
            </span>
            <p>{t("resultsInMonthText")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
