import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AdminContext } from "../../../context/Admin.context";

function EditSubCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AdminContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subcategory, setSubcategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [subcategoryRes, categoriesRes] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/admin/subcategory/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(
            "http://127.0.0.1:8000/api/admin/category/?sort_by=id&sort_direction=asc",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);
        setSubcategory(subcategoryRes.data.data);
        setCategories(categoriesRes.data.data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to fetch data. Please try again.");
        setSubcategory(null);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [id, token]);

  const formik = useFormik({
    initialValues: {
      name: subcategory?.name || "",
      category_id: subcategory?.category_id || "",
      image: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Subcategory name is required")
        .min(2, "Subcategory name must be at least 2 characters")
        .max(50, "Subcategory name must be at most 50 characters"),
      category_id: Yup.string().required("Category is required"),
      image: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("category_id", values.category_id);
        if (values.image) {
          formData.append("image", values.image);
        }
        formData.append("_method", "put");

        await axios.post(
          `http://127.0.0.1:8000/api/admin/subcategory/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        navigate("/Admin/AllCategories");
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to update subcategory. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);
  };

  const handleRemoveFile = () => {
    formik.setFieldValue("image", null);
  };

  if (loading) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <p className="text-secondary">{error}</p>
      </div>
    );
  }

  if (!subcategory) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <p>Subcategory not found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div>
          <h1 className="text-2xl xs:text-4xl">edit subcategory</h1>
          <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
            manage all categories classifications
          </p>
        </div>
        <form className="mt-8" onSubmit={formik.handleSubmit}>
          <div className="xs:w-2/3">
            <div className="w-full mb-4">
              <label
                htmlFor="category_id"
                className="flex items-start gap-2 mb-2"
              >
                <span className="text-lg">select category</span>
                <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
              </label>
              <select
                {...formik.getFieldProps("category_id")}
                className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {formik.touched.category_id && formik.errors.category_id && (
                <p className="text-secondary text-sm mt-1">
                  {formik.errors.category_id}
                </p>
              )}
            </div>
            <div className="w-full mb-4">
              <label htmlFor="name" className="flex items-start gap-2 mb-2">
                <span className="text-lg">subcategory name</span>
                <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
              </label>
              <input
                type="text"
                autoComplete="on"
                placeholder="enter subcategory name"
                {...formik.getFieldProps("name")}
                className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-secondary text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div className="w-full mb-4">
              <label htmlFor="logo" className="flex items-start gap-2">
                <span className="text-lg">upload logo</span>
                {!subcategory?.image && (
                  <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                )}
              </label>
              <p className="text-xs text-lightgray mb-4">
                make sure your logo is clear and high quality
              </p>
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center h-80 w-full border border-blackmuted text-black text-center cursor-pointer"
              >
                <svg
                  className="w-16 h-16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 19V12M12 12L9.75 14.3333M12 12L14.25 14.3333M6.6 17.8333C4.61178 17.8333 3 16.1917 3 14.1667C3 12.498 4.09438 11.0897 5.59198 10.6457C5.65562 10.6268 5.7 10.5675 5.7 10.5C5.7 7.46243 8.11766 5 11.1 5C14.0823 5 16.5 7.46243 16.5 10.5C16.5 10.5582 16.5536 10.6014 16.6094 10.5887C16.8638 10.5306 17.1284 10.5 17.4 10.5C19.3882 10.5 21 12.1416 21 14.1667C21 16.1917 19.3882 17.8333 17.4 17.8333"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span className="underline text-sm xs:text-base">
                  drop files here or click to upload
                </span>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {(formik.values.image || subcategory?.image) && (
                <div className="text-sm flex items-center justify-between gap-4 flex-wrap mt-4">
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-paperclip"></i>
                    {formik.values.image
                      ? formik.values.image.name
                      : "Current logo"}
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-secondary underline hover:no-underline"
                  >
                    remove file
                  </button>
                </div>
              )}
              {formik.touched.image && formik.errors.image && (
                <p className="text-secondary text-sm mt-1">
                  {formik.errors.image}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary rounded-full py-1.5 px-6 text-white border border-primary hover:border-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
          <Link
            to="/Admin/AllCategories"
            className="w-full xs:w-2/3 block text-center mt-4 underline hover:no-underline transition duration-300 ease-in-out delay-150"
          >
            cancel
          </Link>
        </form>
      </div>
    </>
  );
}

export default EditSubCategory;
