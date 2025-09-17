"use client";

import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { useTranslate } from "../hooks/useTranslate"; 

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  createdAt: number;
};

export default function Chat() {
  const { t } = useTranslate(); 
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "sys",
      role: "system",
      text: t("systemWelcome"), 
      createdAt: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

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
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });
      const data = await resp.json();
      const assistantMsg: Message = {
        id: uuidv4(),
        role: "assistant",
        text: data.assistant || t("noAnswer"), 
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errMsg: Message = {
        id: uuidv4(),
        role: "assistant",
        text: t("serverError"), 
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
        <h1 className="text-2xl font-bold">{t("chatTitle")}</h1>
        <p className="text-sm text-gray-600">{t("chatSubtitle")}</p>
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
          placeholder={t("inputPlaceholder")} 
          className="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring"
        />
        <button
          onClick={send}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-60"
        >
          {loading ? "..." : t("sendButton")} 
        </button>
      </footer>
    </div>
  );
}
