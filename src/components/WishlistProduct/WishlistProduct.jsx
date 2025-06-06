import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import { WishlistContext } from "../../context/Wishlist.context";

function WishlistProduct({ wishlistItem }) {
  const { product } = wishlistItem;
  const { addProductToCart, cartInfo } = useContext(CartContext);
  const { removeFromWishlist } = useContext(WishlistContext);

  const isInCart = cartInfo?.data?.data?.some((item) => item.id === product.id);
  const hasDiscount =
    product.discounted_price && product.discounted_price < product.price;

  return (
    <div className="border-t border-slate-300 py-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to={`/User/ProductDetails/${product.id}`}
          className="w-full sm:w-1/4"
        >
          <img
            src={
              product.images?.[0] ||
              "https://placehold.co/300x350?text=Product+Image"
            }
            alt={product.name}
            className="w-full h-48 sm:h-32 object-cover rounded"
            onError={(e) => {
              e.target.src = "https://placehold.co/300x350?text=Product+Image";
            }}
          />
        </Link>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Link to={`/User/ProductDetails/${product.id}`}>
                <h4 className="text-xl font-medium hover:underline">
                  {product.name}
                </h4>
              </Link>
              <p className="text-sm text-zinc-500">{product.description}</p>
            </div>
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="text-secondary hover:text-red-700"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
          <div className="flex justify-between items-end mt-4">
            <div>
              <p className="text-lg">
                {hasDiscount ? (
                  <>
                    <span>{product.discounted_price} EGP</span>
                    <span className="text-secondary text-sm line-through ml-2">
                      {product.price} EGP
                    </span>
                  </>
                ) : (
                  <span>{product.price} EGP</span>
                )}
              </p>
              <p className="text-sm text-zinc-500">
                Stock:{" "}
                {product.stock > 0 ? `${product.stock} items` : "Out of stock"}
              </p>
            </div>
            <button
              onClick={() => addProductToCart({ product_id: product.id })}
              disabled={product.stock === 0 || isInCart}
              className={`text-sm font-light py-2 px-6 rounded-full transition duration-300 ease-in-out ${
                product.stock === 0 || isInCart
                  ? "bg-lightblack text-blackmuted cursor-not-allowed"
                  : "bg-black border border-black text-white hover:bg-transparent hover:text-black"
              }`}
            >
              {product.stock === 0
                ? "Out of Stock"
                : isInCart
                ? "In Cart"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistProduct;
