import { useState, useEffect, useContext, useCallback } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import SlimilarProducts from "../../../components/SimilarProducts/SlimilarProducts";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { UserContext } from "../../../context/User.context";
import { WishlistContext } from "../../../context/Wishlist.context";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);
  const [productDetails, setProductDetails] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    sizeId: null,
    colorId: null,
    quantity: 1,
    availableSizes: [],
    availableColors: [],
  });
  const fetchProductDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/general/products/${id}`
      );
      console.log("Product Details:", data.data);
      console.log("Sizes:", data.data.sizes);
      setProductDetails(data.data);
      if (data.data.sizes && data.data.sizes.length > 0) {
        const sizes = data.data.sizes;
        console.log("Processing sizes:", sizes);
        const uniqueSizes = Array.from(
          new Set(sizes.map((item) => JSON.stringify(item.size)))
        ).map((str) => JSON.parse(str));
        const uniqueColors = Array.from(
          new Set(sizes.map((item) => JSON.stringify(item.color)))
        ).map((str) => JSON.parse(str));

        console.log("Unique Sizes:", uniqueSizes);
        console.log("Unique Colors:", uniqueColors);

        setSelectedOptions((prev) => ({
          ...prev,
          availableSizes: uniqueSizes,
          availableColors: uniqueColors,
        }));
      }
    } catch (error) {
      toast.error("Failed to load product details");
      console.error("Error fetching product details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  async function getSimilarProducts() {
    try {
      const options = {
        url: `http://127.0.0.1:8000/api/general/products?category_id=${productDetails.sub_category.category.id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setProductsData(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  useEffect(() => {
    if (productDetails === null) return;
    getSimilarProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetails]);
  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/Auth/Signin");
      return;
    }
    if (!selectedOptions.sizeId || !selectedOptions.colorId) {
      toast.error("Please select both size and color");
      return;
    }
    const selectedVariant = productDetails?.sizes?.find(
      (item) =>
        item.size.id === selectedOptions.sizeId &&
        item.color.id === selectedOptions.colorId
    );
    console.log("Selected Variant:", selectedVariant);
    console.log("Selected Options:", selectedOptions);
    console.log("Available Sizes:", selectedOptions.availableSizes);
    console.log("Available Colors:", selectedOptions.availableColors);
    if (!selectedVariant) {
      toast.error("Selected combination is not available");
      return;
    }
    setIsAddingToCart(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/cart/add",
        {
          product_id: parseInt(id),
          size_id: selectedOptions.sizeId,
          color_id: selectedOptions.colorId,
          quantity: selectedOptions.quantity || 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Add to cart response:", response.data);
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error);
      const errorMessage =
        error.response?.data?.message || "Failed to add to cart";
      toast.error(errorMessage);
    } finally {
      setIsAddingToCart(false);
    }
  };
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setSelectedOptions((prev) => ({
      ...prev,
      quantity: newQuantity,
    }));
  };
  const handleWishlistToggle = () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/Auth/Signin");
      return;
    }
    if (isInWishlist) {
      removeFromWishlist(parseInt(id));
    } else {
      addToWishlist(parseInt(id));
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  if (!productDetails) {
    return <div className="p-12 text-center">Product not found</div>;
  }
  return (
    <>
      <div className="px-6 lg:px-12 py-4 sm:py-12 flex flex-col lg:flex-row justify-between gap-2">
        <div className="w-full lg:w-3/5">
          <ReactImageGallery
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            items={(productDetails?.images || []).map((image) => ({
              original: image,
              thumbnail: image,
            }))}
          />
        </div>
        <div className="w-full lg:w-2/5">
          <div className="flex justify-between">
            <p className="text-sm text-lightblack">
              {productDetails.sub_category.category.name}
            </p>
            {productDetails.is_best_seller && (
              <p className="bg-black rounded-sm py-0.5 px-2 text-white text-xs">
                Best Seller
              </p>
            )}
          </div>
          <h1 className="text-3xl mt-2">{productDetails.name}</h1>
          <h2 className="text-lg mb-4">
            {productDetails.price} EGP
            {productDetails.discounted_price && (
              <span className="text-secondary line-through ml-2">
                {productDetails.price} EGP
              </span>
            )}
          </h2>
          {selectedOptions.availableSizes.length > 0 && (
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">
                Select Size
              </label>
              <div className="flex gap-4 flex-wrap">
                {selectedOptions.availableSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => {
                      console.log("Selecting size:", size);
                      setSelectedOptions((prev) => ({
                        ...prev,
                        sizeId: size.id,
                      }));
                    }}
                    className={`py-2 px-4 border rounded-md transition-colors ${
                      selectedOptions.sizeId === size.id
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          {selectedOptions.availableColors.length > 0 && (
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">
                Select Color
              </label>
              <div className="flex gap-4 flex-wrap">
                {selectedOptions.availableColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => {
                      console.log("Selecting color:", color);
                      setSelectedOptions((prev) => ({
                        ...prev,
                        colorId: color.id,
                      }));
                    }}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedOptions.colorId === color.id
                        ? "ring-2 ring-black ring-offset-2"
                        : "border-gray-300 hover:border-black"
                    }`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  handleQuantityChange(selectedOptions.quantity - 1)
                }
                disabled={selectedOptions.quantity <= 1}
                className={`border-2 ${
                  selectedOptions.quantity <= 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } border-lightblack text-lightblack p-2 rounded-sm hover:border-blackmuted hover:text-black`}
                aria-label="Decrease quantity"
              >
                <i className="fa-solid fa-minus" />
              </button>
              <span className="text-sm">{selectedOptions.quantity}</span>
              <button
                onClick={() =>
                  handleQuantityChange(selectedOptions.quantity + 1)
                }
                className="border-2 border-blackmuted p-2 rounded-sm"
                aria-label="Increase quantity"
              >
                <i className="fa-solid fa-plus" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={
                !selectedOptions.sizeId ||
                !selectedOptions.colorId ||
                isAddingToCart
              }
              className={`w-full xs:w-auto bg-black text-sm font-light border border-black text-white rounded-full py-2 px-8 ${
                !selectedOptions.sizeId ||
                !selectedOptions.colorId ||
                isAddingToCart
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-transparent hover:text-black"
              } transition duration-300 ease-in-out`}
            >
              {isAddingToCart ? "Adding..." : "Add to cart"}
            </button>
            <button className="w-full xs:w-auto border text-sm font-light border-black rounded-full py-2 px-8 hover:bg-black hover:text-white transition duration-300 ease-in-out">
              Buy Now
            </button>
          </div>
          <div className="mt-6 flex gap-6 items-center">
            <button className="flex items-center gap-2 cursor-pointer text-lg font-light pl-4">
              <i className="fa-solid fa-share-nodes" aria-hidden="true" />
              <span>Share</span>
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`flex items-center gap-2 cursor-pointer text-lg font-light ${
                isInWishlist ? "text-secondary" : ""
              }`}
            >
              <i
                className={`fa-${isInWishlist ? "solid" : "regular"} fa-heart`}
                aria-hidden="true"
              />
              <span>{isInWishlist ? "Saved" : "Save"}</span>
            </button>
          </div>
          <div className="my-6">
            <div className="flex justify-between items-center">
              <p className="text-sm">PRODUCT DETAILS:</p>
              <button className="text-sm">DESCRIPTION +</button>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm">SHIPPING & RETURNS</p>
              <button className="text-sm">
                <i className="fa-solid fa-plus" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-12 pt-16">
        <div className="pb-4 flex justify-between">
          <h2 className="text-3xl">Similar products</h2>
          <NavLink to="/" className="underline hover:no-underline text-nowrap">
            View all
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

export default ProductDetails;
