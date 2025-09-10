"use client";

import { useRouter } from "next/navigation";

export default function NotAccessPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-[40px]  p-12 max-w-5xl w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          У вас немає доступу
        </h1>
        <p className="text-gray-600 mb-6">
          Якщо хочете отримати доступ до цієї сторінки просто зареєструйтесь.
        </p>
        <button
          className="w-full rounded-xl text-lg py-3"
          onClick={() => router.push("/register")}
        >
          Зареєструватися
        </button>
      </div>
    </div>
  );
}
