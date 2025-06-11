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
import Factories from "./pages/Startup/Factories/Factories";
import Request from "./pages/Startup/Request/Request";
import RequestDetails from "./pages/Startup/RequestDetails/RequestDetails";
import SettingsProfile from "./pages/Startup/SettingsProfile/SettingsProfile";
import FactoryLayout from "./components/Layout/FactoryLayout";
import Deals from "./pages/Factory/Deals/deals";
import FactoryProfile from "./pages/Factory/FactoryProfile/FactoryProfile";
import FactoryResponse from "./pages/Factory/FactoryResponse/FactoryResponse";
import StartupRequests from "./pages/Factory/StartupRequests/StartupRequests";
import SendOffer from "./pages/Factory/SendOffer/SendOffer";
import AdminLayout from "./components/Layout/AdminLayout";
import AddCategory from "./pages/Admin/AddCategory/AddCategory";
import AddFactory from "./pages/Admin/AddFactory/AddFactory";
import AddSubCategory from "./pages/Admin/AddSubCategory/AddSubCategory";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import AllCategories from "./pages/Admin/AllCategories/AllCategories";
import AllFactories from "./pages/Admin/AllFactories/AllFactories";
import AllStartups from "./pages/Admin/AllStartups/AllStartups";
import AllUsers from "./pages/Admin/AllUsers/AllUsers";
import FactoryDetails from "./pages/Admin/FactoryDetails/FactoryDetails";
import ViewStartup from "./pages/Admin/ViewStartup/ViewStartup";
import ViewStartupRequest from "./pages/Admin/ViewStartupRequest/ViewStartupRequest";
import ViewUser from "./pages/Admin/ViewUser/ViewUser";
import EditCategory from "./pages/Admin/EditCategory/EditCategory";
import EditSubCategory from "./pages/Admin/EditSubCategory/EditSubCategory";
import Payment from "./pages/User/Payment/Payment";
import EditProduct from "./pages/Startup/EditProduct/EditProduct";

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
          element: (
            <ProtectedRoute>
              <StartupLayout />
            </ProtectedRoute>
          ),
          children: [
            { path: "AddProduct", element: <AddProduct /> },
            { path: "AddProduct2", element: <AddProduct2 /> },
            { path: "EditProduct/:id", element: <EditProduct /> },
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
        { path: "SendOffer/:id", element: <SendOffer /> },
        { path: "StartupRequests", element: <StartupRequests /> },
      ],
    },
    {
      path: "/Admin",
      element: (
        <AdminProvider>
          <AdminLayout />
        </AdminProvider>
      ),
      children: [
        { path: "AddCategory", element: <AddCategory /> },
        { path: "AddFactory", element: <AddFactory /> },
        { path: "AddSubCategory", element: <AddSubCategory /> },
        { path: "AdminLogin", element: <AdminLogin /> },
        { path: "AllCategories", element: <AllCategories /> },
        { path: "AllFactories", element: <AllFactories /> },
        { path: "AllStartups", element: <AllStartups /> },
        { path: "AllUsers", element: <AllUsers /> },
        { path: "Dashboard", element: <Dashboard /> },
        { path: "EditCategory/:id", element: <EditCategory /> },
        { path: "EditSubCategory/:id", element: <EditSubCategory /> },
        { path: "FactoryDetails/:id", element: <FactoryDetails /> },
        { path: "ViewStartup/:id", element: <ViewStartup /> },
        { path: "ViewStartupRequest", element: <ViewStartupRequest /> },
        { path: "ViewUser/:id", element: <ViewUser /> },
      ],
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
        { path: "Payment", element: <Payment /> },
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
