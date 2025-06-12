import { useState, useMemo } from "react";
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

  const maxProducts = productsPerPage * 5;

  const limitedProducts = useMemo(() => {
    if (!productsData?.data) return [];
    return productsData.data.slice(0, maxProducts);
  }, [productsData, maxProducts]);

  const totalPages = Math.ceil(limitedProducts.length / productsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const startIndex = currentPage * productsPerPage;
  const displayedProducts = limitedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <>
      <div>
        {!productsData ? (
          <Loader />
        ) : (
          <div
            className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-x-hidden gap-4`}
          >
            {Array.isArray(displayedProducts) &&
              displayedProducts.map((product) => (
                <ProductCard key={product.id} productInfo={product} />
              ))}
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-8 md:mt-12 flex items-center justify-end gap-4 text-sm lg:text-xl">
          <i
            onClick={handlePrev}
            className={`fa-solid fa-arrow-left border border-black py-1.5 px-6 rounded-full ${
              currentPage > 0
                ? "hover:bg-black hover:text-white cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            } transition duration-300 ease-in-out delay-150`}
          ></i>
          <p className="text-lightblack ">
            <span className="underline text-black">
              {String(currentPage + 1).padStart(2, "0")}
            </span>
            /{String(totalPages).padStart(2, "0")}
          </p>
          <i
            onClick={handleNext}
            className={`fa-solid fa-arrow-right border border-black py-1.5 px-6 rounded-full ${
              currentPage < totalPages - 1
                ? "bg-black text-white hover:bg-transparent hover:text-black cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            } transition duration-300 ease-in-out delay-150`}
          ></i>
        </div>
      )}
    </>
  );
}

export default ProductsSlider;
