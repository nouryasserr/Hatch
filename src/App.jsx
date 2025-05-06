import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/fonts/fonts.css";
import About from "./pages/About/About";
import BestSales from "./pages/BestSales/BestSales";
import Cart from "./pages/Cart/Cart";
import Categories from "./pages/Categories/Categories";
import Checkout from "./pages/Checkout/Checkout";
import Contact from "./pages/Contact/Contact";
import FreshDrops from "./pages/FreshDrops/FreshDrops";
import Home from "./pages/Home/Home";
import Otp from "./pages/Otp/Otp";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ResetPass2 from "./pages/ResetPass2/ResetPass2";
import ResetPass3 from "./pages/ResetPass3/ResetPass3";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Wishlist from "./pages/Wishlist/Wishlist";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import Error404 from "./pages/Error404/Error404";
import Sale from "./pages/Sale/Sale";
import UserAccount from "./pages/UserAccount/UserAccount";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/About", element: <About /> },
        { path: "/BestSales", element: <BestSales /> },
        { path: "/Cart", element: <Cart /> },
        { path: "/Categories", element: <Categories /> },
        { path: "/Checkout", element: <Checkout /> },
        { path: "/Contact", element: <Contact /> },
        { path: "/FreshDrops", element: <FreshDrops /> },
        { path: "/Otp", element: <Otp /> },
        { path: "/ProductDetails", element: <ProductDetails /> },
        { path: "/ResetPass2", element: <ResetPass2 /> },
        { path: "/ResetPass3", element: <ResetPass3 /> },
        { path: "/Sale", element: <Sale /> },
        { path: "/Signin", element: <Signin /> },
        { path: "/Signup", element: <Signup /> },
        { path: "/UserAccount", element: <UserAccount /> },
        { path: "/Wishlist", element: <Wishlist /> },
        { path: "*", element: <Error404 /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
