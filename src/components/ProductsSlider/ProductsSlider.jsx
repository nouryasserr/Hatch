import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";
import useWindowSize from "../../Hooks/useWindowSize";

function ProductsSlider({ productsData }) {
  const [currentPage, setCurrentPage] = useState(0);
  const windowWidth = useWindowSize();
  let productsPerPage = 1;
  if (windowWidth >= 1280) {
    productsPerPage = 5;
  } else if (windowWidth >= 1025) {
    productsPerPage = 4;
  } else if (windowWidth >= 769) {
    productsPerPage = 3;
  } else if (windowWidth >= 640) {
    productsPerPage = 2;
  }
  const totalPages = Math.ceil(
    (productsData?.data?.length || 0) / productsPerPage
  );
  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  const startIndex = currentPage * productsPerPage;
  const displayedProducts = productsData?.data?.slice(
    startIndex,
    startIndex + productsPerPage
  );
  return (
    <>
      <div className="flex justify-center">
        {!productsData ? (
          <Loader />
        ) : (
          <div
            className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-8 overflow-x-hidden md:justify-between`}
          >
            {Array.isArray(displayedProducts) &&
              displayedProducts.map((product) => (
                <ProductCard key={product.id} productInfo={product} />
              ))}
          </div>
        )}
      </div>
      <div className="mx-6 lg:mx-12 mt-8 md:mt-16 flex items-center justify-end gap-4 text-sm lg:text-xl">
        <i
          onClick={handlePrev}
          className="fa-solid fa-arrow-left border border-black py-1.5 px-6 rounded-full hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150 cursor-pointer"
        ></i>
        <p className="text-lightblack ">
          <span className="underline text-black">
            {String(currentPage + 1).padStart(2, "0")}
          </span>
          /{String(totalPages).padStart(2, "0")}
        </p>
        <i
          onClick={handleNext}
          className="fa-solid fa-arrow-right border border-black bg-black text-white py-1.5 px-6 rounded-full hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150 cursor-pointer"
        ></i>
      </div>
    </>
  );
}

export default ProductsSlider;
