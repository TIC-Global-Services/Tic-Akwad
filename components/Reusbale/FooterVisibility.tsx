"use client";

import { usePathname } from "next/navigation";

export default function FooterVisibility({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide footer only on /client (or extend as needed)
  if (pathname === "/client") {
    return null;
  }

  return <>{children}</>;
}
