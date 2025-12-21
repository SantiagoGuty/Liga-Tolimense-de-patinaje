import '../styles/footer.css';
import logo from '../assets/img/logo.png';


export default function FooterTol() {
  return (

    <div>
      
      {/* Footer */}
      <footer className="footer">

        <div className='footer_horizontal'>

          <a href="/">

            <img src={logo} alt="Logo" />

          </a>

          <p>Contáctanos<br />
            Teléfono: (321) 3979355<br />
            Dirección: Km1 Via Aeropuerto Perales, Ibagué - Tolima (Col)<br />
            Email: administracion@ligapatinajetolima.com
          </p>

        </div>
        
        <p>Todos los derechos reservados © Liga Tolimense De Patinaje 2025</p>
          
      </footer>
    </div>
  );
}
