const API_URL = 'http://localhost:4000';
// Tu URL de producción de n8n:
const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/partida-terminada';

export const getCartas = async () => {
    const res = await fetch(`${API_URL}/cartas`);
    if (!res.ok) throw new Error('Error al cargar las cartas');
    return await res.json();
};

export const getPuntajes = async () => {
    const res = await fetch(`${API_URL}/puntajes`);
    if (!res.ok) throw new Error('Error al obtener puntajes');
    return await res.json();
};

export const guardarPuntaje = async (datosPartida) => {
    const res = await fetch(`${API_URL}/puntajes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosPartida)
    });
    if (!res.ok) throw new Error('Error al guardar puntaje');
    return await res.json();
};

export const notificarN8N = async (datosPartida) => {
    try {
        const res = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(datosPartida)
        });

        if (!res.ok) {
            console.error('Error HTTP en n8n:', res.status, res.statusText);
            return null;
        }

        const data = await res.json();
        console.log('Respuesta recibida de n8n:', data);
        return data;
    } catch (error) {
        console.error('Error de red/CORS al llamar a n8n:', error);
        return null;
    }
};

export const eliminarPuntajes = async (ids) => {
    await Promise.all(
        ids.map((id) =>
            fetch(`${API_URL}/puntajes/${id}`, { method: 'DELETE' })
        )
    );
};