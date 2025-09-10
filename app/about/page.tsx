"use client";

import { Dumbbell, Users, Clock, User } from "lucide-react";
import { useTranslate } from "../hooks/useTranslate";

export default function Home() {
  const { t } = useTranslate();

  const advantages = [
    { 
      icon: "🏋️", 
      title: t("modernEquipment"),
      description: t("modernEquipmentDesc")
    },
    { 
      icon: "👨‍🏫", 
      title: t("professionalTrainers"),
      description: t("professionalTrainersDesc")
    },
    { 
      icon: "⏰", 
      title: t("flexibleSchedule"),
      description: t("flexibleScheduleDesc")
    },
    { 
      icon: "🙋‍♂️", 
      title: t("personalTraining"),
      description: t("personalTrainingDesc")
    },
  ];

  const users = [
    { name: "Alice", icon: "A", comment: t("reviewAlice") },
    { name: "Bob", icon: "B", comment: t("reviewBob") },
    { name: "Clara", icon: "C", comment: t("reviewClara") },
    { name: "David", icon: "D", comment: t("reviewDavid") },
    { name: "Eva", icon: "E", comment: t("reviewEva") },
    { name: "Frank", icon: "F", comment: t("reviewFrank") }
  ];

  return (
    <main className="p-8 space-y-16">
      <section>
        <h2>{t("ourAdvantages")}</h2>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            {advantages.map((adv, i) => (
              <div key={i} className="advantage-card">
                <div className="card-icon">{adv.icon}</div>
                <div>
                  <h3>{adv.title}</h3>
                  <p className="text-sm">{adv.description}</p>
                </div>
              </div>
            ))}
          </div>
          <img 
            src="/img/treadmill.jpg" 
            alt={t("trainingAlt")} 
            className="rounded-xl shadow" 
          />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div className="training-card">
          <h3>{t("personalTraining")}</h3>
          <p>{t("personalTrainingDescFull")}</p>
        </div>
        <div className="grid gap-4">
          <img 
            src="/img/gym1.jpg" 
            alt="Зал" 
            className="rounded-xl shadow" 
          />
          <img 
            src="/img/gym2.jpg" 
            alt="Тренажери" 
            className="rounded-xl shadow" 
          />
        </div>
      </section>

      <section>
        <h2>{t("clientReviews")}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {users.map((user, i) => (
            <div key={i} className="comment-card">
              <div className="flex items-center gap-2 font-semibold">
                <span className="card-icon">{user.icon}</span>
                {user.name}
              </div>
              <p className="text-sm mt-2">"{user.comment}"</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
