import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import router from './routes';
import Navbar from './globals/components/navbar/Navbar';
import Footer from './globals/components/footer/Footer';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/home/home';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Cart from './pages/cart/Cart';
import ProductDetails from './pages/productDetails/productDetails';
import Checkout from './pages/checkout/Checkout';
import Demo from './pages/checkout/Demo';
import Khalti from './pages/khalti/khalti';
import KhaltiSuccess from './pages/success/KhaltiSuccess';
import MyOrders from './pages/orders/myOrders';

import MyProfile from './pages/profile/MyProfile';
function App() {
  return (
    <>
      {/* importing store and using it to pass itself as  props in store proerty key  */}
      <Provider store={store} >

        {/* <Navbar />
      <RouterProvider router={router} />
      <Footer /> */}
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/khalti" element={<Khalti />} />
            <Route path="/success" element={<KhaltiSuccess />} />
            <Route path="/myOrders" element={<MyOrders />} />
            <Route path="/myprofile" element={<MyProfile />} />
            
          </Routes>
          <Footer />
        </BrowserRouter>

      </Provider>
    </>
  );
}

export default App;
