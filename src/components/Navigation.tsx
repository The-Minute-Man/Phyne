'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavigationProps {
  user: unknown;
  logoutAction: () => void;
}

export default function Navigation({ user, logoutAction }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={{ 
      padding: '1rem 0', 
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      backgroundColor: 'var(--nav-bg)',
      backdropFilter: 'blur(12px)',
      zIndex: 100
    }}>
      <div className="container flex items-center justify-between" style={{ position: 'relative' }}>
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-sm">
          <Link href="/" className="flex items-center">
            <Image 
              src="/Phi_v6.png" 
              alt="Phyne Logo" 
              width={40} 
              height={40}
              style={{ filter: 'var(--logo-filter)' }}
            />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px', marginLeft: '0.5rem' }}>
              <span>PHY<span style={{ color: 'var(--text-secondary)' }}>NE</span></span>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="md-hidden flex items-center gap-lg">
          <Link href="/#engines" className="nav-link">Architecture</Link>
          <Link href="/#modules" className="nav-link">Curriculum</Link>
          
          {user ? (
            <div className="flex items-center gap-lg">
              <Link href="/home" className="nav-link">Dashboard</Link>
              <Link href="/profile" className="nav-link">Profile</Link>
              <form action={logoutAction} style={{ display: 'inline', margin: 0 }}>
                <button type="submit" className="btn-secondary btn-sm">Log Out</button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-sm">
              <Link href="/login" className="btn-secondary btn-sm">Log In</Link>
              <Link href="/signup" className="btn-primary btn-sm">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="mobile-menu-btn" style={{ display: 'none' }}>
          <button 
            onClick={toggleMenu} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-primary)', 
              cursor: 'pointer', 
              padding: '0.5rem' 
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="mobile-menu-dropdown" style={{ 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          width: '100%', 
          backgroundColor: 'var(--bg-secondary)', 
          borderBottom: '1px solid var(--border)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          zIndex: 99
        }}>
          <Link href="/#engines" className="nav-link" onClick={toggleMenu}>Architecture</Link>
          <Link href="/#modules" className="nav-link" onClick={toggleMenu}>Curriculum</Link>
          
          <hr style={{ borderColor: 'var(--border)', margin: '0.5rem 0', opacity: 0.5 }} />

          {user ? (
            <>
              <Link href="/home" className="nav-link" onClick={toggleMenu}>Dashboard</Link>
              <Link href="/profile" className="nav-link" onClick={toggleMenu}>Profile</Link>
              <form action={logoutAction}>
                <button type="submit" className="btn-secondary md-w-full">Log Out</button>
              </form>
            </>
          ) : (
            <div className="flex flex-col gap-sm">
              <Link href="/login" className="btn-secondary text-center md-w-full" onClick={toggleMenu}>Log In</Link>
              <Link href="/signup" className="btn-primary text-center md-w-full" onClick={toggleMenu}>Sign Up</Link>
            </div>
          )}
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}} />
    </nav>
  );
}
