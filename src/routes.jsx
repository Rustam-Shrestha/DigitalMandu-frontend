import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Cart from './pages/cart/Cart';


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
  {
    path: '/cart',
    element: <Cart />,
  },
]);

export default router;