import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StartupContext } from "../../../context/Startup.context";
import axios from "axios";
import toast from "react-hot-toast";

function AddProduct() {
  const navigate = useNavigate();
  const { token } = useContext(StartupContext);
  const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState("");
  const [editingSize, setEditingSize] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/Startup/Login");
      return;
    }
    fetchSizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  const fetchSizes = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/startup/sizes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setSizes(response.data.data.sizes);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch sizes");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSize = async (e) => {
    e.preventDefault();
    if (!newSize.trim()) {
      toast.error("Please enter a size");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/startup/sizes",
        { sizes: [newSize] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success("Size added successfully");
        setNewSize("");
        fetchSizes();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add size");
    }
  };

  const handleDeleteSize = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/startup/sizes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success("Size deleted successfully");
        fetchSizes();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete size");
    }
  };

  const handleUpdateSize = async (id, newValue) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/startup/sizes/${id}`,
        {
          size: newValue,
          _method: "put",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success("Size updated successfully");
        setEditingSize(null);
        fetchSizes();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update size");
    }
  };

  if (loading) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div>
          <h2 className="text-3xl mb-0.5">add New Product</h2>
          <p className="text-lightblack text-sm">
            Let's bring your product to life!
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="w-full lg:w-3/4">
            <div className="mb-4 mt-8">
              <h4 className="text-xl mb-0.5">Does this product have sizes?</h4>
              <p className="text-lightblack text-sm">
                If yes, you'll be able to add and manage each variant. If not,
                you can skip this step.
              </p>
            </div>
            <form onSubmit={handleAddSize}>
              <div className="xs:w-2/3">
                <div className="w-full mb-4">
                  <label htmlFor="size" className="flex items-start gap-2 mb-2">
                    <span className="text-lg">Size</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    placeholder="Enter size"
                    name="size"
                    id="size"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  [<i className="fa-solid fa-plus"></i>
                  <span>Add Size</span>]
                </button>

                {sizes.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-lg mb-2">Added Sizes:</h5>
                    <div className="space-y-2">
                      {sizes.map((size) => (
                        <div
                          key={size.id}
                          className="flex items-center justify-between gap-4 border-b pb-2"
                        >
                          {editingSize === size.id ? (
                            <input
                              type="text"
                              defaultValue={size.size}
                              className="border px-2 py-1 focus:outline-none focus:border-none"
                              onBlur={(e) =>
                                handleUpdateSize(size.id, e.target.value)
                              }
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleUpdateSize(size.id, e.target.value);
                                }
                              }}
                              autoFocus
                            />
                          ) : (
                            <span
                              className="cursor-pointer"
                              onClick={() => setEditingSize(size.id)}
                            >
                              {size.size}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteSize(size.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link
                to="/Startup/AddProduct2"
                className={
                  "w-full xs:w-2/3 block text-center mt-8 bg-primary rounded-full py-1.5 px-6 text-white border border-primary hover:border-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
                }
              >
                Next
              </Link>
              <Link
                to="/Startup/AddProduct2"
                className="w-full xs:w-2/3 block text-center mt-4 underline hover:no-underline transition duration-300 ease-in-out delay-150"
              >
                Skip & Next
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
