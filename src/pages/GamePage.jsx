import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { getCartas, guardarPuntaje, notificarN8N } from '../services/gameService';
import ScoreBoard from '../components/ScoreBoard';
import Board from '../components/Board';

export default function GamePage() {
  const { dificultad } = useParams(); // Parámetro dinámico
  const navigate = useNavigate();
  const { jugador, movimientos, tiempo, partidaGanada, finalizarJuego, reiniciarJuego } = useGame();

  const [cartasNivel, setCartasNivel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [mensajeN8N, setMensajeN8N] = useState('');

  // Carga inicial de datos mediante GET
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCartas();

        // Filtrar cantidad de parejas según dificultad
        let cantidadParejas = 4;
        if (dificultad === 'medio') cantidadParejas = 6;
        if (dificultad === 'dificil') cantidadParejas = 8;

        setCartasNivel(data.slice(0, cantidadParejas));
      } catch (err) {
        setError(err.message || 'No se pudieron cargar las cartas.');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [dificultad]);

  // Al ganar el juego: POST a json-server y llamada a n8n
  const handleVictoria = async () => {
    finalizarJuego();
    setGuardando(true);

    const record = {
      jugador,
      dificultad,
      movimientos: movimientos + 1, // suma el último movimiento completado
      tiempoSegundos: tiempo,
      fecha: new Date().toISOString().split('T')[0]
    };

    try {
      // 1. Guardar en json-server (POST)
      await guardarPuntaje(record);

      // 2. Disparar Webhook de n8n
      const respN8N = await notificarN8N(record);
      if (respN8N && respN8N.mensaje) {
        setMensajeN8N(respN8N.mensaje);
      }
    } catch (err) {
      console.error('Error al guardar datos de la partida:', err);
    } finally {
      setGuardando(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem', color: '#38bdf8', fontSize: '1.25rem' }}>
        ⏳ Cargando tablero y cartas...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: '500px', margin: '3rem auto', padding: '1.5rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', textAlign: 'center' }}>
        <h3>Error al conectar con la base de datos</h3>
        <p>{error}</p>
        <p style={{ fontSize: '0.9rem', color: '#7f1d1d' }}>Asegúrate de tener corriendo json-server en el puerto 4000 (`npm run server`).</p>
        <button onClick={() => window.location.reload()} style={{ padding: '0.5rem 1rem', background: '#b91c1c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '750px', margin: '2rem auto', padding: '0 1rem' }}>
      <ScoreBoard dificultad={dificultad} onReiniciar={reiniciarJuego} />

      <Board cartas={cartasNivel} onJuegoCompletado={handleVictoria} />

      {/* Modal / Banner de Fin de Partida */}
      {partidaGanada && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#065f46',
          color: '#ecfdf5',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          <h2>🎉 ¡Felicidades, {jugador}! Has completado el juego</h2>
          <p>Tiempo: <strong>{tiempo}s</strong> | Movimientos: <strong>{movimientos}</strong></p>
          {guardando && <p style={{ fontStyle: 'italic' }}>Guardando puntaje y notificando automatización...</p>}
          {mensajeN8N && <p style={{ background: '#047857', padding: '0.5rem', borderRadius: '6px' }}>🤖 n8n: {mensajeN8N}</p>}

          <div style={{ marginTop: '1.2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/puntajes')}
              style={{ padding: '0.6rem 1.2rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Ver Tabla de Puntajes
            </button>
            <button
              onClick={() => navigate('/')}
              style={{ padding: '0.6rem 1.2rem', background: '#334155', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Nuevo Juego
            </button>
          </div>
        </div>
      )}
    </div>
  );
}