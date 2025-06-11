import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { StartupContext } from "../../context/Startup.context";
import axios from "axios";
import toast from "react-hot-toast";

function StartupProduct({ product, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { token } = useContext(StartupContext);

  if (!product) return null;

  const { name, price, stock, sub_category, images } = product;

  const mainImage = images?.find((img) => img.is_main) || images?.[0];
  const imageUrl = mainImage
    ? `http://127.0.0.1:8000/${mainImage.url}`
    : "https://placehold.co/200x200?text=Product+Image";

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/startup/products/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Product deleted successfully");
        onDelete(product.id);
      } else {
        throw new Error(response.data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="w-64 overflow-hidden">
        <Link to={`/Startup/ProductDetail/${product.id}`}>
          <div className="h-52 w-full">
            <img
              src={imageUrl}
              alt={name}
              className="object-cover object-center h-full w-full rounded-t"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/250x200?text=Product+Image";
                e.target.className =
                  "object-contain object-center h-full w-full rounded-t";
              }}
            />
          </div>
        </Link>
        <div className="flex justify-between px-1.5 py-2">
          <p className="text-xs text-lightblack">
            category: {sub_category?.category?.name || "no category"}
          </p>
          <p className="text-xs text-lightblack">quantity: {stock}</p>
        </div>
        <div className="px-1.5">
          <div className="flex justify-between gap-4">
            <h4 className="text-xl font-medium line-clamp-1">{name}</h4>
            <h5 className="text-lightblack text-lg text-nowrap">{price} EGP</h5>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`px-1.5 text-sm text-secondary underline hover:no-underline transition duration-300 ease-in-out delay-150 ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isDeleting ? "Deleting..." : "delete product"}
        </button>
      </div>
    </>
  );
}

export default StartupProduct;
