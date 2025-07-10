import aliado1 from '../assets/img/fedepatin.jpg';
import aliado2 from '../assets/img/indeportes.png';
import aliado3 from '../assets/img/world_skate.png';
import '../styles/Aliados.css';

const aliados = [
  { img: aliado1, url: 'https://fedepatin.org.co/' },
  { img: aliado2, url: 'https://www.indeportes-tolima.gov.co/' },
  { img: aliado3, url: 'https://www.worldskate.org/' }
];

export default function Aliados() {
  return (
    <div className="logos-container">
      <div className="logos-wrapper">
        <div className="logos-slide">
          {[...aliados, ...aliados, ...aliados, ...aliados].map((aliado, index) => (
            <a key={index} href={aliado.url} target="_blank" rel="noopener noreferrer">
              <img src={aliado.img} alt={`aliado-${index}`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
