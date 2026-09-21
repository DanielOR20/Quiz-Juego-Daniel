import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPuntajes, eliminarPuntajes } from '../services/GameService';

export default function ScoresPage() {
  const [puntajes, setPuntajes] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargar = async () => {
    try {
      setLoading(true);
      const data = await getPuntajes();
      const ordenados = data.sort(
        (a, b) => a.movimientos - b.movimientos || a.tiempoSegundos - b.tiempoSegundos
      );
      setPuntajes(ordenados);
    } catch (err) {
      setError(err.message || 'Error al obtener puntajes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleBorrarHistorial = async () => {
    if (!window.confirm('¿Estás seguro de que deseas vaciar el historial de puntajes?')) return;
    try {
      setLoading(true);
      const ids = puntajes.map((p) => p.id);
      await eliminarPuntajes(ids);
      setPuntajes([]);
    } catch (err) {
      alert('Error al vaciar los puntajes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const puntajesFiltrados = puntajes.filter((p) => {
    if (filtro === 'todos') return true;
    return p.dificultad === filtro;
  });

  return (
    <div style={{ maxWidth: '750px', margin: '2rem auto', padding: '1rem', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2>🏆 Tabla de Mejores Puntajes</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {puntajes.length > 0 && (
            <button
              onClick={handleBorrarHistorial}
              style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.45rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Vaciar Historial
            </button>
          )}
          <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>
            ← Volver al Inicio
          </Link>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {['todos', 'facil', 'medio', 'dificil'].map((modo) => (
          <button
            key={modo}
            className={`filter-btn ${filtro === modo ? 'active' : ''}`}
            onClick={() => setFiltro(modo)}
          >
            {modo.charAt(0).toUpperCase() + modo.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p style={{ color: '#94a3b8' }}>Actualizando tabla...</p>}
      {error && <p style={{ color: '#f87171' }}>{error}</p>}

      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#1e293b', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: '#0f172a', textAlign: 'left', borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '0.75rem 1rem' }}>#</th>
              <th style={{ padding: '0.75rem 1rem' }}>Jugador</th>
              <th style={{ padding: '0.75rem 1rem' }}>Dificultad</th>
              <th style={{ padding: '0.75rem 1rem' }}>Movimientos</th>
              <th style={{ padding: '0.75rem 1rem' }}>Tiempo</th>
              <th style={{ padding: '0.75rem 1rem' }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {puntajesFiltrados.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8' }}>
                  No hay partidas registradas para este filtro.
                </td>
              </tr>
            ) : (
              puntajesFiltrados.map((p, index) => (
                <tr key={p.id || index} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 'bold' }}>{index + 1}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{p.jugador}</td>
                  <td style={{ padding: '0.75rem 1rem', textTransform: 'capitalize' }}>{p.dificultad}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{p.movimientos}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{p.tiempoSegundos}s</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#94a3b8' }}>{p.fecha}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}