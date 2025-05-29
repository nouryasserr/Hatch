import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";

function Products({ productsData }) {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 15;
  const productsArray = productsData?.data || productsData || [];
  const totalPages = Math.ceil(productsArray.length / productsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const startIndex = currentPage * productsPerPage;
  const displayedProducts = productsArray.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <>
      <div className="flex justify-center">
        {productsArray.length === 0 ? (
          <Loader />
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 overflow-x-hidden md:justify-between">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} productInfo={product} />
            ))}
          </div>
        )}
      </div>

      {productsArray.length > 0 && (
        <div className="mx-6 lg:mx-12 mt-8 md:mt-16 flex items-center justify-center gap-4 text-sm lg:text-xl">
          <i
            onClick={handlePrev}
            className="fa-solid fa-arrow-left border border-black py-1.5 px-6 rounded-full hover:bg-black hover:text-white transition duration-300 ease-in-out cursor-pointer"
          ></i>

          <p className="text-lightblack">
            <span className="underline text-black">
              {String(currentPage + 1).padStart(2, "0")}
            </span>
            /{String(totalPages).padStart(2, "0")}
          </p>

          <i
            onClick={handleNext}
            className="fa-solid fa-arrow-right border border-black bg-black text-white py-1.5 px-6 rounded-full hover:bg-transparent hover:text-black transition duration-300 ease-in-out cursor-pointer"
          ></i>
        </div>
      )}
    </>
  );
}

export default Products;
