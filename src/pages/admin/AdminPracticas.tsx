import Menu_bar from '../../components/Menu_bar';
import FooterTol from '../../components/FooterTol';
import MisPracticas from '../MisPracticas';

export default function AdminPracticas() {
  return (
    <div className="page-wrapper">
      <Menu_bar />
      <main style={{ padding: '2rem 1rem', maxWidth: 1100, margin: '0 auto' }}>
        <h1>Administración · Prácticas</h1>
        <p style={{ opacity: 0.8 }}>
          Crear/editar prácticas y revisar check-ins.
        </p>
        <MisPracticas />
      </main>
      <FooterTol />
    </div>
  );
}
