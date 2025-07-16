import Eventos from './pages/Eventos';
import Home from './pages/Home';
import Noticias from './pages/Noticias';
import Registrate from './pages/Registrate';
import IniciaSesion from './pages/IniciaSesion';
import Perfil from './pages/Perfil';
import UsersList from './pages/UsersList';



import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/Noticias',
    element: <Noticias/>
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
