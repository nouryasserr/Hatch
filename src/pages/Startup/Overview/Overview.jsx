import { NavLink } from "react-router-dom";
import StartupProduct from "../../../components/StartupProduct/StartupProduct";
import StartupOrder from "../../../components/StartupOrder/StartupOrder";

function Overview() {
  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div>
          <h1 className="text-2xl xs:text-4xl">dashboard overview</h1>
          <p className="text-lightblack pt-0.5 text-sm xs:text-base">
            hello, brand name
          </p>
        </div>
        <div className="flex gap-8 md:gap-4 items-center flex-wrap mt-6">
          <div className="grow space-y-2 md:space-y-6">
            <p className="space-x-3">
              <i className="fa-solid fa-circle text-green-500 text-xs"></i>
              <span>total product sold</span>
            </p>
            <h2 className="text-3xl">21 product</h2>
          </div>
          <div className="grow space-y-2 md:space-y-6">
            <p className="space-x-3">
              <i className="fa-solid fa-circle text-green-500 text-xs"></i>
              <span>total revenues</span>
            </p>
            <h2 className="text-3xl">15.000 EGP</h2>
          </div>
          <div className="grow space-y-2 md:space-y-6">
            <p className="space-x-3">
              <i className="fa-solid fa-circle text-green-500 text-xs"></i>
              <span>total orders</span>
            </p>
            <h2 className="text-3xl">16 order</h2>
          </div>
          <div className="grow space-y-2 md:space-y-6">
            <p className="space-x-3">
              <i className="fa-solid fa-circle text-secondary text-xs"></i>
              <span>avaliable for sale</span>
            </p>
            <h2 className="text-3xl">8 products</h2>
          </div>
        </div>
        <div className="mt-8 mb-4 flex flex-col xs:flex-row justify-between xs:items-center">
          <div className="mb-4 xs:mb-0">
            <h2 className="text-3xl mb-0.5">products</h2>
            <NavLink
              className={
                "text-lightblack text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
              }
            >
              view all products
            </NavLink>
          </div>
          <NavLink
            to={"/Startup/AddProduct"}
            className={
              "self-end xs:self-auto bg-primary rounded-full py-1.5 px-6 text-white border border-primary hover:border-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
            }
          >
            add new product
          </NavLink>
        </div>
        <div className="flex gap-4 flex-wrap">
          <StartupProduct />
          <StartupProduct />
          <StartupProduct />
          <StartupProduct />
        </div>
        <div className="mb-4 mt-8 xs:mb-0">
          <h2 className="text-3xl mb-0.5">orders</h2>
          <NavLink
            className={
              "text-lightblack text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
            }
          >
            view order history
          </NavLink>
        </div>
        <StartupOrder />
        <StartupOrder />
        <StartupOrder />
      </div>
    </>
  );
}

export default Overview;
