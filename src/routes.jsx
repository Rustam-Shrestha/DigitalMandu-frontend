import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;