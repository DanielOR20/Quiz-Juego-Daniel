export default function Card({ carta, volteada, emparejada, alHacerClick }) {
  const handleClick = () => {
    if (!volteada && !emparejada) {
      alHacerClick(carta);
    }
  };

  const estaVisible = volteada || emparejada;

  return (
    <div className={`card-container ${estaVisible ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-inner">
        {/* Reverso: cuando está oculta */}
        <div className="card-back">
          <span style={{ fontSize: '2rem' }}>🏍️</span>
        </div>

        {/* Frente: cuando se voltea */}
        <div className="card-front">
          <img
            src={carta.imagen}
            alt={carta.nombre}
            className="card-image"
          />
        </div>
      </div>
    </div>
  );
}