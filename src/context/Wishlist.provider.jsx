import { useContext, useState } from "react";
import { WishlistContext } from "./Wishlist.context";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

function WishlistProvider({ children }) {
  const { token } = useContext(UserContext);
  const [wishlistInfo, setWishlistInfo] = useState(null);

  async function getWishlistProducts() {
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/user/wishlist",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let { data } = await axios.request(options);
      setWishlistInfo(data);
    } catch (error) {
      toast.error("Failed to fetch wishlist products.");
      console.log(error);
    }
  }

  async function addToWishlist(productId) {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    const toastId = toast.loading("Adding to wishlist...");
    try {
      const options = {
        url: `http://127.0.0.1:8000/api/user/wishlist/${productId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.request(options);
      if (data.success) {
        toast.success("Added to wishlist successfully!");
        getWishlistProducts();
      } else {
        toast.error("Failed to add to wishlist.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while adding to wishlist.";
      toast.error(errorMessage);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function removeFromWishlist(productId) {
    const toastId = toast.loading("Removing from wishlist...");
    try {
      const options = {
        url: `http://127.0.0.1:8000/api/user/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.request(options);
      if (data.success) {
        toast.success("Removed from wishlist successfully!");
        getWishlistProducts();
      } else {
        toast.error("Failed to remove from wishlist.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while removing from wishlist.";
      toast.error(errorMessage);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistInfo,
        getWishlistProducts,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
