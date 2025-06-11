import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";

function SlimilarProducts({ productsData }) {
  // Convert object to array if needed
  const productsArray = productsData?.data
    ? Array.isArray(productsData.data)
      ? productsData.data
      : Object.values(productsData.data)
    : [];

  // Take first 5 products
  const displayedProducts = productsArray.slice(0, 5);

  return (
    <>
      <div className="flex justify-center">
        {!productsData ? (
          <Loader />
        ) : displayedProducts.length === 0 ? (
          <div className="text-center text-gray-500">
            No similar products found
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 overflow-x-hidden md:justify-between">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} productInfo={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SlimilarProducts;
