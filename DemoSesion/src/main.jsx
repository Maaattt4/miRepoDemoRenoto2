import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppCookieHttpOnly from './cookieHttOnly/AppCookieHttpOnly';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppCookieHttpOnly />
  </StrictMode>,
)
