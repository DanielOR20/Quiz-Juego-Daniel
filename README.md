# 🏍️ Motocross Memory Match - Videojuego Frontend

Proyecto desarrollado para el **Quiz #5: Videojuego con React + Consumo de Datos**. Consiste en un juego interactivo de memoria con temática de Motocross / Enduro que consume datos de APIs externas, persiste información localmente y se integra con un flujo automatizado en **n8n**.

---

## 🛠️ Tecnologías Utilizadas
- **React 18 / Vite**: Base del frontend con alto rendimiento.
- **React Router DOM**: Sistema de enrutamiento con rutas estáticas y dinámicas.
- **Context API (`useGame`)**: Gestión del estado global (cronómetro, movimientos, estado de la partida y jugador).
- **Web Audio API**: Efectos de sonido sintetizados nativos para volteo, acierto, error y victoria.
- **JSON Server**: Servidor REST simulado para persistencia en `db.json`.
- **Wikimedia Commons API**: Consumo de imágenes reales de motocross mediante peticiones GET dinámicas.
- **n8n**: Automatización de análisis de métricas de partida mediante Webhooks y nodos condicionales.

---

## 📋 Cumplimiento de Requisitos Técnicos

### 1. Componentes Reutilizables (4+)
- `Navbar.jsx`: Navegación principal con enlaces activos.
- `ScoreBoard.jsx`: Panel de estadísticas del jugador, nivel y cronómetro.
- `Card.jsx`: Carta individual con efecto 3D flip y soporte de imágenes dinámicas.
- `Board.jsx`: Tablero interactivo con lógica de emparejamiento, bloqueo y distribución en cuadrícula.

### 2. Estados y Hooks
- `useState`: Manejo de cartas barajadas, cartas seleccionadas, pares resueltos y filtros.
- `useEffect`: Control del temporizador por segundo y consumo inicial de datos.
- `useContext` (`GameContext`): Estado global compartido que evita prop drilling innecesario.
- Respeto estricto a la inmutabilidad de los estados.

### 3. Rutas (React Router)
- `/`: Pantalla principal con formulario de inicio y selección de nivel.
- `/juego/:dificultad`: **Ruta con parámetro dinámico** que ajusta la cantidad de pares según la dificultad (`facil`, `medio`, `dificil`).
- `/puntajes`: Tabla de clasificación y mejores puntajes.

### 4. Consumo de Datos (GET, POST, DELETE)
- **GET (Lectura externa):** Petición hacia la API pública de Wikimedia Commons para obtener imágenes de motocross.
- **GET (Lectura local):** Obtención de mejores marcas desde `http://localhost:4000/puntajes`.
- **POST (Escritura):** Registro del resultado de cada partida al ganar en `db.json`.
- **DELETE (Eliminación):** Opción interactiva para vaciar el historial de puntajes en la base de datos.

### 5. Flujo de n8n
- **Trigger:** Webhook de entrada que recibe el payload de la partida completada.
- **Transformación:** Nodo de extracción y formateo de datos.
- **Condición (IF):** Evaluación del rendimiento según la cantidad de movimientos.
- **Acción final:** Respuesta con clasificación de rango dinámico ("Rango Maestro" vs "Sigue entrenando").
- **Archivos entregados:** `workflow.json` y `n8n-workflow.png`.

---

## 🔗 Datos de n8n
- **URL del Webhook:** `http://localhost:5678/webhook/partida-terminada`
- **Método HTTP:** `POST`
- **Archivo exportado:** `workflow.json`
- **Captura del workflow:** `n8n-workflow.png`

---

## 🚀 Instrucciones para Ejecutar el Proyecto

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone [https://github.com/DanielOR20/Quiz-Juego-Daniel.git](https://github.com/DanielOR20/Quiz-Juego-Daniel.git)
cd Quiz-Juego-Daniel
npm install