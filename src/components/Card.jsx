export default function Card({ carta, volteada, emparejada, alHacerClick }) {
  const handleClick = () => {
    if (!volteada && !emparejada) {
      alHacerClick(carta);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        height: '100px',
        backgroundColor: emparejada ? '#10b981' : volteada ? '#3b82f6' : '#1e293b',
        color: '#fff',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem',
        cursor: emparejada || volteada ? 'default' : 'pointer',
        userSelect: 'none',
        transition: 'transform 0.2s, background-color 0.3s',
        boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
      }}
    >
      {volteada || emparejada ? carta.simbolo : '❓'}
    </div>
  );
}