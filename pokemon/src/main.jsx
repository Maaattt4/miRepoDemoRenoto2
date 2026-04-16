import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PokemonCard from './pokemoncard.jsx'
import GrupoPokemonCard from './Grupopokemoncard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GrupoPokemonCard />
  </StrictMode>,
)
