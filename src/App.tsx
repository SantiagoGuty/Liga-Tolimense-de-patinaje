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

import Root from './layout/Root'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    element: <Root />,            // inject ScrollToTop for all routes
    errorElement: <ErrorPage />,  // handles 404s / thrown errors
    children: [
      { index: true, element: <Home /> },  // "/" (index under Root)

      // Public
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

      // Protected
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
      {
        path: 'usuarios',
        element: (
          <ProtectedRoute>
            <UsersList />
          </ProtectedRoute>
        ),
      },
      {
        path: 'editar-perfil',
        element: (
          <ProtectedRoute>
            <EditarPerfil />
          </ProtectedRoute>
        ),
      },

      // (optional; errorElement already handles unknown routes)
      { path: '*', element: <ErrorPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
