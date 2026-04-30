import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Details from './pages/Details';
import Filter from './pages/Filter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🚪 Ruta Pública */}
        <Route path="/login" element={<Login />} />

        {/* 🔒 Rutas Protegidas */}
        <Route path="/home" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        } />
        <Route path="/detalles" element={
          <ProtectedRoute><Details /></ProtectedRoute>
        } />
        <Route path="/filtrar" element={
          <ProtectedRoute><Filter /></ProtectedRoute>
        } />

        {/* 🔄 Redirección por defecto: si la ruta no existe, al Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;