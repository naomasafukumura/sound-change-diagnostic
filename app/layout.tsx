import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '音声変化診断 | 3分でわかるリスニングの弱点',
  description: '英語の音声変化（連結・脱落・弱形）を10問のクイズで診断。あなたのリスニングの弱点がわかります。',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#f8f9fb] text-[#0f172a] antialiased" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
        <main className="min-h-dvh max-w-[430px] mx-auto bg-white shadow-sm">
          {children}
        </main>
      </body>
    </html>
  );
}
