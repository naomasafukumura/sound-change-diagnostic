import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '音声変化診断チェックシート',
  description: '3分であなたの音声変化の弱点がわかる診断ツール',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-white text-slate-900 font-sans antialiased">
        <main className="min-h-dvh max-w-md mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
