import SideBar from "../SideBar/SideBar";
import useNetworkStatus from "../../Hooks/useNetworkStatus";
import Nonetwork from "../../pages/Offline/Nonetwork";
import { Outlet } from "react-router-dom";

function FactoryLayout() {
  const isOnline = useNetworkStatus();
  return (
    <>
      <SideBar />
      {!isOnline ? <Nonetwork /> : <Outlet />}
    </>
  );
}

export default FactoryLayout;
