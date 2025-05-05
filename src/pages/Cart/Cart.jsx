import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import CartProduct from "../../components/CartProduct/CartProduct";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

function Cart() {
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const getColumnCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) return 5;
      if (width >= 1025) return 4;
      if (width >= 769) return 3;
      if (width >= 640) return 2;
      return 1;
    };

    const updateColumnCount = () => {
      setColumnCount(getColumnCount());
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  const products = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <>
      <div className="px-6 md:pl-6 lg:pl-12 pt-2 md:pt-16 w-full md:w-3/5">
        <h3 className="text-3xl mb-2">shopping cart</h3>
        <p className="text-zinc-500 text-sm font-extralight mb-8">
          showing <span>2</span> products you added
        </p>
        <div className="py-4 pt-6 border-t border-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              name="checkbox"
              className="w-6 lg:w-8 h-6 lg:h-8 appearance-none border-2 border-black rounded checked:bg-black checked:border-black checked:after:content-['✔'] checked:after:text-white checked:after:text-lg checked:after:flex checked:after:justify-center checked:after:items-center"
            />
            <p>select all</p>
            <span className="bg-stone-300 rounded-full py-1 px-2.5">2</span>
          </div>
          <h6 className="text-red-500 text-sm underline cursor-pointer hover:no-underline">
            delete
          </h6>
        </div>
      </div>
      <div className="flex justify-between flex-col md:flex-row">
        <div className="w-full md:w-3/5">
          <CartProduct />
          <CartProduct />
        </div>
        <div className="w-full md:w-2/5 mt-16 md:mt-0">
          <OrderSummary />
        </div>
      </div>
      <div className="px-6 lg:px-12 py-16 flex justify-between">
        <h4 className="text-3xl">similar products</h4>
        <NavLink
          to="/NewArrivals"
          className={"underline hover:no-underline text-nowrap"}
        >
          view all
        </NavLink>
      </div>
      <div className="px-6 lg:px-12 pb-16 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 overflow-x-hidden md:justify-between">
          {products.slice(0, columnCount).map((_, index) => (
            <ProductCard key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Cart;
