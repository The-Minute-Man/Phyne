import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function Engine2Dashboard() {
  return (
    <main className="container section-padding">
      <ScrollReveal>
        <h1 className="text-display-md">Engine 2: Interactive Concept Builders</h1>
        <p className="text-body-lg text-muted" style={{ marginTop: '1rem' }}>
          Digital, step-by-step tools that replace traditional textbook reading.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <ul className="flex flex-col gap-md" style={{ marginTop: '2rem', listStyle: 'none', padding: 0 }}>
          <li className="glass-panel" style={{ padding: '1.5rem' }}>
            <strong>FBD & Drag Force Workflows:</strong> Drag-and-drop vector builders preceding differential equation setup.
          </li>
          <li className="glass-panel" style={{ padding: '1.5rem' }}>
            <strong>Gauss's Law Architect:</strong> 3D simulator requiring students to select appropriate Gaussian surfaces.
          </li>
          <li className="glass-panel" style={{ padding: '1.5rem' }}>
            <strong>Energy Landscape Maps:</strong> Visual tools to derive force graphs and identify equilibria.
          </li>
          <li className="glass-panel" style={{ padding: '1.5rem' }}>
            <strong>Biot-Savart Builders:</strong> Interactive setups forcing directionality checks before calculating magnetic fields.
          </li>
        </ul>
      </ScrollReveal>
    </main>
  );
}
