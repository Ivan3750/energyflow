"use client";

import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import luxonPlugin from "@fullcalendar/luxon3";
import { DateTime } from "luxon";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const LOCAL_STORAGE_KEY = "workout-events";

interface WorkoutEvent extends EventInit {
  id: string;           
  title: string;       
  start: string | Date; 
  end?: string | Date;   
  description?: string;  
  extendedProps?: any;  
}

export default function WorkoutCalendar() {
  const calendarRef = useRef<FullCalendar>(null);
  const [events, setEvents] = useState<WorkoutEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<WorkoutEvent | null>(null);

  const [formTitle, setFormTitle] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formDesc, setFormDesc] = useState("");

  useEffect(() => {
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
    } else {
      setCurrentEvent(null);
      setFormTitle("");
      setFormDate("");
      setFormDesc("");
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formTitle || !formDate) return;

    if (currentEvent) {
      const newEvents = events.map((ev) =>
        ev.id === currentEvent.id
          ? { ...ev, title: formTitle, start: formDate, description: formDesc }
          : ev
      );
      saveEvents(newEvents);
    } else {
      const newEvent: WorkoutEvent = {
        id: Date.now().toString(),
        title: formTitle,
        start: formDate,
        description: formDesc,
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
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Тренування на тиждень</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => calendarRef.current?.getApi().today()}
            className="px-4 py-2 bg-gray-200 text-sm rounded-lg hover:bg-gray-300 transition"
          >
            Сьогодні
          </button>
          <button
            onClick={() => calendarRef.current?.getApi().prev()}
            className="px-4 py-2 bg-gray-200 text-sm rounded-lg hover:bg-gray-300 transition"
          >
            ◀
          </button>
          <button
            onClick={() => calendarRef.current?.getApi().next()}
            className="px-4 py-2 bg-gray-200 text-sm rounded-lg hover:bg-gray-300 transition"
          >
            ▶
          </button>
        </div>
      </div>

      <button
        onClick={() => openModal()}
        className="mb-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
      >
         Додати вправу
      </button>

      <div className="rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <FullCalendar
          ref={calendarRef}
          plugins={[luxonPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          initialDate={today.toJSDate()}
          events={events}
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
          slotMinTime={"07:00"}
          slotMaxTime={"18:00"}
            slotLabelFormat={{
    hour: "2-digit",   
    minute: "2-digit", 
    hour12: false      
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
              ? "w-8 h-8 rounded-full bg-green-300 text-black"
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
            "bg-blue-500",
            "text-white",
            "hover:bg-blue-600",
            "transition",
          ]}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">
              {currentEvent ? "Редагувати вправу" : "Додати вправу"}
            </h3>
            <input
              type="text"
              placeholder="Назва вправи"
              className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
            <input
              type="datetime-local"
              className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formDate}
              onChange={(e) => setFormDate(e.target.value)}
            />
            <textarea
              placeholder="Опис вправи"
              className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              {currentEvent && (
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                >
                  Видалити
                </button>
              )}
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition"
              >
                Зберегти
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-lg transition"
              >
                Відміна
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
0