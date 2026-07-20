'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Hero Section */}
      <section style={{ 
        padding: '8rem 0 6rem', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(234, 234, 234, 0.03) 0%, rgba(18, 18, 18, 0) 70%)',
          zIndex: -1
        }}></div>

        <div className="container fade-in">
          <div style={{ 
            display: 'inline-block', 
            padding: '0.4rem 1rem', 
            borderRadius: '20px', 
            border: '1px solid var(--border)', 
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            AP Physics C Platform
          </div>
          <h1 className="hero-title" style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '4.5rem', 
            fontWeight: 700, 
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-1.5px'
          }}>
            Master University-Level<br />
            <span style={{ color: 'var(--text-secondary)' }}>Physics</span>
          </h1>
          <p className="hero-subtitle" style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '600px', 
            margin: '0 auto 3rem',
            lineHeight: 1.6
          }}>
            An interactive, scaffolded digital experience translating extreme rigor into an accessible learning journey.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="#modules" className="btn-primary" style={{ textDecoration: 'none' }}>Explore Curriculum</Link>
            <Link href="#engines" className="btn-secondary" style={{ textDecoration: 'none' }}>View Architecture</Link>
          </div>
        </div>
      </section>

      {/* Engines Section */}
      <section id="engines" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="fade-in delay-1">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem' }}>The Four Engines</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>Core systems designed to handle content delivery, interaction, and continuous assessment.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Engine 1 */}
            <div className="glass-panel fade-in delay-2" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>01</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1rem' }}>Scaffolding & Support</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Backend logic preventing cognitive overload. Includes Hint Cascades, "Why It's Wrong" decision trees, and embedded Calculus training wheels.
              </p>
            </div>
            {/* Engine 2 */}
            <div className="glass-panel fade-in delay-3" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>02</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1rem' }}>Concept Builders</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Digital step-by-step tools replacing passive reading. Features Free Body Diagram workflows, Energy Landscape Maps, and Gauss's Law 3D simulators.
              </p>
            </div>
            {/* Engine 3 */}
            <div className="glass-panel fade-in delay-4" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>03</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1rem' }}>Media Curation</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Targeted delivery of university-level material via clean textbook excerpt digitizers and precision MIT OCW micro-clips.
              </p>
            </div>
            {/* Engine 4 */}
            <div className="glass-panel fade-in delay-4" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>04</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1rem' }}>AP Strategy Hub</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Late-stage exam focus featuring "Speed-Run" MCQ trainers, interactive FRQ Rubric Simulators, and Endurance Mode exams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1rem' }}>Curriculum Roadmap</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Month-by-month interactive module sequencing.</p>
            </div>
          </div>

          <div className="modules-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                Mechanics (Sep - Dec)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>SEP</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Kinematics & Dynamics</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Drag Force Differential interactive builders.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>OCT</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Energy & Momentum</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Energy Landscapes and 2D collision logic trees.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>NOV</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Rotational Mechanics</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Rolling Without Slipping trainers.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>DEC</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Gravitation & Oscillations</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Physical pendulum derivation scaffolding.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                E&M (Jan - Mar)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>JAN</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Electrostatics</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Gauss's Law Architect & charge density integral simulators.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>FEB</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Circuits & Magnetostatics</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>RC circuit equations & Biot-Savart vector setups.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>MAR</div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Electromagnetism</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Faraday's / Lenz's Law induced current direction simulators.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '3rem 0', backgroundColor: 'var(--bg-secondary)', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            PHY<span style={{ color: 'var(--text-primary)' }}>NE</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            &copy; 2026 Phyne Physics Platform. All rights reserved.
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        /* Mobile overrides */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem !important;
            letter-spacing: -0.5px !important;
          }
          .hero-subtitle {
            font-size: 1rem !important;
            padding: 0 1rem !important;
          }
          .hero-buttons {
            flex-direction: column !important;
            padding: 0 1rem !important;
          }
          .hero-buttons > a {
            width: 100% !important;
            text-align: center !important;
          }
          .modules-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </>
  );
}
