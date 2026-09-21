const API_URL = 'http://localhost:4000';
const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/partida-terminada';

// Consumo directo de la API pública de Wikimedia Commons (sin API Key)
export const getCartas = async () => {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=motocross+jump+action&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=500&format=json&origin=*';
  
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al conectar con la API de imágenes');
  const data = await res.json();
  
  if (!data.query || !data.query.pages) {
    throw new Error('No se encontraron imágenes en la API');
  }

  // Mapear solo los archivos que sean imágenes válidas (jpg/png)
  const paginas = Object.values(data.query.pages);
  const cartasMotos = paginas
    .filter(p => p.imageinfo && p.imageinfo[0] && p.imageinfo[0].thumburl && !p.imageinfo[0].thumburl.endsWith('.svg'))
    .slice(0, 8)
    .map((p, index) => ({
      id: index + 1,
      nombre: p.title.replace('File:', '').replace(/\.[^/.]+$/, ''),
      imagen: p.imageinfo[0].thumburl
    }));

  return cartasMotos;
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

export const eliminarPuntajes = async (ids) => {
  await Promise.all(
    ids.map((id) =>
      fetch(`${API_URL}/puntajes/${id}`, { method: 'DELETE' })
    )
  );
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
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.warn('Error n8n:', error);
    return null;
  }
};