import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { logout } from '@/app/auth/actions';
import Navigation from '@/components/Navigation';
import { MathJaxContext } from 'better-react-mathjax';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phyne - AP Physics C",
  description: "Interactive Learning Platform Architecture",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const theme = user?.user_metadata?.theme || 'dark';

  const mathJaxConfig = {
    loader: { load: ['[tex]/html'] },
    tex: {
      packages: { '[+]': ['html'] },
      inlineMath: [['\\(', '\\)']],
      displayMath: [['\\[', '\\]']]
    }
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning data-theme={theme}>
      <body>
        <MathJaxContext config={mathJaxConfig}>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navigation user={user} logoutAction={logout} />

            <main style={{ flex: 1 }}>
              {children}
            </main>
          </div>
        </MathJaxContext>
      </body>
    </html>
  );
}
