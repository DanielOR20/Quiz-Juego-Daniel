import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPuntajes } from '../services/gameService';

export default function ScoresPage() {
  const [puntajes, setPuntajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await getPuntajes();
        // Ordenar por menos movimientos y menor tiempo
        const ordenados = data.sort((a, b) => a.movimientos - b.movimientos || a.tiempoSegundos - b.tiempoSegundos);
        setPuntajes(ordenados);
      } catch (err) {
        setError(err.message || 'Error al obtener puntajes');
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>🏆 Tabla de Mejores Puntajes</h2>
        <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>← Volver al Inicio</Link>
      </div>

      {loading && <p style={{ color: '#94a3b8' }}>Cargando puntajes...</p>}
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
            {puntajes.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8' }}>
                  Aún no hay partidas registradas. ¡Sé el primero en jugar!
                </td>
              </tr>
            ) : (
              puntajes.map((p, index) => (
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