// src/pages/admin/AdminUsuarios.tsx
import '../../styles/banner.css';
import '../../styles/admin/adminBanner.css';
import '../../styles/admin/adminBase.css';
import '../../styles/admin/adminUsuarios.css';

import Menu_bar from '../../components/Menu_bar';
import FooterTol from '../../components/FooterTol';
import UsersList from '../UsersList';

// pick any image you already have
import adminBanner from '../../assets/img/festibal1.jpg';

export default function AdminUsuarios() {
  return (
  <div className="page-wrapper carreras-page page-with-banner">
      <Menu_bar />

      {/* Banner (same layout as Carreras) */}
      <section className="page-banner admin-banner">
        <img src={adminBanner} alt="Panel de Administración" className="banner-img" />
        <h1 className="banner-title">Administración</h1>
      </section>

      {/* Content */}
      <section className="admin-page">
        <header className="admin-header">
          <h2 className="admin-title">Usuarios</h2>
          <p className="admin-subtitle">Gestiona usuarios registrados y sus perfiles.</p>
        </header>

        <div className="admin-card">
          <div className="admin-card-head">
            <h2>Listado</h2>
          </div>
          <div className="admin-card-body admin-users-grid">
            <UsersList />
          </div>
        </div>
      </section>

      <FooterTol />
    </div>
  );
}
