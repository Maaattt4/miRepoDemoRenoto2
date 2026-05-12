import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {
  const [mensaje, setMensaje] = useState("");
  const [mensajesRecibidos, setMensajesRecibidos] = useState([]);

  const enviarMensaje = () => {
    if (mensaje.trim() !== "") {
      socket.emit("enviar_mensaje", { texto: mensaje });
      setMensaje("");
    }
  };

  useEffect(() => {
    socket.on("recibir_mensaje", (data) => {
      setMensajesRecibidos((prev) => [...prev, data.texto]);
    });

    return () => socket.off("recibir_mensaje");
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h2>Chat Fase 1 💬</h2>
      <input 
        placeholder="Escribe un mensaje..." 
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)} 
        onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
      />
      <button onClick={enviarMensaje}>Enviar</button>

      <h3>Mensajes:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {mensajesRecibidos.map((msg, index) => (
          <li key={index} style={{ background: '#f4f4f4', margin: '5px auto', padding: '10px', width: 'fit-content', borderRadius: '5px' }}>
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;