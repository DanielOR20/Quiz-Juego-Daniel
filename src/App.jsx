import { BrowserRouter } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }}>
          <Navbar />
          <main>
            <AppRoutes />
          </main>
        </div>
      </GameProvider>
    </BrowserRouter>
  );
}