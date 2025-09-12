"use client";

import { useState, useEffect } from "react";
import PageLoader from "./PageLoader";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  return <>{children}</>;
}
