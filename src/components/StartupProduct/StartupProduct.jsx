import { Link } from "react-router-dom";

function StartupProduct({ product }) {
  if (!product) return null;

  const { name, price, stock, sub_category } = product;
  const imageUrl =
    product?.startup?.logo || "https://placehold.co/200x200?text=Product+Image";

  return (
    <>
      <div className="w-64 overflow-hidden">
        <Link to={"/Startup/ProductDetail"}>
          <img
            src={imageUrl}
            alt="product"
            className="object-contain object-center h-52 w-full rounded-t"
            onError={(e) => {
              e.target.src = "https://placehold.co/250x200?text=Product+Image";
            }}
          />
        </Link>
        <div className="flex justify-between px-1.5 py-2">
          <p className="text-xs text-lightblack">
            category: {sub_category?.category?.name || "no category"}
          </p>
          <p className="text-xs text-lightblack">quantity: {stock}</p>
        </div>
        <div className="px-1.5">
          <div className="flex justify-between gap-4">
            <h4 className="text-xl font-medium line-clamp-1">{name}</h4>
            <h5 className="text-lightblack text-lg text-nowrap">{price} EGP</h5>
          </div>
        </div>
        <button className="px-1.5 text-sm text-secondary underline hover:no-uderline transition duration-300 ease-in-out delay-150">
          delete product
        </button>
      </div>
    </>
  );
}

export default StartupProduct;
