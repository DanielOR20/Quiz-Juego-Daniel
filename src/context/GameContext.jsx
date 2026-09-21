import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [jugador, setJugador] = useState('Jugador 1');
  const [movimientos, setMovimientos] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [partidaGanada, setPartidaGanada] = useState(false);

  // Temporizador activo mientras se esté jugando
  useEffect(() => {
    let intervalo = null;
    if (juegoActivo && !partidaGanada) {
      intervalo = setInterval(() => {
        setTiempo((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [juegoActivo, partidaGanada]);

  const iniciarJuego = (nombre) => {
    if (nombre) setJugador(nombre);
    setMovimientos(0);
    setTiempo(0);
    setPartidaGanada(false);
    setJuegoActivo(true);
  };

  const registrarMovimiento = () => {
    setMovimientos((prev) => prev + 1);
  };

  const finalizarJuego = () => {
    setPartidaGanada(true);
    setJuegoActivo(false);
  };

  const reiniciarJuego = () => {
    setMovimientos(0);
    setTiempo(0);
    setPartidaGanada(false);
    setJuegoActivo(false);
  };

  return (
    <GameContext.Provider
      value={{
        jugador,
        setJugador,
        movimientos,
        tiempo,
        juegoActivo,
        partidaGanada,
        iniciarJuego,
        registrarMovimiento,
        finalizarJuego,
        reiniciarJuego
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame debe ser usado dentro de GameProvider');
  return context;
};