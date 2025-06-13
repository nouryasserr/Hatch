import { NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../../../context/Admin.context";
import Loader from "../../../components/Loader/Loader";

function AllCategories() {
  const { token } = useContext(AdminContext);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, subcategoriesRes] = await Promise.all([
        axios.get(
          "http://127.0.0.1:8000/api/admin/category/?sort_by=id&sort_direction=asc",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        axios.get(
          "http://127.0.0.1:8000/api/admin/subcategory/?sort_by=id&sort_direction=asc",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ]);
      setCategories(categoriesRes.data.data || []);
      setSubcategories(subcategoriesRes.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to fetch data. Please try again later.");
      setCategories([]);
      setSubcategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      setLoading(true);
      await axios.delete(`http://127.0.0.1:8000/api/admin/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error("Failed to delete category:", err);
      setError("Failed to delete category. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubcategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?"))
      return;

    try {
      setLoading(true);
      await axios.delete(`http://127.0.0.1:8000/api/admin/subcategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubcategories(subcategories.filter((subcat) => subcat.id !== id));
    } catch (err) {
      console.error("Failed to delete subcategory:", err);
      setError("Failed to delete subcategory. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <p className="text-secondary">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div>
          <h1 className="text-2xl xs:text-4xl">categories & subcategories</h1>
          <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
            manage all categories classifications
          </p>
        </div>
        <div className="mt-8 mb-4 gap-4 flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="mb-4 xs:mb-0">
            <h2 className="text-2xl xs:text-3xl mb-0.5">categories</h2>
            <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
              list of all categories with basic info and quick actions
            </p>
          </div>
          <NavLink
            to={"/Admin/AddCategory"}
            className={
              "self-end xs:self-auto bg-primary rounded-full py-1.5 px-6 text-white border border-primary hover:border-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
            }
          >
            add new category
          </NavLink>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] grid grid-cols-5 items-center gap-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                category id
              </span>
              <span className="col-span-2 text-sm whitespace-nowrap text-lightblack">
                category name
              </span>
              <span className="col-span-2 text-sm whitespace-nowrap text-lightblack">
                actions
              </span>
            </div>
            {categories.length === 0 ? (
              <p className="text-sm mt-4">No categories found.</p>
            ) : (
              categories.map((category, index) => (
                <div
                  key={category.id}
                  className="min-w-[600px] grid grid-cols-5 items-center gap-4 mt-3"
                >
                  <span className="text-sm whitespace-nowrap">{index + 1}</span>
                  <span className="col-span-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {category.name}
                  </span>
                  <div className="flex gap-6 col-span-2">
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-sm whitespace-nowrap bg-secondary text-white rounded-sm py-1 px-4 border border-lightblack hover:bg-transparent hover:text-black transition duration-300"
                    >
                      delete
                    </button>
                    <NavLink
                      to={`/Admin/EditCategory/${category.id}`}
                      className="text-sm whitespace-nowrap underline hover:no-underline transition"
                    >
                      edit
                    </NavLink>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="mt-8 mb-4 gap-4 flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="mb-4 xs:mb-0">
            <h2 className="text-2xl xs:text-3xl mb-0.5">subcategories</h2>
            <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
              list of all subcategories with basic info and quick actions
            </p>
          </div>
          <NavLink
            to={"/Admin/AddSubCategory"}
            className={
              "self-end xs:self-auto bg-primary rounded-full py-1.5 px-6 text-white border border-primary hover:border-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
            }
          >
            add new subcategory
          </NavLink>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] grid grid-cols-8 items-center gap-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                subcategory id
              </span>
              <span className="col-span-2 text-sm whitespace-nowrap text-lightblack">
                subcategory name
              </span>
              <span className="col-span-2 text-sm whitespace-nowrap text-lightblack">
                category name
              </span>
              <span className="col-span-2 text-sm whitespace-nowrap text-lightblack">
                actions
              </span>
            </div>
            {subcategories.length === 0 ? (
              <p className="text-sm mt-4">No subcategories found.</p>
            ) : (
              subcategories.map((subcategory, index) => (
                <div
                  key={subcategory.id}
                  className="min-w-[600px] grid grid-cols-8 items-center gap-4 mt-3"
                >
                  <span className="text-sm whitespace-nowrap">{index + 1}</span>
                  <span className="col-span-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {subcategory.name}
                  </span>
                  <span className="col-span-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {subcategory.category?.name}
                  </span>
                  <div className="flex gap-6 col-span-2">
                    <button
                      onClick={() => handleDeleteSubcategory(subcategory.id)}
                      className="text-sm whitespace-nowrap bg-secondary text-white rounded-sm py-1 px-4 border border-lightblack hover:bg-transparent hover:text-black transition duration-300"
                    >
                      delete
                    </button>
                    <NavLink
                      to={`/Admin/EditSubCategory/${subcategory.id}`}
                      className="text-sm whitespace-nowrap underline hover:no-underline transition"
                    >
                      edit
                    </NavLink>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllCategories;
