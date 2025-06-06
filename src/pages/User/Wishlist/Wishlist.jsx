import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyWishlist from "../../../components/EmptyWishlist/EmptyWishlist";
import WishlistProduct from "../../../components/WishlistProduct/WishlistProduct";
import { WishlistContext } from "../../../context/Wishlist.context";
import Loader from "../../../components/Loader/Loader";

function Wishlist() {
  const navigate = useNavigate();
  const { wishlistInfo, getWishlistProducts } = useContext(WishlistContext);

  useEffect(() => {
    getWishlistProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!wishlistInfo) return <Loader />;
  if (!wishlistInfo.data || wishlistInfo.data.length === 0)
    return <EmptyWishlist />;

  return (
    <div className="px-6 lg:px-12 pb-6 sm:py-6">
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-3xl mb-2">your wishlist</h3>
            <p className="text-lightblack text-sm">
              {wishlistInfo.data.length}{" "}
              {wishlistInfo.data.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 hover:gap-3 transition duration-300 delay-150 ease-in-out"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>back</span>
          </button>
        </div>
        <div>
          {wishlistInfo.data.map((item) => (
            <WishlistProduct key={item.id} wishlistItem={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
