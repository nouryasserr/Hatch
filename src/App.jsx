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
import WishlistProvider from "./context/Wishlist.provider";
import UserProfileProvider from "./context/UserProfile.provider";
import AddProduct2 from "./pages/Startup/AddProduct2/AddProduct2";
import ProductDetail from "./pages/Startup/ProductDetail/ProductDetail";
import Orders from "./pages/Startup/Orders/Orders";
import OrderDetails from "./pages/Startup/OrderDetails/OrderDetails";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import StartupProvider from "./context/Startup.provider";
import FactoryProvider from "./context/Factory.provider";
import AdminProvider from "./context/Admin.provider";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Main from "./pages/Factory/Main/Main";
import FactoryLogin from "./pages/Factory/FactoryLogin/FactoryLogin";
import OutletWrapper from "./components/Layout/OutletWrapper";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/User" replace /> },
    { path: "*", element: <Error404 /> },
    {
      path: "/Auth",
      element: (
        <UserProvider>
          <CartProvider>
            <Layout />
          </CartProvider>
        </UserProvider>
      ),
      children: [
        { path: "Registeration", element: <Registeration /> },
        { path: "Signin", element: <Signin /> },
        { path: "Signup", element: <Signup /> },
      ],
    },
    {
      path: "/Startup",
      element: (
        <StartupProvider>
          <OutletWrapper />
        </StartupProvider>
      ),
      children: [
        {
          path: "Login",
          element: (
            <GuestRoute>
              <Login />
            </GuestRoute>
          ),
        },
        {
          element: (
            <ProtectedRoute>
              <StartupLayout />
            </ProtectedRoute>
          ),
          children: [
            { path: "AddProduct", element: <AddProduct /> },
            { path: "AddProduct2", element: <AddProduct2 /> },
            { path: "OrderDetails", element: <OrderDetails /> },
            { path: "Orders", element: <Orders /> },
            { path: "Overview", element: <Overview /> },
            { path: "ProductDetail", element: <ProductDetail /> },
            { path: "Products", element: <Products /> },
          ],
        },
      ],
    },
    {
      path: "/Factory",
      element: (
        <FactoryProvider>
          <GuestRoute></GuestRoute>
        </FactoryProvider>
      ),
      children: [{ path: "FactoryLogin", element: <FactoryLogin /> }],
    },
    {
      path: "/Factory",
      element: (
        <FactoryProvider>
          <ProtectedRoute>
            <StartupLayout />
          </ProtectedRoute>
        </FactoryProvider>
      ),
      children: [{ path: "Main", element: <Main /> }],
    },
    {
      path: "/Admin",
      element: (
        <AdminProvider>
          <ProtectedRoute>
            <StartupLayout />
          </ProtectedRoute>
        </AdminProvider>
      ),
      children: [{ path: "Dashboard", element: <Dashboard /> }],
    },
    {
      path: "/User",
      element: (
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <UserProfileProvider>
                <Layout />
              </UserProfileProvider>
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "About", element: <About /> },
        { path: "BestSales", element: <BestSales /> },
        { path: "Cart", element: <Cart /> },
        { path: "Categories", element: <Categories /> },
        { path: "Checkout", element: <Checkout /> },
        { path: "Contact", element: <Contact /> },
        { path: "FreshDrops", element: <FreshDrops /> },
        { path: "ProductDetails/:id", element: <ProductDetails /> },
        { path: "Sale", element: <Sale /> },
        { path: "UserAccount", element: <UserAccount /> },
        { path: "Wishlist", element: <Wishlist /> },
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
