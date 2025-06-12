import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import { UserContext } from "../../context/User.context";
import { WishlistContext } from "../../context/Wishlist.context";
import toast from "react-hot-toast";

function ProductCard({ productInfo }) {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
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
  const { addProductToCart, cartInfo } = useContext(CartContext);
  const { wishlistInfo, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const isInCart = cartInfo?.data?.data?.some((item) => item.id === id);
  const isInWishlist = wishlistInfo?.data?.some(
    (item) => item.product.id === id
  );
  const hasDiscount = discounted_price && discounted_price < price;

  const isNewProduct = () => {
    if (!created_at) return false;
    const productDate = new Date(created_at);
    const currentDate = new Date();
    const diffTime = currentDate - productDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  const isDisabled = stock === 0 || has_sizes || has_colors || isInCart;

  const handleAddToCart = () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/Auth/Signin");
      return;
    }

    if (isInCart) {
      console.log("This product is already in your cart");
      return;
    }

    addProductToCart({ product_id: id });
  };

  const handleWishlistToggle = () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/Auth/Signin");
      return;
    }

    if (isInWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <>
      <div className="relative overflow-hidden">
        {isNewProduct() && (
          <span className="absolute right-2 top-2 bg-primary text-white font-extralight px-2.5 py-0.5 rounded-sm">
            New
          </span>
        )}
        <Link to={`/User/ProductDetails/${id}`}>
          <img
            src={
              images?.length > 0 && images[0]?.url
                ? `http://127.0.0.1:8000/${images[0].url}`
                : "https://placehold.co/300x350?text=Product+Image"
            }
            alt={name}
            className="object-cover object-center h-64 w-full rounded-t"
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
            onClick={handleAddToCart}
            className={`text-sm font-light py-1.5 px-6 rounded-full w-full transition duration-300 ease-in-out delay-150 ${
              isDisabled
                ? "bg-lightblack text-blackmuted cursor-not-allowed"
                : "bg-black border border-black text-white hover:bg-transparent hover:text-black"
            }`}
          >
            {stock === 0
              ? "Out of Stock"
              : has_sizes || has_colors
              ? "Select options"
              : isInCart
              ? "Added"
              : "Add to Cart"}
          </button>
          <button
            onClick={handleWishlistToggle}
            className={`border py-1.5 px-7 rounded-full transition duration-300 ease-in-out delay-150 ${
              isInWishlist
                ? "bg-secondary border-secondary text-white hover:bg-transparent hover:text-secondary"
                : "border-lightblack text-lightblack hover:bg-secondary hover:text-white hover:border-secondary"
            }`}
          >
            <i
              className={`fa-${isInWishlist ? "solid" : "regular"} fa-heart`}
            ></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
