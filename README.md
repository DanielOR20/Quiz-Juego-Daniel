# 🧠 Memory Match - Frontend Game

Videojuego interactivo de memoria desarrollado en **React** con arquitectura modular, consumo de base de datos local y automatización de resultados mediante **n8n**.

## 🚀 Tecnologías Utilizadas
- **React + Vite**
- **React Router DOM** (Navegación dinámica entre niveles y páginas)
- **React Context API** (Manejo global del estado de juego, cronómetro y movimientos)
- **JSON Server** (Persistencia local de cartas y mejores puntajes en `db.json`)
- **n8n** (Automatización backend para evaluación y clasificación de récords)

## 📋 Requisitos Cumplidos
1. **Componentes Modulares:** `Navbar`, `ScoreBoard`, `Card` y `Board` con paso de props y keys únicas.
2. **Hooks y Estado:** `useState`, `useEffect`, y `useContext` (`GameContext`) para sincronización del temporizador, movimientos y estado de victoria.
3. **Rutas:** `/` (Inicio/Selector), `/juego/:dificultad` (Ruta con parámetro dinámico) y `/puntajes` (Historial/Leaderboard).
4. **Consumo de Datos:** Petición `GET` para cargar cartas y puntajes; petición `POST` para registrar resultados en `db.json`.
5. **Workflow de n8n:** Webhook `POST`, extracción de métricas, bifurcación lógica con nodo `IF` y respuesta dinámica según desempeño del jugador.

## 🔗 URL del Webhook de n8n
- **Endpoint:** `http://localhost:5678/webhook/partida-terminada`
- **Método:** `POST`
- **Flujo exportado:** `workflow.json`
- **Captura de evidencia:** `n8n-workflow.png`

## 🛠️ Instrucciones de Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install