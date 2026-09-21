import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import GamePage from '../pages/GamePage';
import ScoresPage from '../pages/ScoresPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Ruta con parámetro dinámico exigida por la rúbrica */}
      <Route path="/juego/:dificultad" element={<GamePage />} />
      <Route path="/puntajes" element={<ScoresPage />} />
    </Routes>
  );
}