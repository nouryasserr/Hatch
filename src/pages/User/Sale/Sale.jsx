import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import Products from "../../../components/Products/Products";

function Sale() {
  const [productsData, setProductsData] = useState(null);
  async function getProducts() {
    const options = {
      url: "http://127.0.0.1:8000/api/general/discounted",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setProductsData(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="px-6 lg:px-12 my-2 sm:my-6">
        <h3 className="text-2xl md:text-4xl mb-2 text-secondary">Sales</h3>
        <p>20 products</p>
        <div className="flex gap-2 mt-4 flex-col md:flex-row">
          <div className="flex gap-2 items-center border border-blackmuted px-4 py-2 grow">
            <i className="fa-solid fa-magnifying-glass text-slate-800"></i>
            <input
              type="text"
              name="search"
              placeholder="Search product"
              className="outline-none placeholder:text-slate-800 placeholder:font-light w-full text-sm"
            />
          </div>
          <div className="flex gap-2 justify-end md:justify-normal">
            <button className="flex items-center gap-2 text-sm font-light border border-black p-2 text-white bg-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150">
              <i className="fa-solid fa-filter"></i>
              <span>All Filter</span>
            </button>
            <button className="flex items-center gap-2 text-sm font-light border border-black p-2 hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150">
              <span>Sort By</span>
              <i className="fa-solid fa-angle-down"></i>
            </button>
          </div>
        </div>
        <div className="mt-12">
          {!productsData ? (
            <Loader />
          ) : (
            <Products productsData={productsData} />
          )}
        </div>
      </div>
    </>
  );
}

export default Sale;
