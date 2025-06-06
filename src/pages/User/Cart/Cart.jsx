import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CartProduct from "../../../components/CartProduct/CartProduct";
import OrderSummary from "../../../components/OrderSummary/OrderSummary";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import SlimilarProducts from "../../../components/SimilarProducts/SlimilarProducts";
import { useContext } from "react";
import { CartContext } from "../../../context/Cart.context";
import EmptyCart from "../../../components/EmptyCart/EmptyCart";

function Cart() {
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [checkedProductIds, setCheckedProductIds] = useState([]);
  const { getCartProducts, cartInfo, removeProduct, clearCart } =
    useContext(CartContext);
  function handleCheckboxChange(productId, isChecked) {
    if (isChecked) {
      const newChecked = [...checkedProductIds, productId];
      setCheckedProductIds(newChecked);
      if (newChecked.length === cartInfo.data.data.length) {
        setIsSelectAll(true);
      }
    } else {
      const newChecked = checkedProductIds.filter((id) => id !== productId);
      setCheckedProductIds(newChecked);
      setIsSelectAll(false);
    }
  }
  const handleDeleteSelected = async () => {
    if (isSelectAll || checkedProductIds.length === cartInfo.data.data.length) {
      try {
        await clearCart();
        setCheckedProductIds([]);
        setIsSelectAll(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      const deletePromises = checkedProductIds.map((id) =>
        removeProduct({ product_id: id })
      );
      try {
        await Promise.all(deletePromises);
        setCheckedProductIds([]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getCartProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [productsData, setProductsData] = useState(null);
  async function getProducts() {
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/general/products",
        method: "GET",
      };
      let { data } = await axios.request(options);
      setProductsData(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  if (!cartInfo) return <Loader />;
  if (!cartInfo.data || !cartInfo.data.data || cartInfo.data.data.length === 0)
    return <EmptyCart />;
  return (
    <>
      <div className="px-6 md:pl-6 lg:pl-12 pt-2 md:pt-16 w-full md:w-3/5">
        <h3 className="text-3xl mb-2">shopping cart</h3>
        <p className="text-zinc-500 text-sm font-extralight mb-8">
          showing <span>{cartInfo.data.totalItems}</span> products you added
        </p>
        <div className="py-4 pt-6 border-t border-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={isSelectAll}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsSelectAll(checked);
                if (checked) {
                  const allProductIds = cartInfo.data.data.map((p) => p.id);
                  setCheckedProductIds(allProductIds);
                } else {
                  setCheckedProductIds([]);
                }
              }}
              name="checkbox"
              className="w-6 lg:w-8 h-6 lg:h-8 appearance-none border-2 border-black rounded checked:bg-black checked:border-black checked:after:content-['✔'] checked:after:text-white checked:after:text-lg checked:after:flex checked:after:justify-center checked:after:items-center"
            />
            <p>select all</p>
            <span className="bg-stone-300 rounded-full py-1 px-2.5">
              {cartInfo.data.totalItems}
            </span>
          </div>
          <p
            onClick={handleDeleteSelected}
            className="text-secondary text-sm underline cursor-pointer hover:no-underline"
          >
            delete
          </p>
        </div>
      </div>
      <div className="flex justify-between flex-col md:flex-row">
        <div className="w-full md:w-3/5">
          <div>
            {cartInfo.data.data.map((product) => (
              <CartProduct
                key={product.id}
                cartProductInfo={product}
                onCheckboxChange={handleCheckboxChange}
                checked={checkedProductIds.includes(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/5 mt-16 md:mt-0">
          <OrderSummary />
        </div>
      </div>
      <div className="px-6 lg:px-12 pt-16 ">
        <div className="pb-4 flex justify-between">
          <h4 className="text-3xl">similar products</h4>
          <NavLink
            to="/"
            className={"underline hover:no-underline text-nowrap"}
          >
            view all
          </NavLink>
        </div>
        <div className="pb-12">
          {!productsData ? (
            <Loader />
          ) : (
            <SlimilarProducts productsData={productsData} />
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
