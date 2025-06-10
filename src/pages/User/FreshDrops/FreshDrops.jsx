import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import Products from "../../../components/Products/Products";

function FreshDrops() {
  const [productsData, setProductsData] = useState([]);
  const [freshProducts, setFreshProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getProducts() {
    try {
      setLoading(true);
      setError(null);
      const options = {
        url: "http://127.0.0.1:8000/api/general/new_arrivals",
        method: "GET",
      };
      const { data } = await axios.request(options);
      if (data.success && Array.isArray(data.data)) {
        setProductsData(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(
        err.message || "Failed to fetch products. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    try {
      if (!Array.isArray(productsData)) return;

      const now = new Date();
      const daysAgo15 = new Date(now.setDate(now.getDate() - 15));
      const filtered = productsData.filter((product) => {
        const createdDate = new Date(product.created_at);
        return createdDate >= daysAgo15;
      });

      setFreshProducts(filtered);
    } catch (err) {
      console.error("Error filtering products:", err);
      setError("Failed to process products data");
    }
  }, [productsData]);

  if (error) {
    return (
      <div className="px-6 lg:px-12 my-2 sm:my-6">
        <div className="text-secondary p-4 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="px-6 lg:px-12 my-2 sm:my-6">
        <h3 className="text-2xl md:text-4xl mb-2">Fresh Drops</h3>
        <div>
          {loading ? (
            <Loader />
          ) : (
            `${freshProducts.length} product${
              freshProducts.length !== 1 ? "s" : ""
            }`
          )}
        </div>
        <div className="flex gap-2 mt-4 flex-col md:flex-row">
          <div className="flex gap-2 items-center border border-blackmuted px-4 py-2 grow">
            <i className="fa-solid fa-magnifying-glass text-slate-800"></i>
            <input
              type="text"
              name="search"
              placeholder="search product"
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
          {loading ? (
            <Loader />
          ) : freshProducts.length > 0 ? (
            <Products productsData={freshProducts} />
          ) : (
            <div className="text-center text-lightblack">
              No fresh products found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FreshDrops;
