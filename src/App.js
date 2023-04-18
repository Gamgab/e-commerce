import "./App.css";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";

import Dashboard from "./components/admin/dashboard";
import Products from "./components/admin/products";
import Summary from "./components/admin/summary";
import CreateProducts from "./components/admin/createproducts";

import "react-toastify/dist/ReactToastify.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./slices/authSlice";
import CheckOutSuccess from "./components/CheckOutSuccess";
import Orders from "./components/admin/orders";
import ProductList from "./components/admin/list/productList";
import Users from "./components/admin/users";
import Order from "./components/details/Order";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);

  return (
    <div className="App">
      <HashRouter>
        <ToastContainer />
        <NavBar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-success" element={<CheckOutSuccess />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/admin" element={<Dashboard />}>
              <Route path="products" element={<Products />}>
                <Route index element={<ProductList />} />
                <Route path="create-product" element={<CreateProducts />} />
              </Route>
              <Route path="summary" element={<Summary />} />
              <Route path="orders" element={<Orders />} />
              <Route path="users" element={<Users />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
