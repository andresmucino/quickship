"use client";

import { Providers } from "@/common";

export default function CreateMessengerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main>{children}</main>
    </Providers>
  );
}
