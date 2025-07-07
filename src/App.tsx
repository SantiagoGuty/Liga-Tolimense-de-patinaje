import Eventos from './pages/Eventos';
import Home from './pages/Home';
import Noticias from './pages/Noticias';


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
