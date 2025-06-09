import Navigation from "../Navigation/Navigation";
import useNetworkStatus from "../../Hooks/useNetworkStatus";
import Nonetwork from "../../pages/Offline/Nonetwork";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const isOnline = useNetworkStatus();
  return (
    <>
      <Navigation />
      {!isOnline ? <Nonetwork /> : <Outlet />}
    </>
  );
}

export default AdminLayout;
