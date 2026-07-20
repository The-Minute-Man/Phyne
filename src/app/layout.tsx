import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { logout } from '@/app/auth/actions';

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

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Navigation */}
          <nav style={{ 
            padding: '1.5rem 0', 
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            backgroundColor: 'rgba(18, 18, 18, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 100
          }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                  <span style={{ 
                    display: 'inline-block', 
                    transform: 'rotate(45deg)', 
                    color: '#f5f5f5', 
                    fontSize: '1.8rem',
                    lineHeight: 1,
                    fontStyle: 'italic'
                  }}>
                    φ
                  </span>
                  <span>PHY<span style={{ color: 'var(--text-secondary)' }}>NE</span></span>
                </Link>
              </div>
              <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 500, alignItems: 'center' }}>
                <Link href="/#engines" className="nav-link">Architecture</Link>
                <Link href="/#modules" className="nav-link">Curriculum</Link>
                
                {user ? (
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link href="/home" className="nav-link">Dashboard</Link>
                    <Link href="/profile" className="nav-link">Profile</Link>
                    <form action={logout} style={{ display: 'inline', margin: 0 }}>
                      <button type="submit" className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Log Out</button>
                    </form>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/login" className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Log In</Link>
                    <Link href="/signup" className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Sign Up</Link>
                  </div>
                )}
              </div>
            </div>
          </nav>

          <main style={{ flex: 1 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
