import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './Home';
import Menu from './Menu';
import DishDetail from './DishDetail';
import Cart from './Cart';
import Checkout from './Checkout';
import Orders from './Orders';
import Header from './Header';
import Favorites from './favorites';
import AdminLogin from './AdminLogin';
import Admin from './Admin';
import AdminMenu from './AdminMenu';
import AdminOrders from './AdminOrders';
import Footer from './footer';


function AppContent() {

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("addis-eats-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    localStorage.setItem("addis-eats-cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className={theme + "-theme"}>

      {!isAdminPage && (
        <Header
          cart={cart}
          theme={theme}
          setTheme={setTheme}
        />
      )}

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/menu"
          element={
            <Menu
              cart={cart}
              setCart={setCart}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />

        <Route
          path="/menu/:id"
          element={<DishDetail cart={cart} setCart={setCart} />}
        />

        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />}
        />

        <Route
          path="/checkout"
          element={<Checkout cart={cart} />}
        />

        <Route path="/orders" element={<Orders />} />

        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} />}
        />

        <Route path="/login" element={<AdminLogin />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/admin/menu" element={<AdminMenu />} />

        <Route path="/admin/orders" element={<AdminOrders />} />

      </Routes>

      <Footer />

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


export default App;