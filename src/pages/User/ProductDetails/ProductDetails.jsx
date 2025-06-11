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
import WriteReview from "../../../components/WriteReview/WriteReview";

function ProductDetails() {
  const [showWriteReview, setShowWriteReview] = useState(false);
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
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
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

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoadingReviews(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user/products/${id}/reviews`
      );
      if (response.data.success) {
        setReviews(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setIsLoadingReviews(false);
    }
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleReviewAdded = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/Auth/Signin");
      return;
    }

    const hasSizesOrColors = productDetails?.sizes?.length > 0;
    if (
      hasSizesOrColors &&
      (!selectedOptions.sizeId || !selectedOptions.colorId)
    ) {
      toast.error("Please select both size and color");
      return;
    }

    if (hasSizesOrColors) {
      const selectedVariant = productDetails?.sizes?.find(
        (item) =>
          item.size.id === selectedOptions.sizeId &&
          item.color.id === selectedOptions.colorId
      );

      if (!selectedVariant) {
        toast.error("Selected combination is not available");
        return;
      }
    }

    setIsAddingToCart(true);
    try {
      const cartData = {
        product_id: parseInt(id),
        quantity: selectedOptions.quantity || 1,
      };

      if (hasSizesOrColors) {
        cartData.size_id = selectedOptions.sizeId;
        cartData.color_id = selectedOptions.colorId;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/cart/add",
        cartData,
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
  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: productDetails?.name || "Check out this product",
      text:
        productDetails?.description?.slice(0, 100) + "..." ||
        "Check out this amazing product!",
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // If clipboard write fails, show error
      toast.error("Failed to share. Please try again.");
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
        <div className="w-full lg:w-2/5">
          <ReactImageGallery
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            items={(productDetails?.images || []).map((image) => ({
              original: `http://127.0.0.1:8000/${image.url}`,
              thumbnail: `http://127.0.0.1:8000/${image.url}`,
            }))}
          />
        </div>
        <div className="w-full lg:w-3/5 py-4">
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
          <h2 className="text-3xl mt-2">{productDetails.name}</h2>
          <h5 className="text-lg mb-4">
            {productDetails.price} EGP
            {productDetails.discounted_price && (
              <span className="text-secondary line-through ml-2">
                {productDetails.price} EGP
              </span>
            )}
          </h5>
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
                    className={`px-4 py-2 rounded-md border-2 transition-all ${
                      selectedOptions.colorId === color.id
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {color.name}
                  </button>
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

          <div className="mt-6 flex gap-6 items-center">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 cursor-pointer text-lg font-light pl-4 hover:text-gray-600 transition-colors"
            >
              <i className="fa-solid fa-share-nodes" aria-hidden="true" />
              <span>Share</span>
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`flex items-center gap-2 cursor-pointer text-lg font-light ${
                isInWishlist ? "text-red-500" : ""
              }`}
            >
              <i
                className={`fa-${isInWishlist ? "solid" : "regular"} fa-heart`}
                aria-hidden="true"
              />
              <span>{isInWishlist ? "Saved" : "Save"}</span>
            </button>
          </div>
          <div className="my-6 space-y-4">
            <div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              >
                <p className="text-sm">PRODUCT DETAILS:</p>
                <button className="text-sm">
                  {isDescriptionOpen ? "DESCRIPTION -" : "DESCRIPTION +"}
                </button>
              </div>
              {isDescriptionOpen && (
                <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                  {productDetails.description}
                </div>
              )}
            </div>

            <div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsShippingOpen(!isShippingOpen)}
              >
                <p className="text-sm">SHIPPING & RETURNS</p>
                <button className="text-sm">
                  <i
                    className={`fa-solid ${
                      isShippingOpen ? "fa-minus" : "fa-plus"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>
              {isShippingOpen && (
                <div className="mt-4 space-y-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium mb-2">Shipping Information:</h4>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Delivery within 3-7 business days</li>
                      <li>Free shipping for orders above 1000 EGP</li>
                      <li>Standard shipping fee: 50 EGP</li>
                      <li>
                        Express shipping available (additional fees apply)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Returns Policy:</h4>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>14-day return policy</li>
                      <li>Item must be unused and in original packaging</li>
                      <li>Free returns for defective items</li>
                      <li>Contact customer service to initiate a return</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              disabled={
                isAddingToCart ||
                (productDetails?.sizes?.length > 0 &&
                  (!selectedOptions.sizeId || !selectedOptions.colorId))
              }
              className={`w-full xs:w-auto bg-black text-sm font-light border border-black text-white rounded-full py-2 px-8 ${
                isAddingToCart ||
                (productDetails?.sizes?.length > 0 &&
                  (!selectedOptions.sizeId || !selectedOptions.colorId))
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-transparent hover:text-black"
              } transition duration-300 ease-in-out`}
            >
              {isAddingToCart ? "Adding..." : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-12 pt-16">
        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl">reviews</h2>
            <span className="text-xs text-blackmuted underline">
              showing {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </span>
          </div>
          <button
            onClick={() => {
              if (!token) {
                toast.error("Please login first");
                navigate("/Auth/Signin");
                return;
              }
              setShowWriteReview(true);
            }}
            className="border border-lightblack bg-black text-white py-1 px-4 rounded-full hover:bg-transparent hover:text-black transition duration-300 ease-in-out"
          >
            write review
          </button>
        </div>

        {isLoadingReviews ? (
          <div className="py-8 text-center">
            <Loader />
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          <div className="space-y-6 mt-6">
            {reviews.map((review) => (
              <div key={review.id}>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h6 className="font-medium">{review.user.name}</h6>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fa-solid fa-star ${
                            index < review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        ></i>
                      ))}
                    </div>
                  </div>
                  <span className="text-lightgray text-sm">
                    {review.time_ago}
                  </span>
                </div>
                <p className="mt-2 pb-4 border-b">{review.comments}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="px-6 lg:px-12 pt-16">
        <div className="pb-4 flex justify-between">
          <h2 className="text-3xl">similar products</h2>
          <NavLink to="/" className="underline hover:no-underline text-nowrap">
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
      {showWriteReview && (
        <WriteReview
          onClose={() => setShowWriteReview(false)}
          productId={id}
          onReviewAdded={handleReviewAdded}
        />
      )}
    </>
  );
}

export default ProductDetails;
