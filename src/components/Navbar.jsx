import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1e293b',
      color: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
        🧠 Memory Match
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            color: isActive ? '#38bdf8' : '#cbd5e1',
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          Inicio
        </NavLink>
        <NavLink 
          to="/puntajes" 
          style={({ isActive }) => ({
            color: isActive ? '#38bdf8' : '#cbd5e1',
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          Puntajes
        </NavLink>
      </div>
    </nav>
  );
}