'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding text-center" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background glow */}
        <div className="bg-glow-center"></div>

        <div className="container">
          <ScrollReveal direction="up" distance="40px" duration="1s">
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
            <h1 className="text-display-lg" style={{ marginBottom: '1.5rem' }}>
              Master University-Level<br />
              <span className="text-muted">Physics</span>
            </h1>
            <p className="text-body-lg text-muted" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
              An interactive, scaffolded digital experience translating extreme rigor into an accessible learning journey.
            </p>
            <div className="flex justify-center gap-md md-flex-col">
              <Link href="#modules" className="btn-primary">Explore Curriculum</Link>
              <Link href="#engines" className="btn-secondary">View Architecture</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Engines Section */}
      <section id="engines" className="section-padding section-bg-secondary">
        <div className="container">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center" style={{ marginBottom: '4rem' }}>
              <h2 className="text-display-md" style={{ marginBottom: '1rem' }}>The Four Engines</h2>
              <p className="text-body-md text-muted" style={{ maxWidth: '500px', margin: '0 auto' }}>
                Core systems designed to handle content delivery, interaction, and continuous assessment.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-auto-fit gap-lg">
            {/* Engine 1 */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="glass-panel">
                <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>01</div>
                <h3 className="text-display-sm" style={{ marginBottom: '1rem' }}>Scaffolding & Support</h3>
                <p className="text-body-sm text-muted">
                  Backend logic preventing cognitive overload. Includes Hint Cascades, "Why It's Wrong" decision trees, and embedded Calculus training wheels.
                </p>
              </div>
            </ScrollReveal>
            {/* Engine 2 */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="glass-panel">
                <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>02</div>
                <h3 className="text-display-sm" style={{ marginBottom: '1rem' }}>Concept Builders</h3>
                <p className="text-body-sm text-muted">
                  Digital step-by-step tools replacing passive reading. Features Free Body Diagram workflows, Energy Landscape Maps, and Gauss's Law 3D simulators.
                </p>
              </div>
            </ScrollReveal>
            {/* Engine 3 */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="glass-panel">
                <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>03</div>
                <h3 className="text-display-sm" style={{ marginBottom: '1rem' }}>Media Curation</h3>
                <p className="text-body-sm text-muted">
                  Targeted delivery of university-level material via clean textbook excerpt digitizers and precision MIT OCW micro-clips.
                </p>
              </div>
            </ScrollReveal>
            {/* Engine 4 */}
            <ScrollReveal direction="up" delay={0.5}>
              <div className="glass-panel">
                <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent)' }}>04</div>
                <h3 className="text-display-sm" style={{ marginBottom: '1rem' }}>AP Strategy Hub</h3>
                <p className="text-body-sm text-muted">
                  Late-stage exam focus featuring "Speed-Run" MCQ trainers, interactive FRQ Rubric Simulators, and Endurance Mode exams.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="section-padding">
        <div className="container">
          <ScrollReveal direction="up">
            <div className="flex justify-between items-end md-flex-col md-items-start" style={{ marginBottom: '4rem' }}>
              <div>
                <h2 className="text-display-md" style={{ marginBottom: '1rem' }}>Curriculum Roadmap</h2>
                <p className="text-body-md text-muted">Month-by-month interactive module sequencing.</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md-grid-cols-1 gap-xl">
            <ScrollReveal direction="left" delay={0.2}>
              <div>
                <h3 className="text-display-sm" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                  Mechanics (Sep - Dec)
                </h3>
                <div className="flex flex-col gap-lg">
                  <div className="flex gap-md">
                    <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>SEP</div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Kinematics & Dynamics</h4>
                      <p className="text-body-sm text-muted">Drag Force Differential interactive builders.</p>
                    </div>
                  </div>
                  <div className="flex gap-md">
                    <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>OCT</div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Energy & Momentum</h4>
                      <p className="text-body-sm text-muted">Energy Landscapes and 2D collision logic trees.</p>
                    </div>
                  </div>
                  <div className="flex gap-md">
                    <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>NOV</div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Rotational Mechanics</h4>
                      <p className="text-body-sm text-muted">Rolling Without Slipping trainers.</p>
                    </div>
                  </div>
                  <div className="flex gap-md">
                    <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>DEC</div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Gravitation & Oscillations</h4>
                      <p className="text-body-sm text-muted">Physical pendulum derivation scaffolding.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <div>
                <h3 className="text-display-sm" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                  E&M (Jan - Mar)
                </h3>
                <div className="flex flex-col gap-lg">
                  <div className="flex gap-md">
                    <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>JAN</div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Electrostatics</h4>
                      <p className="text-body-sm text-muted">Gauss&apos;s Law Architect &amp; charge density integral simulators.</p>
                    </div>
                  </div>
                  <div className="flex gap-md">
                    <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>FEB</div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Circuits & Magnetostatics</h4>
                      <p className="text-body-sm text-muted">RC circuit equations & Biot-Savart vector setups.</p>
                    </div>
                  </div>
                  <div className="flex gap-md">
                    <div style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: 600 }}>MAR</div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Electromagnetism</h4>
                      <p className="text-body-sm text-muted">Faraday&apos;s / Lenz&apos;s Law induced current direction simulators.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <footer className="section-bg-secondary" style={{ borderTop: '1px solid var(--border)', padding: '3rem 0', marginTop: 'auto' }}>
        <div className="container flex justify-between items-center md-flex-col gap-md">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            PHY<span className="text-primary">NE</span>
          </div>
          <div className="text-body-sm text-muted">
            &copy; 2026 Phyne Physics Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
