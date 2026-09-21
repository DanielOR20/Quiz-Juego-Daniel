import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

export default function HomePage() {
  const [nombreInput, setNombreInput] = useState('');
  const [dificultad, setDificultad] = useState('facil');
  const { iniciarJuego } = useGame();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nombreFinal = nombreInput.trim() || 'Jugador Anónimo';
    iniciarJuego(nombreFinal);
    // Navegación hacia la ruta con parámetro dinámico
    navigate(`/juego/${dificultad}`);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '3rem auto', padding: '2rem', background: '#1e293b', color: '#fff', borderRadius: '12px', textAlign: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.3)' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎮 Memory Match</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Pon a prueba tu memoria, completa los pares y guarda tu récord.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nombre del Jugador:</label>
          <input
            type="text"
            placeholder="Ej: Daniel"
            value={nombreInput}
            onChange={(e) => setNombreInput(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Selecciona Dificultad:</label>
          <select
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#fff', fontSize: '1rem' }}
          >
            <option value="facil">Fácil (4 parejas - 8 cartas)</option>
            <option value="medio">Medio (6 parejas - 12 cartas)</option>
            <option value="dificil">Difícil (8 parejas - 16 cartas)</option>
          </select>
        </div>

        <button
          type="submit"
          style={{ marginTop: '1rem', padding: '0.85rem', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
        >
          ¡Comenzar Partida!
        </button>
      </form>
    </div>
  );
}