// src/App.tsx
import Eventos from './pages/Eventos';
import Home from './pages/Home';
import Noticias from './pages/Noticias';
import Registrate from './pages/Registrate';
import IniciaSesion from './pages/IniciaSesion';
import Perfil from './pages/Perfil';
import UsersList from './pages/UsersList';
import Novato from './pages/Novato';
import Avanzado from './pages/Avanzado';
import Adultos from './pages/Adultos';
import Artistico from './pages/Artistico';
import Carreras from './pages/Carreras';
import Guias from './pages/Guias';
import Resoluciones from './pages/Resoluciones';
import ErrorPage from './pages/ErrorPage';
import Noticia from './pages/Noticia';
import ProtectedRoute from './layout/ProtectedRoute';
import CrearPerfil from './pages/CrearPerfil';
import EditarPerfil from './pages/EditarPerfil';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  // Root + error boundary (handles 404s too)
  { path: '/', element: <Home />, errorElement: <ErrorPage /> },

  // Public pages
  { path: 'noticias', element: <Noticias /> },
  { path: 'noticias/:slug', element: <Noticia /> },
  { path: 'eventos', element: <Eventos /> },
  { path: 'registrate', element: <Registrate /> },
  { path: 'iniciasesion', element: <IniciaSesion /> },
  { path: 'novato', element: <Novato /> },
  { path: 'avanzado', element: <Avanzado /> },
  { path: 'adultos', element: <Adultos /> },
  { path: 'artistico', element: <Artistico /> },
  { path: 'carreras', element: <Carreras /> },
  { path: 'guias', element: <Guias /> },
  { path: 'resoluciones', element: <Resoluciones /> },

  // Protected pages
  {
    path: 'perfil',
    element: (
      <ProtectedRoute>
        <Perfil />
      </ProtectedRoute>
    ),
  },
  {
    path: 'crear-perfil',
    element: (
      <ProtectedRoute>
        <CrearPerfil />
      </ProtectedRoute>
    ),
  },

  // (Optional) Admin-only list — wrap in your own AdminRoute if needed
  // Or at least ProtectedRoute so only signed-in users see it.
  {
    path: 'usuarios',
    element: (
      <ProtectedRoute>
        <UsersList />
      </ProtectedRoute>
    ),
  },

  { path: 'editar-perfil',
  element: (
    <ProtectedRoute>
      <EditarPerfil />
    </ProtectedRoute>
  ),
},

  // Fallback (optional if you rely on root errorElement)
  { path: '*', element: <ErrorPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
