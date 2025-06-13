import { useContext, useEffect, useState } from "react";
import NotSignedIn from "../../../components/NotSignedIn/NotSignedIn";
import DeliveryAddress from "../../../components/DeliveryAddress/DeliveryAddress";
import Order from "../../../components/Order/Order";
import { UserContext } from "../../../context/User.context";
import { UserProfileContext } from "../../../context/UserProfile.context";
import { NavLink } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

function UserAccount() {
  const { token, handleLogout } = useContext(UserContext);
  const { userProfile, getUserProfile, deleteAccount } =
    useContext(UserProfileContext);
  const [showAllOrders, setShowAllOrders] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchProfile() {
      if (token && mounted) {
        await getUserProfile();
      }
    }

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, [token, getUserProfile]);

  const renderStartupLink = () => {
    if (!userProfile.startup) {
      return (
        <NavLink
          to="/Auth/Registeration"
          className="w-fit cursor-pointer text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
        >
          join as a startup
        </NavLink>
      );
    }

    if (userProfile.startup.status === "HOLD") {
      return (
        <NavLink
          to={"/User/Payment"}
          className="w-fit cursor-pointer text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
        >
          complete startup payment
        </NavLink>
      );
    }

    if (userProfile.startup.status === "APPROVED") {
      return (
        <NavLink
          to="/Startup/Login"
          className="w-fit cursor-pointer text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
        >
          go to startup dashboard
        </NavLink>
      );
    }

    return null;
  };

  if (!token) {
    return <NotSignedIn />;
  }

  if (!userProfile) {
    return <Loader />;
  }

  const sortedOrders = [...userProfile.orders].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  const displayedOrders = showAllOrders
    ? sortedOrders
    : sortedOrders.slice(0, 2);

  return (
    <div className="px-6 lg:px-12 my-4 w-full md:w-3/4 lg:w-3/5">
      <div className="mb-4">
        <h3 className="text-3xl pb-2">
          hello, <span>{userProfile.name}</span>
        </h3>
        <p className="text-xs text-lightblack">
          welcome back - here's everything in one place
        </p>
      </div>
      <DeliveryAddress addresses={userProfile.address} />
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="text-2xl">your orders</h4>
            <p className="text-sm text-lightblack">
              track recorder or just relive your best finds
            </p>
          </div>
          {sortedOrders.length > 2 && (
            <button
              onClick={() => setShowAllOrders(!showAllOrders)}
              className="text-nowrap underline hover:no-underline cursor-pointer font-medium transition duration-300 ease-in-out delay-150"
            >
              {showAllOrders ? "show less" : "view all"}
            </button>
          )}
        </div>
        {displayedOrders.length > 0 ? (
          <div className="space-y-6">
            {displayedOrders.map((order, index) => (
              <Order key={order.id} orderInfo={order} orderNumber={index + 1} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border rounded-lg">
            <p className="text-lightblack mb-2">No orders yet</p>
            <NavLink
              to="/"
              className="text-sm underline hover:no-underline text-black"
            >
              Start shopping
            </NavLink>
          </div>
        )}
      </div>
      <div className="flex gap-4 items-center flex-wrap mt-8">
        {renderStartupLink()}
        <button
          onClick={handleLogout}
          className="w-fit cursor-pointer text-secondary text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
        >
          log out
        </button>
        <button
          onClick={deleteAccount}
          className="w-fit cursor-pointer text-secondary text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
        >
          delete account
        </button>
      </div>
    </div>
  );
}

export default UserAccount;
