import NotSignedIn from "../../../components/NotSignedIn/NotSignedIn";
import { useContext } from "react";
import DeliveryAddress from "../../../components/DeliveryAddress/DeliveryAddress";
import Order from "../../../components/Order/Order";
import { UserContext } from "../../../context/User.context";

function UserAccount() {
  const { token, handleLogout } = useContext(UserContext);

  if (!token) {
    return <NotSignedIn />;
  }
  return (
    <>
      <div className="px-6 lg:px-12 my-4 sm:my-12 w-full md:w-3/4 lg:w-3/5">
        <div className="mb-4">
          <h3 className="text-3xl pb-2">
            hello, <span>ziad amr</span>
          </h3>
          <p className="text-xs text-zinc-400">
            welcome back - here's everything in one place
          </p>
        </div>
        <DeliveryAddress />
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
          <Order />
          <Order />
        </div>
        <div className="mb-12">
          <div className="mb-4">
            <h4 className="text-2xl">your wishlist</h4>
            <p className="text-sm text-zinc-400">
              things you loved at your first scroll
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <p
            onClick={handleLogout}
            className="w-fit cursor-pointer text-secondary text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
          >
            log out
          </p>
          <p className="w-fit cursor-pointer text-secondary text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150">
            delete account
          </p>
        </div>
      </div>
    </>
  );
}

export default UserAccount;
