export default function Card({ carta, volteada, emparejada, alHacerClick }) {
  const handleClick = () => {
    if (!volteada && !emparejada) {
      alHacerClick(carta);
    }
  };

  const estadoClase = emparejada ? 'matched' : volteada ? 'flipped' : '';

  return (
    <div className={`card-container ${estadoClase}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-back">❓</div>
        <div className="card-front">{carta.simbolo}</div>
      </div>
    </div>
  );
}