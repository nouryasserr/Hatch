// import NotSignedIn from "../../components/NotSignedIn/NotSignedIn";

import Order from "../../components/Order/Order";
import ProductCard from "../../components/ProductCard/ProductCard";

function UserAccount() {
  return (
    <>
      {/* <NotSignedIn /> */}
      <div className="px-6 lg:px-12 my-4 sm:my-12 w-full md:w-3/4 lg:w-3/5">
        <div className="mb-4">
          <h3 className="text-3xl pb-2">
            hello, <span>ziad amr</span>
          </h3>
          <p className="text-xs text-zinc-400">
            welcome back - here's everything in one place
          </p>
        </div>
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center mb-4">
            <h4 className="text-2xl">delivery address</h4>
            <button className="flex items-center gap-2 py-2 px-4 border border-blackmuted rounded-full hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150">
              <i className="fa-solid fa-plus"></i>
              <span>Add New Address</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-location-dot bg-stone-100 py-2 px-3.5 rounded-full text-xl"></i>
            <div>
              <h5 className="text-lg">ziad's home</h5>
              <p className="text-xs text-zinc-400">
                15 a - hada2ek el ahram - giza
              </p>
            </div>
          </div>
        </div>
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
              things you loved at first scroll
            </p>
          </div>
          <ProductCard />
        </div>
        <p className="w-fit cursor-pointer text-secondary text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150">
          delete account
        </p>
      </div>
    </>
  );
}

export default UserAccount;
