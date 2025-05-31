import { useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { CartContext } from "./Cart.context";

export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartInfo, setCartInfo] = useState(null);
  async function addProductToCart({ product_id }) {
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }
    let toastId = toast.loading("Adding product to cart...");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/cart/add",
        { product_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        console.log("Product added to cart:", response.data);
        toast.success("Product added to cart successfully!");
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("An error occurred while adding to cart.");
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function getCartProducts() {
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/user/cart",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let { data } = await axios.request(options);
      setCartInfo(data);
    } catch (error) {
      toast.error("Failed to fetch cart products.");
      console.log(error);
    }
  }

  return (
    <CartContext.Provider
      value={{ addProductToCart, getCartProducts, cartInfo }}
    >
      {children}
    </CartContext.Provider>
  );
}
