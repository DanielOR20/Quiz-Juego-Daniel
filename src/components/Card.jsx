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
        {/* Reverso de la carta */}
        <div className="card-back" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          🏍️
        </div>

        {/* Frente con la foto de la moto */}
        <div className="card-front" style={{ padding: '0', overflow: 'hidden' }}>
          <img
            src={carta.imagen}
            alt={carta.nombre}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px'
            }}
          />
        </div>
      </div>
    </div>
  );
}