import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dr.Hash - Web3 加密社区 | Crypto Community",
  description:
    "Dr.Hash 是一个以投研、服务为主的加密社区，成立于2021年，社区用户22,000+。提供早期项目挖掘、趋势交易、投研内容产出和社区服务。",
  keywords: [
    "Dr.Hash",
    "crypto",
    "web3",
    "blockchain",
    "trading",
    "community",
    "加密货币",
    "区块链",
    "交易社区",
  ],
  openGraph: {
    title: "Dr.Hash - Web3 Crypto Community",
    description:
      "Research & service-driven crypto community with 22,000+ members since 2021.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
