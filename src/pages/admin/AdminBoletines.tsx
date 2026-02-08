import { useState } from 'react';
import Menu_bar from '../../components/Menu_bar';
import FooterTol from '../../components/FooterTol';

export default function AdminBoletines() {
  const [msg] = useState('Aquí irá el formulario para subir boletines.');

  return (
    <div className="page-wrapper">
      <Menu_bar />
      <main style={{ padding: '2rem 1rem', maxWidth: 900, margin: '0 auto' }}>
        <h1>Administración · Subir Boletines</h1>
        <p style={{ opacity: 0.8 }}>{msg}</p>

        {/* TODO: tu componente real de subida */}
        <div style={{ marginTop: 16, padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
          <strong>Placeholder</strong>
          <div>Implementa aquí: selección de PDF, metadata, subir a S3, guardar en GraphQL.</div>
        </div>
      </main>
      <FooterTol />
    </div>
  );
}
