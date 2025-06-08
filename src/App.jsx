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
import FactoryLogin from "./pages/Factory/FactoryLogin/FactoryLogin";
import OutletWrapper from "./components/Layout/OutletWrapper";
import GoogleCallback from "./pages/Auth/GoogleCallback/GoogleCallback";
import ChoosePlan from "./pages/Startup/ChoosePlan/ChoosePlan";
import Factories from "./pages/Startup/Factories/Factories";
import Request from "./pages/Startup/Request/Request";
import RequestDetails from "./pages/Startup/RequestDetails/RequestDetails";
import SettingsProfile from "./pages/Startup/SettingsProfile/SettingsProfile";
import FactoryLayout from "./components/Layout/FactoryLayout";
import Deals from "./pages/Factory/Deals/deals";
import FactoryProfile from "./pages/Factory/FactoryProfile/FactoryProfile";
import FactoryResponse from "./pages/Factory/FactoryResponse/FactoryResponse";
import StartupRequests from "./pages/Factory/StartupRequests/StartupRequests";

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
        { path: "GoogleCallback", element: <GoogleCallback /> },
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
          path: "ChoosePlan",
          element: (
            <GuestRoute>
              <ChoosePlan />
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
            { path: "Factories", element: <Factories /> },
            { path: "OrderDetails/:id", element: <OrderDetails /> },
            { path: "Orders", element: <Orders /> },
            { path: "Overview", element: <Overview /> },
            { path: "ProductDetail/:id", element: <ProductDetail /> },
            { path: "Products", element: <Products /> },
            { path: "Request", element: <Request /> },
            { path: "RequestDetails/:id", element: <RequestDetails /> },
            { path: "SettingsProfile", element: <SettingsProfile /> },
          ],
        },
      ],
    },
    {
      path: "/Factory",
      element: (
        <FactoryProvider>
          <FactoryLayout />
        </FactoryProvider>
      ),
      children: [
        { path: "Deals", element: <Deals /> },
        { path: "FactoryLogin", element: <FactoryLogin /> },
        { path: "FactoryProfile", element: <FactoryProfile /> },
        { path: "FactoryResponse", element: <FactoryResponse /> },
        { path: "StartupRequests", element: <StartupRequests /> },
      ],
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
