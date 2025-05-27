import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";

function SlimilarProducts({ productsData }) {
  const displayedProducts = productsData?.slice(0, 5);
  return (
    <>
      <div className="flex justify-center">
        {!productsData ? (
          <Loader />
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 overflow-x-hidden md:justify-between">
            {displayedProducts.map((product) => (
              <ProductCard key={product._id} productInfo={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SlimilarProducts;
