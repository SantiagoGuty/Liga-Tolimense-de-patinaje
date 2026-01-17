// FooterTol.tsx
import '../styles/footer.css';
import logo from '../assets/img/logo.png';

// ✅ adjust these paths to where your pngs actually live
import instagramIcon from '../assets/img/instagram.png';
import facebookIcon from '../assets/img/facebook.png';

export default function FooterTol() {
  return (
    <footer className="footer">
      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 250" preserveAspectRatio="none">
          {/* Gold area (filled) */}
          <path
            className="wave-gold"
            d="M0,120 C240,40 480,40 720,120 C960,200 1200,200 1440,120 L1440,0 L0,0 Z"
          />
          {/* Separator line */}
          <path
            className="wave-line"
            d="M0,120 C240,40 480,40 720,120 C960,200 1200,200 1440,120"
          />
        </svg>
      </div>

      <div className="footer-content">
        <div className="footer_horizontal">
          <a className="footer-logo" href="/">
            <img src={logo} alt="Logo" />
          </a>

          <div className="footer-contact">
            <p>
              Contáctanos<br />
              Teléfono: (310) 2102404<br />
              Dirección: Km1 Via Aeropuerto Perales, Ibagué - Tolima (Col)<br />
              Email: litolpat@hotmail.com
            </p>

            <div className="footer-socials">
              <a
                className="social-link"
                href="https://www.instagram.com/ligatolimensepatinaje/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <img
                  className="social-icon-img"
                  src={instagramIcon}
                  alt="Instagram"
                />
              </a>

              <a
                className="social-link"
                href="https://www.facebook.com/p/Liga-Tolimense-de-Patinaje-100054232716690/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <img
                  className="social-icon-img"
                  src={facebookIcon}
                  alt="Facebook"
                />
              </a>
            </div>
          </div>
        </div>

        <p className="footer-bottom">
          Todos los derechos reservados © Liga Tolimense De Patinaje 2026
        </p>
      </div>
    </footer>
  );
}
