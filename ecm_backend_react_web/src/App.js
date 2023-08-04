import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../src/page/home/HomePage";
import CustomerPage from "../src/page/customer/CustomerPage";
import CategoryPage from "../src/page/category/CategoryPage";
import LayoutOne from "./component/layout/LayoutOne";
import LayoutMain from "./component/layout/LayoutMain";
import LoginPage from "./page/user/LoginPage";
import PaymentMethodPage from "./page/payment-method/PaymentMethodPage";
import OrderStatusPage from "./page/order-status/OrderStatus";
import ProductPage from "./page/product/ProductPage";
import CartPage from "./page/cart/CartPage";
import OrderPage from "./page/order/OrderPage";
import AddressPage from "./page/address/AddressPage";

function App() {
  // const isLogin = false // before reqquest data from database match with user login
  const isLogin = localStorage.getItem("isLogin") == "1" ? true : false;
  return (
    <BrowserRouter>
      {
        <LayoutMain>
          {/* {isLogin && <LayoutMain> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/payment-method" element={<PaymentMethodPage />} />
            <Route path="/order-status" element={<OrderStatusPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="*" element={<h2>Route not Found</h2>} />
          </Routes>
        </LayoutMain>
      }

      {
        !isLogin && (
          // <LayoutOne>
          <Routes>
            <Route path="*" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        )
        // </LayoutOne>
      }
    </BrowserRouter>
  );
}

export default App;
