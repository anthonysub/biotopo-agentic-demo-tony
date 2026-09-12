import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Biotopo del Quetzal | Demo Agentic Workflows",
  description:
    "Landing page didactica del Biotopo del Quetzal para demostrar GitHub Agentic Workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
