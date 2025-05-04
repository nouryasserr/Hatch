import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import useNetworkStatus from "../../Hooks/useNetworkStatus";
import Nonetwork from "../../pages/Offline/Nonetwork";

function Layout() {
  const isOnline = useNetworkStatus();
  return (
    <>
      <Navbar />
      {!isOnline ? <Nonetwork /> : <Outlet />}
      <Footer />
    </>
  );
}

export default Layout;
