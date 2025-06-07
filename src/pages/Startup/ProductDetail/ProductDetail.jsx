import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StartupContext } from "../../../context/Startup.context";
import Loader from "../../../components/Loader/Loader";

function ProductDetail() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(StartupContext);

  useEffect(() => {
    let mounted = true;

    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/startup/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (mounted) {
          setProductDetails(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          console.error("Error fetching product details:", error);
          setError(error.message);
          setLoading(false);
        }
      }
    };

    if (token && id) {
      fetchProductDetails();
    } else {
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [token, id]);

  if (loading) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6 min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">
          No product details found
        </div>
      </div>
    );
  }

  const sizes = productDetails.sizes.map((size) => size.size.name);
  const colors = productDetails.sizes.map((size) => ({
    name: size.color.name,
    color: size.color.code || "#000000", // fallback color if code is null
  }));

  const mainImage =
    productDetails.images.find((img) => img.is_main)?.url ||
    productDetails.images[0]?.url ||
    "https://placehold.co/300x350?text=Product+Image";

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="flex justify-between gap-2 flex-wrap">
          <div>
            <h2 className="text-3xl mb-0.5">product page</h2>
            <p className="text-lightblack text-sm">
              manage every detail of your product
            </p>
          </div>
          <Link className="border border-black p-2 px-4 flex items-center gap-2 h-fit hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150">
            <i className="fa-regular fa-pen-to-square"></i>
            <span>Edit</span>
          </Link>
        </div>
        <div className="flex mt-6 justify-between gap-8 flex-col lg:flex-row">
          <div className="lg:w-1/3">
            <img
              src={mainImage}
              alt={productDetails.name}
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/300x350?text=Product+Image";
              }}
            />
          </div>
          <div className="w-full lg:w-2/3">
            <p className="text-sm text-lightblack mb-4">
              product id: #{productDetails.id}
            </p>
            <h2 className="text-3xl my-2">{productDetails.name}</h2>
            <p className="my-4">{productDetails.description}</p>
            <p className="text-sm text-lightblack mb-4">
              {`${productDetails.sub_category.category.name} > ${productDetails.sub_category.name}`}
            </p>
            <div className="my-2 flex justify-between gap-2 flex-wrap">
              <p>
                base price:{" "}
                {productDetails.discount_percentage ? (
                  <span className="text-secondary line-through">
                    {productDetails.price} EGP
                  </span>
                ) : (
                  <span>{productDetails.price} EGP</span>
                )}
              </p>
              {productDetails.discount_percentage && (
                <>
                  <p>discount: {productDetails.discount_percentage}%</p>
                  <p>final price: {productDetails.discounted_price} EGP</p>
                </>
              )}
            </div>
            <div className="flex gap-8 my-4">
              <div>
                <p className="mb-1">size</p>
                <div className="flex gap-4 flex-wrap">
                  {sizes.length === 1 ? (
                    <div className="py-2 w-12 text-sm text-center text-black border border-black cursor-default">
                      {sizes[0]}
                    </div>
                  ) : (
                    sizes.map((size) => (
                      <label
                        key={size}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          className="hidden peer"
                        />
                        <div className="py-2 w-12 text-sm text-center text-lightblack border border-lightblack peer-checked:border-2 peer-checked:border-black peer-checked:text-black transition duration-300 ease-in-out delay-150">
                          {size}
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>
              <div>
                <p className="mb-1">color</p>
                <div className="flex gap-4 flex-wrap">
                  {colors.length === 1 ? (
                    <div
                      className="w-8 h-8 rounded-full border-2 border-black"
                      style={{ backgroundColor: colors[0].color }}
                      title={colors[0].name}
                    />
                  ) : (
                    colors.map((color, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="color"
                          value={color.name}
                          className="hidden peer"
                        />
                        <div
                          className="w-8 h-8 rounded-full border border-gray-300 peer-checked:border-2 peer-checked:border-black transition-all"
                          style={{ backgroundColor: color.color }}
                          title={color.name}
                        />
                      </label>
                    ))
                  )}
                </div>
              </div>
            </div>
            <p> stock: {productDetails.stock} items</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
