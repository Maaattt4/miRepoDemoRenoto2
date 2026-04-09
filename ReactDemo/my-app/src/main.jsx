import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Card from '../src/componentes/Card.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Card 
    imagen={0} 
    nombre="Chango comiendo"
    pais="Brasil"
    texto="Este chango esta comiendo"
  />
  <Card 
    imagen={1} 
    nombre="Chango feliz"
    pais="México"
    texto="Este chango está enojado"
  />
  
  <Card 
    imagen={2} 
    nombre="Chango feliz"
    pais="México"
    texto="Este chango está sacando la lengua"
  />

  </StrictMode>,
)

