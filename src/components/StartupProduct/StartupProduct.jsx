import { Link } from "react-router-dom";
import hatch01 from "../../assets/imgs/hatch01.jpeg";

function StartupProduct() {
  return (
    <>
      <div className="w-64 overflow-hidden">
        <Link to={"/Startup/ProductDetail"}>
          <img
            src={
              hatch01?.[0] || "https://placehold.co/200x200?text=Product+Image"
            }
            alt="product"
            className="object-contain object-center h-52 w-full rounded-t"
            onError={(e) => {
              e.target.src = "https://placehold.co/250x200?text=Product+Image";
            }}
          />
        </Link>
        <div className="flex justify-between px-1.5 py-2">
          <p className="text-xs text-lightblack">category: accsessories</p>
          <p className="text-xs text-lightblack">quantity: 21</p>
        </div>
        <div className="px-1.5">
          <div className="flex justify-between gap-4">
            <h4 className="text-xl font-medium line-clamp-1">product name</h4>
            <h5 className="text-lightblack text-lg text-nowrap">500 EGP</h5>
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
