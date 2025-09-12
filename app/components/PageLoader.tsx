"use client";

import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}
