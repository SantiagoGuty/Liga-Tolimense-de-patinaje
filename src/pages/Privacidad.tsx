import Menu_bar from '../components/Menu_bar';
import FooterTol from '../components/FooterTol';

export default function Privacidad() {
  return (
    <div className="page-wrapper">
      <Menu_bar />
      <main style={{ maxWidth: 760, margin: '120px auto 4rem', padding: '0 1.25rem', lineHeight: 1.75 }}>
        <h1 style={{ color: '#6a1b1a', marginBottom: '0.5rem' }}>Política de Privacidad</h1>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Última actualización: abril de 2026
        </p>

        <h2 style={{ color: '#6a1b1a', fontSize: '1.1rem' }}>1. Responsable del tratamiento</h2>
        <p>
          La Liga Tolimense de Patinaje (en adelante "la Liga"), con sede en el departamento del Tolima, Colombia,
          es responsable del tratamiento de los datos personales recopilados a través del sitio web{' '}
          <strong>tolipatin.com</strong>.
        </p>

        <h2 style={{ color: '#6a1b1a', fontSize: '1.1rem' }}>2. Datos que recopilamos</h2>
        <p>Al crear una cuenta recopilamos:</p>
        <ul>
          <li>Nombre y apellidos</li>
          <li>Correo electrónico (proporcionado por Google)</li>
          <li>Número de teléfono</li>
          <li>Fecha de nacimiento</li>
          <li>Sexo</li>
          <li>Número de documento de identidad (cédula o tarjeta de identidad)</li>
          <li>Foto de perfil (opcional)</li>
        </ul>

        <h2 style={{ color: '#6a1b1a', fontSize: '1.1rem' }}>3. Finalidad del tratamiento</h2>
        <p>Los datos recopilados se utilizan para:</p>
        <ul>
          <li>Gestionar la membresía y el perfil del deportista dentro de la Liga</li>
          <li>Generar el código QR de identificación del miembro</li>
          <li>Registrar la asistencia a prácticas y eventos</li>
          <li>Comunicaciones relacionadas con actividades de la Liga</li>
        </ul>

        <h2 style={{ color: '#6a1b1a', fontSize: '1.1rem' }}>4. Base legal</h2>
        <p>
          El tratamiento de sus datos se realiza con base en el consentimiento del titular, de conformidad con
          la Ley 1581 de 2012 (Ley de Protección de Datos Personales de Colombia) y sus decretos reglamentarios.
        </p>

        <h2 style={{ color: '#6a1b1a', fontSize: '1.1rem' }}>5. Almacenamiento y seguridad</h2>
        <p>
          Los datos se almacenan en servicios de nube de Amazon Web Services (AWS) ubicados en la región
          us-east-1 (EE. UU.). AWS aplica medidas de seguridad técnicas y organizativas para proteger
          la información contra acceso no autorizado, pérdida o divulgación.
        </p>

        <h2 style={{ color: '#6a1b1a', fontSize: '1.1rem' }}>6. Compartición de datos</h2>
        <p>
          La Liga no vende, arrienda ni comparte sus datos personales con terceros con fines comerciales.
          Los datos pueden ser accedidos por administradores de la Liga únicamente para la gestión interna.
        </p>

        <h2 style={{ color: '#6a1b1a', fontSize: '1.1rem' }}>7. Derechos del titular</h2>
        <p>Usted tiene derecho a:</p>
        <ul>
          <li>Conocer, actualizar y rectificar sus datos personales</li>
          <li>Solicitar la supresión de sus datos (puede eliminar su cuenta desde su perfil)</li>
          <li>Revocar el consentimiento para el tratamiento de sus datos</li>
        </ul>
        <p>
          Para ejercer estos derechos puede escribir a{' '}
          <a href="mailto:sangumo2010@gmail.com" style={{ color: '#6a1b1a' }}>sangumo2010@gmail.com</a>.
        </p>

        <h2 style={{ color: '#6a1b1a', fontSize: '1.1rem' }}>8. Inicio de sesión con Google</h2>
        <p>
          Este sitio utiliza Google como proveedor de autenticación. Al iniciar sesión con Google, aceptas
          también las{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={{ color: '#6a1b1a' }}>
            Políticas de Privacidad de Google
          </a>. Solo utilizamos tu nombre, correo electrónico y foto de perfil de Google para crear tu cuenta.
        </p>

        <h2 style={{ color: '#6a1b1a', fontSize: '1.1rem' }}>9. Cambios a esta política</h2>
        <p>
          La Liga se reserva el derecho de actualizar esta política en cualquier momento. Los cambios
          se publicarán en esta misma página con la fecha de actualización.
        </p>
      </main>
      <FooterTol />
    </div>
  );
}
