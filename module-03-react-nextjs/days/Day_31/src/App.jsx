
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import SignIn from "./auth/signIn";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import CartProvider from "./CartProvider";
import AuthProvider from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import Header from "./Header";
import Footer from "./Footer";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="menu/:id" element={<DishDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="checkout"element={<RequireAuth> <Checkout /></RequireAuth> }/>
          <Route path="*" element={<NotFound />} />
        <Route path="cartProvider" element={<CartProvider />} />
        <Route path="AuthProvider" element={<AuthProvider />} />
        <Route path="header" element={<Header/>} />
        <Route path="footer" element={<Footer/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}