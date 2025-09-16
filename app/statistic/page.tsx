"use client";

import React, { useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DateTime } from "luxon";

interface WorkoutEvent {
  id: string;
  title: string;
  start: string;
  duration: number;
}

export default function WorkoutStatsPage() {
  const [workouts, setWorkouts] = React.useState<WorkoutEvent[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("workout-events");
    if (stored) setWorkouts(JSON.parse(stored));
  }, []);

  const now = DateTime.now();

  const pastWorkouts = workouts.filter((w) =>
    DateTime.fromISO(w.start) <= now
  );
  const futureWorkouts = workouts.filter((w) =>
    DateTime.fromISO(w.start) > now
  );

   const dailyData = useMemo(() => {
    const byDay: Record<string, { duration: number }> = {};
    pastWorkouts.forEach((w) => {
      const day = DateTime.fromISO(w.start).toFormat("yyyy-MM-dd");
      if (!byDay[day]) byDay[day] = { duration: 0 };
      byDay[day].duration += w.duration;
    });
    return Object.entries(byDay)
      .map(([day, values]) => ({ day, ...values }))
      .sort((a, b) => (a.day > b.day ? 1 : -1));
  }, [pastWorkouts]);

   const weeklyData = useMemo(() => {
    const byWeek: Record<string, { duration: number }> = {};
    pastWorkouts.forEach((w) => {
      const dt = DateTime.fromISO(w.start);
      const week = `${dt.weekYear}-W${dt.weekNumber}`;
      if (!byWeek[week]) byWeek[week] = { duration: 0 };
      byWeek[week].duration += w.duration;
    });
    return Object.entries(byWeek)
      .map(([week, values]) => ({ week, ...values }))
      .sort((a, b) => (a.week > b.week ? 1 : -1));
  }, [pastWorkouts]);

   const avgDuration = pastWorkouts.length
    ? Math.round(
        pastWorkouts.reduce((sum, w) => sum + w.duration, 0) /
          pastWorkouts.length
      )
    : 0;

  return (
    <div className="p-6 max-w-6xl mx-auto grid gap-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Статистика тренувань
      </h1>

       <div className="bg-white p-6 rounded-3xl flex justify-around text-center">
        <div>
          <p className="text-gray-500">Вже відбулося</p>
          <p className="text-2xl font-bold">{pastWorkouts.length}</p>
        </div>
        <div>
          <p className="text-gray-500">Заплановано</p>
          <p className="text-2xl font-bold">{futureWorkouts.length}</p>
        </div>
        <div>
          <p className="text-gray-500">Середня тривалість</p>
          <p className="text-2xl font-bold">{avgDuration} хв</p>
        </div>
      </div>

       <div className="bg-white p-6 rounded-3xl">
        <h2 className="text-xl font-semibold mb-4">Список тренувань</h2>
        {workouts.length === 0 ? (
          <p className="text-gray-500">Тренувань немає</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {workouts.map((w) => (
              <li
                key={w.id}
                className="p-3 bg-gray-100 rounded-lg flex justify-between hover:bg-gray-200 transition"
              >
                <span>{w.title}</span>
                <span>{w.duration} хв</span>
              </li>
            ))}
          </ul>
        )}
      </div>

       <div className="bg-white p-6 rounded-3xl">
        <h2 className="text-xl font-semibold mb-4">Тривалість по днях</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dailyData}>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="duration"
              name="Тривалість (хв)"
              fill="#4f46e5"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

       <div className="bg-white p-6 rounded-3xl">
        <h2 className="text-xl font-semibold mb-4">Тривалість по тижнях</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklyData}>
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="duration"
              name="Тривалість (хв)"
              stroke="#4f46e5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
