import '../../styles/admin/adminBase.css';

import Menu_bar from '../../components/Menu_bar';
import FooterTol from '../../components/FooterTol';
import PracticasPanel from '../../components/PracticasPanel';

export default function AdminPracticas() {
  return (
    <div className="page-wrapper admin-no-banner">
      <Menu_bar />

      <div className="admin-header">
        <h1 className="admin-title">Prácticas</h1>
        <p className="admin-subtitle">Crea prácticas, gestiona asistencia y revisa check-ins.</p>
      </div>

      <div className="admin-page">
        <PracticasPanel />
      </div>

      <FooterTol />
    </div>
  );
}
