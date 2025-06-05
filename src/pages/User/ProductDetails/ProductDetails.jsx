import { useState, useEffect, useContext, useCallback } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import SlimilarProducts from "../../../components/SimilarProducts/SlimilarProducts";
import ReactImageGallery from "react-image-gallery";
import { CartContext } from "../../../context/Cart.context";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [productsData, setProductsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addProductToCart } = useContext(CartContext);
  const [selectedOptions, setSelectedOptions] = useState({
    sizeId: null,
    colorId: null,
    quantity: 1,
    availableSizes: [],
    availableColors: [],
  });
  const selectedSize = productDetails?.sizes?.find(
    (item) =>
      item.size.id === selectedOptions.sizeId &&
      item.color.id === selectedOptions.colorId
  );
  const fetchProductDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/general/products/${id}`
      );
      setProductDetails(data.data);
    } catch (error) {
      toast.error("Failed to load product details");
      console.error(error);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (productDetails === null) return;
    getSimilarProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetails]);
  useEffect(() => {
    if (productDetails?.sizes?.length > 0) {
      const sizes = [...new Set(productDetails.sizes.map((item) => item.size))];
      const colors = [
        ...new Set(productDetails.sizes.map((item) => item.color)),
      ];

      setSelectedOptions((prev) => ({
        ...prev,
        availableSizes: sizes,
        availableColors: colors,
        sizeId: sizes[0]?.id || null,
        colorId: colors[0]?.id || null,
      }));
    }
  }, [productDetails]);
  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select size and color");
      return;
    }
    setIsAddingToCart(true);
    try {
      await addProductToCart({
        product_id: id,
        size_id: selectedSize.id,
        quantity: selectedOptions.quantity,
      });
      toast.success("Product added to cart successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
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
            {selectedSize?.discounted_price ||
              selectedSize?.price ||
              productDetails.price}{" "}
            EGP
            {selectedSize?.discounted_price && selectedSize?.price && (
              <span className="text-secondary line-through ml-2">
                {selectedSize.price} EGP
              </span>
            )}
          </h2>

          <div className="mb-4">
            <label className="text-xs mb-2 block">Size</label>
            <div className="flex gap-4 flex-wrap">
              {selectedOptions.availableSizes.map((size) => (
                <label
                  key={size.id}
                  className="flex items-center gap-2 cursor-pointer"
                  htmlFor={`size-${size.id}`}
                >
                  <input
                    id={`size-${size.id}`}
                    type="radio"
                    name="size"
                    checked={selectedOptions.sizeId === size.id}
                    onChange={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        sizeId: size.id,
                      }))
                    }
                    className="hidden peer"
                  />
                  <div
                    className={`py-2 w-12 text-sm text-center border ${
                      selectedOptions.sizeId === size.id
                        ? "border-2 border-black text-black"
                        : "border-lightblack text-lightblack"
                    }`}
                    aria-label={`Size ${size.name}`}
                  >
                    {size.name}
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs mt-4 mb-2 block">Color</label>
            <div className="flex gap-2 flex-wrap">
              {selectedOptions.availableColors.map((color) => (
                <label
                  key={color.id}
                  className="cursor-pointer"
                  htmlFor={`color-${color.id}`}
                >
                  <input
                    id={`color-${color.id}`}
                    type="radio"
                    name="color"
                    checked={selectedOptions.colorId === color.id}
                    onChange={() =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        colorId: color.id,
                      }))
                    }
                    className="hidden peer"
                  />
                  <div
                    className={`w-10 h-10 rounded-full border ${
                      selectedOptions.colorId === color.id
                        ? "ring-1 ring-offset-1 ring-black"
                        : "border-lightblack"
                    }`}
                    style={{ backgroundColor: color.code }}
                    aria-label={`Color ${color.name}`}
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-xs mt-4 mb-2 block">Quantity</label>
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
            <button className="flex items-center gap-2 cursor-pointer text-lg font-light pl-4">
              <i className="fa-solid fa-share-nodes" aria-hidden="true" />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-2 cursor-pointer text-lg font-light">
              <i className="fa-regular fa-heart" aria-hidden="true" />
              <span>Save</span>
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
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || isAddingToCart}
              className={`w-full xs:w-auto bg-black text-sm font-light border border-black text-white rounded-full py-2 px-8 ${
                !selectedSize || isAddingToCart
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
        </div>
      </div>
      <div className="px-6 lg:px-12 pt-16">
        <div className="pb-4 flex justify-between">
          <h2 className="text-3xl">Similar products</h2>
          <NavLink
            to="/FreshDrops"
            className="underline hover:no-underline text-nowrap"
          >
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
