import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';
import PracticasPanel from '../components/PracticasPanel';
import '../styles/admin/adminBase.css';

export default function MisPracticas() {
  return (
    <div className="page-wrapper admin-no-banner">
      <Menu_bar />

      <div className="admin-header">
        <h1 className="admin-title">Mis Prácticas</h1>
        <p className="admin-subtitle">Gestiona tus sesiones de entrenamiento y registra asistencia.</p>
      </div>

      <div className="admin-page">
        <PracticasPanel />
      </div>

      <FooterTol />
    </div>
  );
}
