import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UsaHook from './UsaHook.jsx'
import { UsaHookEffect } from './UsaHookEffect.jsx'
import { MuestraPokemon } from './MuestraPokemon.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MuestraPokemon />

  </StrictMode>,
)
