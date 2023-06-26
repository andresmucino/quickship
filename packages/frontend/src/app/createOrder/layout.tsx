"use client";

import { Providers } from "@/common";
import { CreateOrderProvider } from "@/hooks";
import { EuiProvider } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.css";

export default function CreateOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EuiProvider colorMode="light">
      <Providers>
        <CreateOrderProvider>
          <main>{children}</main>
        </CreateOrderProvider>
      </Providers>
    </EuiProvider>
  );
}
