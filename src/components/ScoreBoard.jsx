import { useGame } from '../context/GameContext';

export default function ScoreBoard({ dificultad, onReiniciar }) {
  const { jugador, movimientos, tiempo } = useGame();

  const formatearTiempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#334155',
      color: '#fff',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <div><strong>Jugador:</strong> {jugador}</div>
      <div><strong>Nivel:</strong> <span style={{ textTransform: 'capitalize', color: '#38bdf8' }}>{dificultad}</span></div>
      <div><strong>Movimientos:</strong> {movimientos}</div>
      <div><strong>Tiempo:</strong> {formatearTiempo(tiempo)}</div>
      <button 
        onClick={onReiniciar}
        style={{
          background: '#ef4444',
          color: '#fff',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Reiniciar
      </button>
    </div>
  );
}