import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'iKaad',
  description:
    'Lighting Fast KYC Verification for Nigerian Start UP and Scale ups growing fast!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-gray-100 items-center justify-items-center min-h-screen p-0 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <div className="bg-white w-screen h-screen sm:h-[694px] sm:w-[420px] border border-stone-100 grid grid-rows-[auto_1fr_auto] gap-8 p-4 sm:rounded-3xl shadow-sm">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
