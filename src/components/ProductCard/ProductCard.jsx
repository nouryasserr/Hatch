import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";

function ProductCard({ productInfo }) {
  const {
    id,
    images,
    name,
    price,
    sub_category,
    created_at,
    discounted_price,
    stock,
    has_sizes,
    has_colors,
  } = productInfo;
  const hasDiscount = discounted_price && discounted_price < price;
  const isNewProduct = () => {
    if (!created_at) return false;
    const productDate = new Date(created_at);
    const currentDate = new Date();
    const diffTime = currentDate - productDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };
  let { addProductToCart } = useContext(CartContext);
  const isDisabled = stock === 0 || has_sizes || has_colors;
  return (
    <>
      <div className="relative overflow-hidden">
        {isNewProduct() && (
          <span className="absolute right-1 top-3 bg-primary text-white font-extralight px-2.5 py-0.5 rounded-sm">
            New
          </span>
        )}
        <Link to={`/User/ProductDetails/`}>
          <img
            src={
              images?.[0] || "https://placehold.co/300x350?text=Product+Image"
            }
            alt="product"
            className="object-contain object-center h-52 w-full rounded-t"
            onError={(e) => {
              e.target.src = "https://placehold.co/300x350?text=Product+Image";
            }}
          />
        </Link>
        <div className="py-4 px-1.5">
          <div className="flex justify-between gap-4">
            <h5 className="text-lg font-medium line-clamp-1">{name}</h5>
            <h5 className="text-lightblack text-lg text-nowrap">
              {hasDiscount ? (
                <>
                  <span className="font-light">{discounted_price}</span> EGP
                </>
              ) : (
                <>
                  <span className="font-light">{price}</span> EGP
                </>
              )}
            </h5>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-lightblack">{sub_category.name}</p>
            {hasDiscount && (
              <p className="text-secondary text-xs font-semibold line-through">
                {price} EGP
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <button
            disabled={isDisabled}
            onClick={() => {
              addProductToCart({ product_id: id });
            }}
            className={`text-sm font-light py-1.5 px-2 rounded-full w-full transition duration-300 ease-in-out delay-150 ${
              isDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black border border-black text-white hover:bg-transparent hover:text-black"
            }`}
          >
            {stock === 0
              ? "Out of Stock"
              : has_sizes || has_colors
              ? "Select options"
              : "Add to Cart"}
          </button>
          <button className="border border-zinc-400 py-1.5 px-7 rounded-full text-zinc-400 hover:bg-secondary hover:text-white hover:border-secondary">
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
