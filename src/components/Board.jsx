import { useState, useEffect } from 'react';
import Card from './Card';
import { useGame } from '../context/GameContext';

export default function Board({ cartas, onJuegoCompletado }) {
  const { registrarMovimiento } = useGame();
  const [cartasBarajadas, setCartasBarajadas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [emparejadas, setEmparejadas] = useState([]);
  const [bloquearTablero, setBloquearTablero] = useState(false);

  // Inicializar y mezclar las parejas al recibir las cartas
  useEffect(() => {
    if (cartas && cartas.length > 0) {
      const duplicadas = [...cartas, ...cartas].map((c, index) => ({
        ...c,
        instanciaId: `${c.id}-${index}`
      }));
      // Mezclar aleatoriamente
      const barajadas = duplicadas.sort(() => Math.random() - 0.5);
      setCartasBarajadas(barajadas);
      setEmparejadas([]);
      setSeleccionadas([]);
    }
  }, [cartas]);

  // Manejo de la lógica al seleccionar cartas
  const handleCardClick = (carta) => {
    if (bloquearTablero || seleccionadas.some((s) => s.instanciaId === carta.instanciaId)) return;

    const nuevasSeleccionadas = [...seleccionadas, carta];
    setSeleccionadas(nuevasSeleccionadas);

    if (nuevasSeleccionadas.length === 2) {
      registrarMovimiento();
      setBloquearTablero(true);
      const [primera, segunda] = nuevasSeleccionadas;

      if (primera.id === segunda.id) {
        setEmparejadas((prev) => {
          const actualizadas = [...prev, primera.id];
          if (actualizadas.length === cartas.length) {
            setTimeout(() => onJuegoCompletado(), 500);
          }
          return actualizadas;
        });
        setSeleccionadas([]);
        setBloquearTablero(false);
      } else {
        setTimeout(() => {
          setSeleccionadas([]);
          setBloquearTablero(false);
        }, 1000);
      }
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
      gap: '12px',
      maxWidth: '650px',
      margin: '0 auto'
    }}>
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