import { useContext, useEffect } from "react";
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

  useEffect(() => {
    if (token) {
      getUserProfile();
    }
  }, [token, getUserProfile]);

  if (!token) {
    return <NotSignedIn />;
  }

  if (!userProfile) {
    return <Loader />;
  }

  return (
    <div className="px-6 lg:px-12 my-4 sm:my-12 w-full md:w-3/4 lg:w-3/5">
      <div className="mb-4">
        <h3 className="text-3xl pb-2">
          hello, <span>{userProfile.name}</span>
        </h3>
        <p className="text-xs text-zinc-400">
          welcome back - here's everything in one place
        </p>
      </div>
      <DeliveryAddress addresses={userProfile.address} />
      <div className="mb-6">
        <div className="flex justify-between">
          <div>
            <h4 className="text-2xl">your orders</h4>
            <p className="text-sm text-zinc-400">
              track recorder or just relive your best finds
            </p>
          </div>
          <p className="w-fit text-nowrap underline hover:no-underline cursor-pointer font-medium transition duration-300 ease-in-out delay-150">
            view all
          </p>
        </div>
        {userProfile.orders.map((order) => (
          <Order key={order.id} orderInfo={order} />
        ))}
      </div>
      <div className="flex gap-4 items-center flex-wrap">
        <NavLink
          to={"/Auth/Registeration"}
          className="w-fit cursor-pointer text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
        >
          join as a startup
        </NavLink>
        <p
          onClick={handleLogout}
          className="w-fit cursor-pointer text-secondary text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
        >
          log out
        </p>
        <p
          onClick={deleteAccount}
          className="w-fit cursor-pointer text-secondary text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
        >
          delete
        </p>
      </div>
    </div>
  );
}

export default UserAccount;
