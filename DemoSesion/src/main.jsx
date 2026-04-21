import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppCoockie from './cookiesSesion/AppCoockie.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppCoockie />
  </StrictMode>,
)
