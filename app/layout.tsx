import type { Metadata, Viewport } from 'next';
import { DM_Sans, Playfair_Display, Caveat } from 'next/font/google';
import './globals.css';

const body = DM_Sans({ subsets: ['latin'], variable: '--font-body' });
const display = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });
const handwriting = Caveat({ subsets: ['latin'], variable: '--font-handwriting' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#fff9f6',
};

export const metadata: Metadata = {
  title: 'Happy Birthday Kanmani ❤️ | A Special Story Just For You',
  description: 'A magical birthday story crafted with lots of love, just for our dear Kanmani.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${display.variable} ${handwriting.variable}`}>
        {children}
      </body>
    </html>
  );
}
