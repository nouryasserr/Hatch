import useNetworkStatus from "../../Hooks/useNetworkStatus";
import SideNav from "../SideNav/SideNav";
import { Outlet } from "react-router-dom";
import Nonetwork from "../../pages/Offline/Nonetwork";

function StartupLayout() {
  const isOnline = useNetworkStatus();
  return (
    <>
      <SideNav />
      {!isOnline ? <Nonetwork /> : <Outlet />}
    </>
  );
}

export default StartupLayout;
