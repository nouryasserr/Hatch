import { NavLink } from "react-router-dom";
import StartupProduct from "../../../components/StartupProduct/StartupProduct";
function Products() {
  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="mb-4 flex flex-col xs:flex-row justify-between xs:items-center">
          <div className="mb-4 xs:mb-0">
            <h2 className="text-3xl mb-0.5">products</h2>
            <p
              className={
                "text-lightblack text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
              }
            >
              avaliable for sale 8 products
            </p>
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
          <StartupProduct />
          <StartupProduct />
          <StartupProduct />
          <StartupProduct />
        </div>
      </div>
    </>
  );
}

export default Products;
