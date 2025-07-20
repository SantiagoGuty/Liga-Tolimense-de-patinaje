// src/data/noticias.ts
import seleccion1 from '../assets/img/seleccion1.jpg';
import premiacion1 from '../assets/img/premiacion1.jpg';
import artistico1 from '../assets/img/artistico1.jpg';

export interface Noticia {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  content: string;
}

const noticias: Noticia[] = [
  {
    slug: 'tolima-oro',
    title: '¡Tolima abraza el oro!',
    excerpt: 'La selección tolimense acaba de terminar una jornada histórica en Cartagena…',
    image: seleccion1,
    content: `La delegación tolimense desplegó un rendimiento excepcional durante el campeonato nacional de patinaje de velocidad celebrado en Cartagena. Desde la primera prueba de los 500 metros hasta la final de relevos por equipos, nuestros atletas demostraron disciplina y un nivel técnico impecable.

El ambiente en la pista fue electrizante: cientos de espectadores alentaron a los patinadores en cada curva y recta. Gracias a la dedicación de los entrenadores y al apoyo de la comunidad, Tolima consigue medallas de oro, plata y bronce, consolidándose como potencia en el patinaje nacional.

"Estoy muy orgulloso de mi equipo", comentó el entrenador jefe Juan Pérez. "Han trabajado durante meses para esto y verlo materializarse es la mejor recompensa". Además, varias marcas locales han anunciado su respaldo para futuras giras nacionales, evidenciando el impacto del logro en la región.

De cara a los próximos eventos, la liga ya planea una serie de exhibiciones y clínicas gratuitas para jóvenes talentos en Ibagué, buscando inspirar a la próxima generación de patinadores.`
  },
  {
    slug: 'curso-ibague',
    title: 'Nuevo curso de patinaje en Ibagué',
    excerpt: 'Inscripciones abiertas para todas las edades y niveles.',
    image: premiacion1,
    content: `La Liga Tolimense abre las inscripciones para su nuevo curso de iniciación al patinaje en Ibagué. Las clases, diseñadas para principiantes de todas las edades, se impartirán en el Parque Deportivo de Laureles los martes y jueves, de 4:00 p.m. a 6:00 p.m.

Durante el curso, los participantes aprenderán técnicas básicas de equilibrio, giros y frenado seguro. Además, se incluirán sesiones de fortalecimiento muscular y dinámicas de grupo para fomentar la confianza sobre ruedas y el compañerismo entre los asistentes.

Las plazas son limitadas y se recomienda reservar con anticipación. El kit de bienvenida incluye rodilleras, coderas y casco, para garantizar la seguridad desde la primera sesión. El costo del curso cubre ocho clases y materiales.

Para más información, los interesados pueden comunicarse al (321) 397-9355 o visitar la oficina administrativa en la calle 93 #5-13. ¡No pierdas la oportunidad de ser parte de esta experiencia sobre ruedas!`
  },
  {
    slug: 'convocatoria-2025',
    title: 'Convocatoria abierta',
    excerpt: 'La Liga Tolimense invita a clubes a participar en la copa regional 2025.',
    image: artistico1,
    content: `La convocatoria para la Copa Regional de Patinaje Artístico 2025 ya está abierta. Pueden participar clubes de los departamentos del Tolima, Huila y Quindío en las categorías Pre Infantil, Infantil y Juvenil. El certamen se celebrará en el Teatro al Aire Libre de Ibagué del 10 al 13 de septiembre.

Los clubes interesados deben enviar su hoja de inscripción antes del 15 de agosto, incluyendo lista de patinadores, rutinas propuestas y ficha médica de cada participante. Este año, la competencia contará con un jurado internacional invitado, aumentando el nivel de exigencia y la calidad de los galardones.

Los premios incluyen medallas, trofeos y becas de entrenamiento para los mejores puntajes en cada categoría. Además, habrá clases magistrales impartidas por ex campeones mundiales durante el evento.

Para registrarse y descargar el reglamento completo, visita nuestra página web o acude a las instalaciones de la Liga Tolimense en Ibagué. ¡Aprovecha esta oportunidad para demostrar tu arte sobre ruedas!`
  }
];

export default noticias;
