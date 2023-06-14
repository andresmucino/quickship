"use client"

import "@elastic/eui/dist/eui_theme_light.css";

import { EuiProvider } from "@elastic/eui";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EuiProvider colorMode="light">
      <html lang="en">
        <body>{children}</body>
      </html>
    </EuiProvider>
  );
}
