"use client";

import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { useRouter } from "next/navigation";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  createdAt: number;
};

export default function Chat() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/not-acess");
      return;
    }
  }, []);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const getSystemText = (lang: string) => {
    switch (lang) {
      case "ua":
        return "Вітаю! Я - ваш спортивний помічник. Питаєте — отримуєте план або пораду.";
      case "pl":
        return "Witaj! Jestem twoim asystentem sportowym. Zapytaj — otrzymasz plan lub poradę.";
      case "en":
      default:
        return "Welcome! I am your sports assistant. Ask — and you’ll get a plan or advice.";
    }
  };

  useEffect(() => {
    const lang = localStorage.getItem("lang") || "en";
    setMessages([
      {
        id: "sys",
        role: "system",
        text: getSystemText(lang),
        createdAt: Date.now(),
      },
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: uuidv4(),
      role: "user",
      text: input.trim(),
      createdAt: Date.now(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data = await resp.json();
      const assistantMsg: Message = {
        id: uuidv4(),
        role: "assistant",
        text: data.assistant || "Немає відповіді",
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errMsg: Message = {
        id: uuidv4(),
        role: "assistant",
        text: "Помилка сервера. Спробуйте пізніше.",
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 h-screen flex flex-col">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Sports Assistant — чат</h1>
        <p className="text-sm text-gray-600">
          Швидкі поради, плани вправ та підказки для безпечного тренування.
        </p>
      </header>

      <main className="bg-white shadow rounded-lg flex-1 p-4 overflow-auto">
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={clsx(
                "p-3 rounded-lg max-w-[90%]",
                m.role === "user"
                  ? "bg-blue-50 ml-auto text-right"
                  : m.role === "assistant"
                  ? "bg-green-50 mr-auto text-left"
                  : "bg-gray-100 text-sm"
              )}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(m.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </main>

      <footer className="mt-4 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Питайте про тренування, вправи, плани..."
          className="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring"
        />
        <button
          onClick={send}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-[#444] text-white disabled:opacity-60 h-full"
        >
          {loading ? "..." : "Відправити"}
        </button>
      </footer>
    </div>
  );
}
