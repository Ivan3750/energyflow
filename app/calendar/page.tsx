"use client";

import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import luxonPlugin from "@fullcalendar/luxon3";
import { DateTime } from "luxon";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { useTranslate } from "../hooks/useTranslate";
import { useRouter } from "next/navigation";

const LOCAL_STORAGE_KEY = "workout-events";

interface WorkoutEvent extends EventInit {
  id: string;
  title: string;
  start: string | Date;
  end?: string | Date;
  description?: string;
  duration?: number; 
  extendedProps?: any;
}

export default function WorkoutCalendar() {
    const router = useRouter();
  
  const { t } = useTranslate();
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<WorkoutEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<WorkoutEvent | null>(null);

  const [formTitle, setFormTitle] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDuration, setFormDuration] = useState(60);

  useEffect(() => {
 const token = localStorage.getItem("token");

    if (!token) {
      router.push("/not-acess");
      return;
    }

    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setEvents(JSON.parse(stored));
  }, []);

  const saveEvents = (newEvents: WorkoutEvent[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newEvents));
    setEvents(newEvents);
  };

  const openModal = (event?: WorkoutEvent) => {
    if (event) {
      setCurrentEvent(event);
      setFormTitle(event.title?.toString() || "");
      setFormDate(event.start?.toString() || "");
      setFormDesc(event.description || "");
      setFormDuration(event.duration || 60);
    } else {
      setCurrentEvent(null);
      setFormTitle("");
      setFormDate("");
      setFormDesc("");
      setFormDuration(60);
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formTitle || !formDate) return;

    const startDate = new Date(formDate);
    const endDate = new Date(startDate.getTime() + formDuration * 60000);

    if (currentEvent) {
      const newEvents = events.map((ev) =>
        ev.id === currentEvent.id
          ? {
              ...ev,
              title: formTitle,
              start: startDate,
              end: endDate,
              description: formDesc,
              duration: formDuration,
            }
          : ev
      );
      saveEvents(newEvents);
    } else {
      const newEvent: WorkoutEvent = {
        id: Date.now().toString(),
        title: formTitle,
        start: startDate,
        end: endDate,
        description: formDesc,
        duration: formDuration,
      };
      saveEvents([...events, newEvent]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!currentEvent) return;
    const newEvents = events.filter((ev) => ev.id !== currentEvent.id);
    saveEvents(newEvents);
    setIsModalOpen(false);
  };

  const today = DateTime.now();

  return (
    <div className="font-sans grid grid-rows-[80px_1fr] mt-[50px] min-h-screen bg-white">
      <section className="row-start-1 flex flex-col items-center justify-center py-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          {t("title")}
        </h1>
        <p className="text-gray-600 max-w-xl">
          {t("subtitle")}
        </p>
      </section>

      <section className="row-start-2 flex flex-col items-center sm:items-start px-6 sm:px-20 gap-8 w-full py-5">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => calendarRef.current?.getApi().today()}
              className="px-4 py-2 bg-gray-200 text-sm rounded-full"
            >
              {t("today")}
            </button>
            <button
              onClick={() => calendarRef.current?.getApi().prev()}
              className="px-4 py-2 bg-gray-200 text-sm rounded-full"
            >
              ◀
            </button>
            <button
              onClick={() => calendarRef.current?.getApi().next()}
              className="px-4 py-2 bg-gray-200 text-sm rounded-full"
            >
              ▶
            </button>
          </div>

          <button
            onClick={() => openModal()}
            className="px-6 py-3 bg-[#444] text-white font-medium rounded-full shadow transition"
          >
            +
          </button>
        </div>

        <div className="rounded-2xl shadow-xl overflow-hidden border border-gray-200 w-full bg-white">
          <FullCalendar
            ref={calendarRef}
            plugins={[luxonPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            initialDate={today.toJSDate()}
            events={events}
             eventContent={(args) => (
    <div className="text-white text-sm px-1 py-0.5">
      {args.event.title}
    </div>
  )}
            eventClick={(args) => {
              const ev = events.find((e) => e.id === args.event.id);
              if (ev) openModal(ev);
            }}
            eventDidMount={(args) => {
              tippy(args.el, {
                content: args.event.extendedProps.description || "",
                placement: "top",
                duration: 0,
                allowHTML: true,
              });
            }}
            windowResize={() => {
              if (window.innerWidth >= 768) {
                calendarRef.current?.getApi().changeView("timeGridWeek");
              } else {
                calendarRef.current?.getApi().changeView("timeGridDay");
              }
            }}
            slotDuration={"00:30:00"}
            slotMinTime={"05:00"}
            slotMaxTime={"22:00"}
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            allDaySlot={false}
            slotEventOverlap={false}
            weekends={false}
            headerToolbar={false}
            contentHeight={"auto"}
            nowIndicator
            dayHeaderContent={(renderProps) => {
              const date = DateTime.fromJSDate(renderProps.date);
              const todayClasses = renderProps.isToday
                ? "w-8 h-8 rounded-full bg-blue-500 text-white"
                : "";
              const weekday = date.toFormat("ccc");
              return (
                <div className="h-12 flex items-center justify-center py-3">
                  <span className="flex items-baseline font-normal leading-6">
                    {weekday}
                    <span
                      className={`flex items-center justify-center ml-1 font-semibold ${todayClasses}`}
                    >
                      {date.day}
                    </span>
                  </span>
                </div>
              );
            }}
            eventClassNames={() => [
              "rounded-lg",
              "px-2",
              "py-1",
              "text-sm",
              "bg-gradient-to-r from-[#444] to-[#444]",
              "text-white",
              "transition",
              "border-none"
            ]}
          />
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-fadeIn flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-gray-800 text-center">
              {currentEvent ? t("edit") : t("add")}
            </h3>
            <input
              type="text"
              placeholder={t("name")}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 placeholder-gray-400"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
            <input
              type="datetime-local"
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 placeholder-gray-400"
              value={formDate}
              onChange={(e) => setFormDate(e.target.value)}
            />
            <input
              type="number"
              min={15}
              step={15}
              placeholder={t("duration")}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 placeholder-gray-400"
              value={formDuration}
              onChange={(e) => setFormDuration(Number(e.target.value))}
            />
            <textarea
              placeholder={t("description")}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 placeholder-gray-400 resize-none h-24"
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-2">
              {currentEvent && (
                <button
                  onClick={handleDelete}
                  className="bg-[#940000] text-white px-5 py-2 rounded-2xl font-medium transition shadow-md"
                >
                  {t("delete")}
                </button>
              )}
              <button
                onClick={handleSave}
                className="bg-[#444] text-white px-5 py-2 rounded-2xl font-medium transition shadow-md"
              >
                {t("save")}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-5 py-2 rounded-2xl font-medium transition shadow-md"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
