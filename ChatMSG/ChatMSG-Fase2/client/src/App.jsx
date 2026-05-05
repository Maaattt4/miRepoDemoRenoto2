import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

axios.defaults.withCredentials = true; // Crucial para las cookies

function App() {
  const [socket, setSocket] = useState(null);
  const [nickname, setNickname] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  // Al cargar, verificar si ya tenemos cookie
  useEffect(() => {
    axios.get('http://localhost:3001/api/me')
      .then(res => {
        setNickname(res.data.nickname);
        setIsLoggedIn(true);
      })
      .catch(() => {});
  }, []);

  // Conectar socket solo tras login
  useEffect(() => {
    if (isLoggedIn) {
      const newSocket = io("http://localhost:3001", { withCredentials: true });
      
      axios.get('http://localhost:3001/api/messages').then(res => setMessages(res.data));

      newSocket.on('chat:message', (msg) => {
        setMessages(prev => [...prev, msg]);
      });

      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/session', { nickname });
      setIsLoggedIn(true);
    } catch (err) { alert("Error al entrar"); }
  };

  const send = (e) => {
    e.preventDefault();
    if (socket && inputValue) {
      socket.emit('chat:send', inputValue);
      setInputValue("");
    }
  };

  if (!isLoggedIn) return (
    <form onSubmit={handleLogin} style={{padding: '50px'}}>
      <input placeholder="Nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
      <button>Entrar</button>
    </form>
  );

  return (
    <div style={{padding: '20px'}}>
      <h2>Chat Distribuido 🌐</h2>
      <div style={{height: '300px', overflowY: 'scroll', border: '1px solid #ccc'}}>
        {messages.map(m => (
          <p key={m.id}><b>{m.nickname}</b>: {m.text} <small>({m.serverId})</small></p>
        ))}
      </div>
      <form onSubmit={send}>
        <input value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <button>Enviar</button>
      </form>
    </div>
  );
}
export default App;