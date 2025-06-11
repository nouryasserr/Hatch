import { NavLink } from "react-router-dom";
import StartupProduct from "../../../components/StartupProduct/StartupProduct";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import { StartupContext } from "../../../context/Startup.context";
import toast from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(StartupContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/startup/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          throw new Error(response.data.message || "Failed to fetch products");
        }
      } catch (err) {
        const errorMessage =
          err.response?.status === 422
            ? "Access denied: Your package does not allow this action. Please upgrade your package to access this feature."
            : err.response?.data?.message || err.message;
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProducts();
    }
  }, [token]);

  const handleProductDelete = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  if (loading) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="flex flex-col items-center justify-center text-center p-8">
          <div className="text-secondary text-lg mb-4">{error}</div>
          {error.includes("package") && (
            <NavLink
              to="/user/packages"
              className="border border-black p-2 px-4 flex items-center gap-2 h-fit hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150"
            >
              <i className="fa-solid fa-arrow-up"></i>
              <span>Upgrade Package</span>
            </NavLink>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="mb-4 flex flex-col xs:flex-row justify-between xs:items-center">
          <div className="mb-4 xs:mb-0">
            <h2 className="text-3xl mb-0.5">products</h2>
            <p className={"text-lightblack text-sm"}>
              available for sale {products.length} products
            </p>
          </div>
          <NavLink
            to={"/Startup/AddProduct"}
            className={
              "self-end xs:self-auto bg-primary rounded-full py-1.5 px-6 text-white border border-primary hover:border-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
            }
          >
            add new product
          </NavLink>
        </div>
        <div className="flex gap-4 flex-wrap">
          {products.map((product) => (
            <StartupProduct
              key={product.id}
              product={product}
              onDelete={handleProductDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
