import React from 'react';

export default function Engine2Dashboard() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Engine 2: Interactive Concept Builders</h1>
      <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>
        Digital, step-by-step tools that replace traditional textbook reading.
      </p>
      <ul style={{ marginTop: '2rem', listStyle: 'none' }}>
        <li style={{ marginBottom: '1rem' }}>
          <strong>FBD & Drag Force Workflows:</strong> Drag-and-drop vector builders preceding differential equation setup.
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <strong>Gauss's Law Architect:</strong> 3D simulator requiring students to select appropriate Gaussian surfaces.
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <strong>Energy Landscape Maps:</strong> Visual tools to derive force graphs and identify equilibria.
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <strong>Biot-Savart Builders:</strong> Interactive setups forcing directionality checks before calculating magnetic fields.
        </li>
      </ul>
    </main>
  );
}
