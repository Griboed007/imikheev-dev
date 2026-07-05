import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { getTicker, getFocus } from "@/lib/telemetry";
import { ToastProvider } from "@/components/shell/ToastProvider";
import { Statusline } from "@/components/shell/Statusline";
import { Progress } from "@/components/shell/Progress";
import { Footer } from "@/components/shell/Footer";
import { CmdK } from "@/components/shell/CmdK";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ivan Mikheev — I engineer adoption",
  description:
    "Interfaces between intelligent systems and the people who use them: protocols, products, teams.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const ticker = getTicker();
  const focus = getFocus();
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body>
        <ToastProvider>
          <Statusline ticker={ticker} focus={focus} />
          <Progress />
          {children}
          <Footer />
          <CmdK />
        </ToastProvider>
      </body>
    </html>
  );
}
