import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StartupContext } from "../../../context/Startup.context";
import Loader from "../../../components/Loader/Loader";
import toast from "react-hot-toast";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { token } = useContext(StartupContext);

  useEffect(() => {
    let mounted = true;

    const fetchProductDetails = async () => {
      if (!token) {
        navigate("/Startup/Login");
        return;
      }

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
          if (response.data.success) {
            setProductDetails(response.data.data);
            const mainImage =
              response.data.data.images.find((img) => img.is_main) ||
              response.data.data.images[0];
            setSelectedImage(mainImage);
          } else {
            throw new Error(
              response.data.message || "Failed to fetch product details"
            );
          }
        }
      } catch (error) {
        if (mounted) {
          console.error("Error fetching product details:", error);

          if (error.response?.status === 401) {
            toast.error("Please login to view product details");
            navigate("/Startup/Login");
            return;
          }

          if (error.response?.status === 403) {
            setError(
              "Access denied: Your package does not allow this action. Please upgrade your package to access this feature."
            );
          } else if (error.response?.status === 404) {
            setError(
              "Product not found. It may have been deleted or you don't have permission to view it."
            );
          } else if (error.response?.status === 422) {
            setError(
              "Access denied: Your package does not allow this action. Please upgrade your package to access this feature."
            );
          } else {
            setError(
              error.response?.data?.message ||
                "Failed to load product details. Please try again later."
            );
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProductDetails();

    return () => {
      mounted = false;
    };
  }, [token, id, navigate]);

  if (loading) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6 min-h-screen">
        <div className="flex flex-col items-center justify-center text-center p-8">
          <div className="text-secondary text-lg mb-4">{error}</div>
          {(error.includes("package") || error.includes("Access denied")) && (
            <Link
              to="/user/packages"
              className="border border-black p-2 px-4 flex items-center gap-2 h-fit hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150"
            >
              <i className="fa-solid fa-arrow-up"></i>
              <span>Upgrade Package</span>
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6 min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">
          No product details found. Please try again later.
        </div>
      </div>
    );
  }

  const sizes = productDetails.sizes.map((size) => size.size.name);
  const colors = productDetails.sizes.map((size) => ({
    name: size.color.name,
    color: size.color.code || "#000000",
  }));

  const getImageUrl = (image) => {
    return image?.url
      ? `http://127.0.0.1:8000/${image.url}`
      : "https://placehold.co/300x350?text=Product+Image";
  };

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
          <Link
            to={`/Startup/EditProduct/${productDetails.id}`}
            className="border border-black p-2 px-4 flex items-center gap-2 h-fit hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150"
          >
            <i className="fa-regular fa-pen-to-square"></i>
            <span>Edit</span>
          </Link>
        </div>
        <div className="flex mt-6 justify-between gap-8 flex-col lg:flex-row">
          <div className="lg:w-1/3">
            <div className="mb-4">
              <img
                src={getImageUrl(selectedImage)}
                alt={productDetails.name}
                className="w-full h-[350px] object-contain rounded-lg border border-gray-200"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/300x350?text=Product+Image";
                }}
              />
            </div>
            {productDetails.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {productDetails.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className={`relative h-20 border rounded-md overflow-hidden ${
                      selectedImage?.id === image.id
                        ? "border-primary"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`${productDetails.name} ${index + 1}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/300x350?text=Product+Image";
                      }}
                    />
                    {image.is_main && (
                      <div className="absolute top-0 right-0 bg-primary text-white text-xs px-1 rounded-bl">
                        Main
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
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
                      <div
                        key={size}
                        className="py-2 w-12 text-sm text-center text-black border border-black cursor-default"
                      >
                        {size}
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div>
                <p className="mb-1">color</p>
                <div className="flex gap-4 flex-wrap">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="py-2 px-4 text-sm text-center text-black border border-black cursor-default"
                    >
                      {color.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="mb-1">stock</p>
              <div className="flex gap-4 flex-wrap">
                <div className="py-2 px-4 text-sm text-center text-black border border-black cursor-default">
                  {productDetails.stock} pieces
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
