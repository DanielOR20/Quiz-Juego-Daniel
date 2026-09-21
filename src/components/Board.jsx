import { useState, useEffect } from 'react';
import Card from './Card';
import { useGame } from '../context/GameContext';
import { sounds } from '../services/soundService';

export default function Board({ cartas, onJuegoCompletado }) {
  const { registrarMovimiento } = useGame();
  const [cartasBarajadas, setCartasBarajadas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [emparejadas, setEmparejadas] = useState([]);
  const [bloquearTablero, setBloquearTablero] = useState(false);

  useEffect(() => {
    if (cartas && cartas.length > 0) {
      const duplicadas = [...cartas, ...cartas].map((c, index) => ({
        ...c,
        instanciaId: `${c.id}-${index}`
      }));
      const barajadas = duplicadas.sort(() => Math.random() - 0.5);
      setCartasBarajadas(barajadas);
      setEmparejadas([]);
      setSeleccionadas([]);
    }
  }, [cartas]);

  const handleCardClick = (carta) => {
    if (bloquearTablero || seleccionadas.some((s) => s.instanciaId === carta.instanciaId)) return;

    sounds.flip();
    const nuevasSeleccionadas = [...seleccionadas, carta];
    setSeleccionadas(nuevasSeleccionadas);

    if (nuevasSeleccionadas.length === 2) {
      registrarMovimiento();
      setBloquearTablero(true);
      const [primera, segunda] = nuevasSeleccionadas;

      if (primera.id === segunda.id) {
        sounds.match();
        setEmparejadas((prev) => {
          const actualizadas = [...prev, primera.id];
          if (actualizadas.length === cartas.length) {
            sounds.victory();
            setTimeout(() => onJuegoCompletado(), 500);
          }
          return actualizadas;
        });
        setSeleccionadas([]);
        setBloquearTablero(false);
      } else {
        sounds.mismatch();
        setTimeout(() => {
          setSeleccionadas([]);
          setBloquearTablero(false);
        }, 900);
      }
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '18px',
        maxWidth: '850px',
        margin: '0 auto',
        paddingBottom: '2rem'
      }}
    >
      {cartasBarajadas.map((carta) => (
        <Card
          key={carta.instanciaId}
          carta={carta}
          volteada={seleccionadas.some((s) => s.instanciaId === carta.instanciaId)}
          emparejada={emparejadas.includes(carta.id)}
          alHacerClick={handleCardClick}
        />
      ))}
    </div>
  );
}