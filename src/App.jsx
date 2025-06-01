import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./assets/fonts/fonts.css";
import About from "./pages/User/About/About";
import BestSales from "./pages/User/BestSales/BestSales";
import Cart from "./pages/User/Cart/Cart";
import Categories from "./pages/User/Categories/Categories";
import Checkout from "./pages/User/Checkout/Checkout";
import Contact from "./pages/User/Contact/Contact";
import FreshDrops from "./pages/User/FreshDrops/FreshDrops";
import Home from "./pages/User/Home/Home";
import ProductDetails from "./pages/User/ProductDetails/ProductDetails";
import Signin from "./pages/Auth/Signin/Signin";
import Signup from "./pages/Auth/Signup/Signup";
import UserAccount from "./pages/User/UserAccount/UserAccount";
import Wishlist from "./pages/User/Wishlist/Wishlist";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import Error404 from "./pages/Error404/Error404";
import Sale from "./pages/User/Sale/Sale";
import UserProvider from "./context/User.provider";
import Registeration from "./pages/Auth/Registeration/Registeration";
import Login from "./pages/Startup/Login/Login";
import Overview from "./pages/Startup/Overview/Overview";
import StartupLayout from "./components/Layout/StartupLayout";
import Products from "./pages/Startup/Products/Products";
import AddProduct from "./pages/Startup/AddProduct/AddProduct";
import CartProvider from "./context/Cart.provider";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/User" replace /> },
    { path: "*", element: <Error404 /> },
    {
      path: "/Auth",
      element: <Layout />,
      children: [
        { path: "Registeration", element: <Registeration /> },
        { path: "Signin", element: <Signin /> },
        { path: "Signup", element: <Signup /> },
      ],
    },
    {
      path: "/User",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "About", element: <About /> },
        { path: "BestSales", element: <BestSales /> },
        { path: "Cart", element: <Cart /> },
        { path: "Categories", element: <Categories /> },
        { path: "Checkout", element: <Checkout /> },
        { path: "Contact", element: <Contact /> },
        { path: "FreshDrops", element: <FreshDrops /> },
        { path: "ProductDetails", element: <ProductDetails /> },
        { path: "Sale", element: <Sale /> },
        { path: "UserAccount", element: <UserAccount /> },
        { path: "Wishlist", element: <Wishlist /> },
      ],
    },
    {
      path: "/Startup",
      element: <StartupLayout />,
      children: [
        { path: "AddProduct", element: <AddProduct /> },
        { path: "Login", element: <Login /> },
        { path: "Overview", element: <Overview /> },
        { path: "Products", element: <Products /> },
      ],
    },
  ]);

  return (
    <>
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </UserProvider>
      <Toaster />
    </>
  );
}

export default App;
