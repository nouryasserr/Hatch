import { useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";
import { CartContext } from "./Cart.context";

function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartInfo, setCartInfo] = useState(null);
  async function addProductToCart({ product_id, size, color }) {
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }
    const toastId = toast.loading("Adding product to cart...");
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/user/cart/add",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { product_id, size, color },
      };
      const { data } = await axios.request(options);
      if (data.success) {
        toast.success("Product added to cart successfully!");
        getCartProducts();
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[
          Object.keys(error.response.data.errors)[0]
        ]?.[0] ||
        "An error occurred while adding to cart.";
      toast.error(errorMessage);
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
  async function removeProductFromCart({ product_id }) {
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/user/cart/remove",
        data: { product_id },
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let { data } = await axios.request(options);
      if (data.success) {
        await getCartProducts();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  }
  async function clearCart() {
    const toastId = toast.loading("Clearing cart...");
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/user/cart/clear",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let { data } = await axios.request(options);
      if (data.success) {
        toast.success("Cart cleared successfully!");
        await getCartProducts();
      } else {
        toast.error(data.message || "Failed to clear cart");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "An error occurred while clearing cart"
      );
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function increaseQuantity({ product_id }) {
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/user/cart/increase-quantity",
        data: { product_id },
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let { data } = await axios.request(options);
      if (data.success) {
        await getCartProducts();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartProducts,
        cartInfo,
        removeProductFromCart,
        increaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
