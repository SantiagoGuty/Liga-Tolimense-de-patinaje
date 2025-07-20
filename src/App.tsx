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



import { createBrowserRouter, RouterProvider } from 'react-router-dom';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <ErrorPage />,   // ← now you’ve imported it

  },
  {
    path: '/noticias',
    element: <Noticias/>,
  },
  {
    path: '/noticias/:slug',
    element: <Noticia/>,
  },
  {
    path: '/Eventos',
    element: <Eventos/>
  },
  {
    path: '/Registrate',
    element: <Registrate/>
  },
  {
    path: '/IniciaSesion',
    element: <IniciaSesion/>
  },
  {
    path: '/perfil',
    element: <Perfil/>
  },
  {
    path: '/novato',
    element: <Novato/>
  },
  {
    path: '/avanzado',
    element: <Avanzado/>
  },
  {
    path: '/adultos',
    element: <Adultos/>
  },
  {
    path: '/artistico',
    element: <Artistico/>
  },
  {
    path: '/carreras',
    element: <Carreras/>
  },
  {
    path: '/guias',
    element: <Guias/>
  },
  {
    path: '/resoluciones',
    element: <Resoluciones/>
  },
  {
    path: '/usuarios',
    element: <UsersList/>
  }

])

function App() {
  return(
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
