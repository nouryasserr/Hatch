import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";

function CartProduct({ cartProductInfo, onCheckboxChange, checked }) {
  const { id, image, name, price, sub_category, quantity } = cartProductInfo;
  let { increaseQuantity, removeProductFromCart } = useContext(CartContext);

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) {
      console.log("Minimum quantity is 1");
      return;
    }
    removeProductFromCart({ product_id: id });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "https://placehold.co/100x100?text=Product+Image";
    }

    // If the URL already contains the full path, return it as is
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Otherwise, prepend the base URL
    return `http://127.0.0.1:8000/${imagePath}`;
  };

  return (
    <>
      <div className="px-6 md:pl-6 lg:pl-12">
        <div className="py-4 pt-6 border-t border-lightblack flex flex-col xs:flex-row gap-6 xs:gap-0 items-center justify-between">
          <div className="flex items-center gap-8">
            <input
              type="checkbox"
              name="checkbox"
              checked={checked}
              onChange={(e) => onCheckboxChange(id, e.target.checked)}
              className="hidden xs:block w-6 lg:w-8 h-6 lg:h-8 appearance-none border-2 border-black rounded checked:bg-black checked:border-black checked:after:content-['✔'] checked:after:text-white checked:after:text-lg checked:after:flex checked:after:justify-center checked:after:items-center"
            />
            <img
              src={getImageUrl(image)}
              alt={name}
              className="w-28 lg:w-48 object-contain"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/100x100?text=Product+Image";
              }}
            />
            <div>
              <p className="text-lightblack text-xs lg:text-sm lg:mb-2">
                {sub_category.name}
              </p>
              <h4 className="text-lg lg:text-xl lg:mb-2">{name}</h4>
              <h3 className="text-lg lg:text-2xl">{price} EGP</h3>
            </div>
          </div>
          <div className="flex items-center justify-between w-full xs:w-fit">
            <input
              type="checkbox"
              name="checkbox"
              checked={checked}
              onChange={(e) => onCheckboxChange(id, e.target.checked)}
              className="block xs:hidden w-6 lg:w-8 h-6 lg:h-8 appearance-none border-2 border-black rounded checked:bg-black checked:border-black checked:after:content-['✔'] checked:after:text-white checked:after:text-lg checked:after:flex checked:after:justify-center checked:after:items-center"
            />
            <div className="flex items-center gap-4 text-lg lg:text-2xl">
              <i
                onClick={handleDecreaseQuantity}
                className={`fa-solid fa-minus border ${
                  quantity <= 1
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                } border-lightblack p-1.5 px-2 lg:p-2 lg:px-2.5 rounded-sm`}
                title={
                  quantity <= 1
                    ? "Minimum quantity reached"
                    : "Decrease quantity"
                }
              ></i>
              <span className="text-sm">{quantity}</span>
              <i
                onClick={() => {
                  increaseQuantity({ product_id: id });
                }}
                className="fa-solid fa-plus border border-blackmuted p-1.5 px-2 lg:p-2 lg:px-2.5 rounded-sm cursor-pointer"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProduct;
