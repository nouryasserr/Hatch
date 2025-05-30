import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import SlimilarProducts from "../../../components/SimilarProducts/SlimilarProducts";
import ReactImageGallery from "react-image-gallery";

function ProductDetails() {
  // fetch-products
  const [productsData, setProductsData] = useState(null);
  async function getProducts() {
    const options = {
      url: "http://127.0.0.1:8000/api/general/products",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setProductsData(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []);
  // end-fetch-products
  return (
    <>
      <div className="px-6 lg:px-12 py-4 sm:py-12 flex flex-col lg:flex-row justify-between gap-2">
        <div className="w-full lg:w-3/5">
          <ReactImageGallery
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            items={(ProductDetails?.images || []).map((image, index) => ({
              original: image,
              thumbnail: image,
              originalAlt: `Product image ${index + 1}`,
              thumbnailAlt: `Thumbnail ${index + 1}`,
            }))}
          />
        </div>
        <div className="w-full lg:w-2/5">
          <div className="flex justify-between">
            <p className="text-sm text-lightblack">category name</p>
            <p className="bg-black rounded-sm py-0.5 px-2 text-white text-xs">
              Best Seller
            </p>
          </div>
          <h2 className="text-3xl mt-2">product name</h2>
          <h5 className="text-lg mb-4">
            450 EGP <span className="text-secondary line-through">750 EGP</span>
          </h5>
          <p className="text-xs mb-2">size</p>
          <div className="flex gap-4 flex-wrap">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <label
                key={size}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="size"
                  value={size}
                  className="hidden peer"
                />
                <div className="py-2 w-12 text-sm text-center text-lightblack border border-lightblack peer-checked:border-2 peer-checked:border-black peer-checked:text-black transition duration-300 ease-in-out delay-150">
                  {size}
                </div>
              </label>
            ))}
          </div>
          <p className="text-xs mt-4 mb-2">Color</p>
          <div className="flex gap-2 flex-wrap">
            {[
              { name: "Light Beige", color: "#f5f5dc" },
              { name: "Light Coral", color: "#f08080" },
              { name: "Burgundy", color: "#800020" },
            ].map(({ name, color }) => (
              <label key={name} className="cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  value={name}
                  className="hidden peer"
                />
                <div
                  className="w-10 h-10 rounded-full border border-lightblack peer-checked:ring-1 peer-checked:ring-offset-1 peer-checked:ring-black transition duration-300 ease-in-out delay-150"
                  style={{ backgroundColor: color }}
                  title={name}
                ></div>
              </label>
            ))}
          </div>
          <p className="text-xs mt-4 mb-2">quantity</p>
          <div className="flex items-center gap-4 mb-4">
            <i className="fa-solid fa-minus cursor-pointer border-2 border-lightblack text-lightblack p-2 rounded-sm hover:border-blackmuted hover:text-black"></i>
            <span className="text-sm">1</span>
            <i className="fa-solid fa-plus cursor-pointer border-2 border-blackmuted p-2 rounded-sm"></i>
          </div>
          <div className="mt-6 flex gap-6 items-center">
            <div className="flex items-center gap-2 cursor-pointer text-lg font-light pl-4">
              <i className="fa-solid fa-share-nodes"></i>
              <span>Share</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer text-lg font-light">
              <i className="fa-regular fa-heart"></i>
              <span>Save</span>
            </div>
          </div>
          <div className="flex justify-between items-center my-6">
            <p className="text-sm">PRODUCT DETAILS:</p>
            <p className="text-sm cursor-pointer">DESCRIPTION +</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">SHIPPING & RETURNS</p>
            <i className="fa-solid fa-plus text-sm cursor-pointer"></i>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <button className="w-full xs:w-auto  bg-black text-sm font-light border-black border text-white rounded-full py-2 px-8 hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150">
              Add to cart
            </button>
            <button className="w-full xs:w-auto border text-sm font-light border-black rounded-full py-2 px-8 hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-12 pt-16 pb-4 flex justify-between">
        <h4 className="text-3xl">similar products</h4>
        <NavLink
          to="/FreshDrops"
          className={"underline hover:no-underline text-nowrap"}
        >
          view all
        </NavLink>
      </div>
      <div className="pb-12">
        {!productsData ? (
          <Loader />
        ) : (
          <SlimilarProducts productsData={productsData} />
        )}
      </div>
    </>
  );
}

export default ProductDetails;
