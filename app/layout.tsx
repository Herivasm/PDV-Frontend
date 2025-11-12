import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const onest = Onest({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Punto de Venta",
  description: "Sistema de punto de venta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${onest.className} bg-gray-200`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
