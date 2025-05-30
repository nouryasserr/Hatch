import { Link } from "react-router-dom";

function ProductCard({ productInfo }) {
  const { images, name, price, sub_category, created_at, discounted_price } =
    productInfo;
  const hasDiscount = discounted_price && discounted_price < price;
  const isNewProduct = () => {
    if (!created_at) return false;
    const productDate = new Date(created_at);
    const currentDate = new Date();
    const diffTime = currentDate - productDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  return (
    <>
      <div className="relative w-56 overflow-hidden">
        {isNewProduct() && (
          <span className="absolute right-1 top-3 bg-black text-white font-extralight px-2.5 py-0.5 rounded-sm">
            New
          </span>
        )}
        <Link to={`/User/ProductDetails`}>
          <img
            src={
              images?.[0] || "https://placehold.co/200x200?text=Product+Image"
            }
            alt="product"
            className="object-contain object-center h-52 w-full rounded-t"
            onError={(e) => {
              e.target.src = "https://placehold.co/200x200?text=Product+Image";
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
          <button className="text-sm font-light bg-black border border-black text-white py-1.5 px-2 rounded-full w-full hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150">
            add to cart
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
