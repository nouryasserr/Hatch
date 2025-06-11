import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { StartupContext } from "../../../context/Startup.context";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(StartupContext);
  const [images, setImages] = useState([null, null, null, null]);
  const [imageFiles, setImageFiles] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/Startup/Login");
      return;
    }
    fetchSizes();
    fetchSubCategories();
    fetchProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate, id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/startup/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const productData = response.data.data;

        // Set existing images with full URLs
        const existingImages = productData.images.map((img) => ({
          url: `http://127.0.0.1:8000/${img.url}`,
          is_main: img.is_main,
        }));

        // Sort images to ensure main image is first
        existingImages.sort(
          (a, b) => (b.is_main ? 1 : 0) - (a.is_main ? 1 : 0)
        );

        // Set images array with URLs
        setImages(
          existingImages
            .map((img) => img.url)
            .concat(Array(4 - existingImages.length).fill(null))
        );

        // Set form initial values
        formik.setValues({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          stock: productData.stock,
          sub_category_id: productData.sub_category.id,
          discount_percentage: productData.discount_percentage || "",
          has_sizes: productData.sizes.length > 0,
          colors:
            productData.sizes.length > 0
              ? [{ name: productData.sizes[0].color.name }]
              : [{ name: "" }],
          sizes:
            productData.sizes.length > 0
              ? [
                  {
                    color_index: 0,
                    size_id: productData.sizes[0].size.id,
                    price: productData.sizes[0].price,
                    stock: productData.sizes[0].stock,
                  },
                ]
              : [{ color_index: 0, size_id: "", price: "", stock: "" }],
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch product details"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/general/subcategory"
      );
      if (response.data.success) {
        setSubCategories(response.data.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  };

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
        setAvailableSizes(response.data.data.sizes);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch sizes");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    stock: Yup.number()
      .required("Stock is required")
      .integer("Stock must be an integer")
      .min(0, "Stock cannot be negative"),
    sub_category_id: Yup.number().required("Category is required"),
    discount_percentage: Yup.number()
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100%")
      .nullable(),
    has_sizes: Yup.boolean(),
    colors: Yup.array().when("has_sizes", {
      is: true,
      then: () =>
        Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required("Color is required"),
          })
        ),
      otherwise: () => Yup.array(),
    }),
    sizes: Yup.array().when("has_sizes", {
      is: true,
      then: () =>
        Yup.array().of(
          Yup.object().shape({
            size_id: Yup.number().required("Size is required"),
            price: Yup.number()
              .required("Variant price is required")
              .positive("Price must be positive"),
            stock: Yup.number()
              .required("Variant stock is required")
              .integer("Stock must be an integer")
              .min(0, "Stock cannot be negative"),
          })
        ),
      otherwise: () => Yup.array(),
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      sub_category_id: "",
      discount_percentage: "",
      has_sizes: false,
      colors: [{ name: "" }],
      sizes: [{ color_index: 0, size_id: "", price: "", stock: "" }],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        // Add method override for PUT request
        formData.append("_method", "put");

        // Add basic product information
        formData.append("name", values.name.trim());
        formData.append("description", values.description.trim());
        formData.append("price", values.price);
        formData.append("stock", values.stock);
        formData.append("sub_category_id", values.sub_category_id);
        formData.append("has_sizes", values.has_sizes ? "1" : "0");

        // Handle discount percentage
        if (
          values.discount_percentage !== "" &&
          values.discount_percentage !== null
        ) {
          formData.append("discount_percentage", values.discount_percentage);
        }

        // Handle images
        const existingImages = images
          .filter((img) => img && !img.startsWith("blob:"))
          .map((img) => img.replace("http://127.0.0.1:8000/", ""));

        const newImages = imageFiles.filter(Boolean);

        // Create an array to hold all image data
        const imagesData = [];

        // Add existing images to array
        existingImages.forEach((url) => {
          imagesData.push({
            url,
            is_main: imagesData.length === 0 ? 1 : 0,
          });
        });

        // Add new images to array as null URLs (will be replaced with files)
        newImages.forEach(() => {
          imagesData.push({
            url: null,
            is_main: imagesData.length === 0 ? 1 : 0,
          });
        });

        // Add the images data structure
        imagesData.forEach((img, index) => {
          if (img.url) {
            formData.append(`images[${index}][url]`, img.url);
          } else {
            formData.append(
              `images[${index}][file]`,
              newImages[index - existingImages.length]
            );
          }
          formData.append(`images[${index}][is_main]`, img.is_main);
        });

        // If no images, send empty array
        if (imagesData.length === 0) {
          formData.append("images", "[]");
        }

        // Log formData contents for debugging
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        const response = await axios.post(
          `http://127.0.0.1:8000/api/startup/products/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          }
        );

        if (response.data.success) {
          toast.success("Product updated successfully!");
          navigate("/Startup/Products");
        } else {
          throw new Error(response.data.message || "Failed to update product");
        }
      } catch (error) {
        console.error("API Error:", error.response?.data);

        let errorMessage = "Failed to update product";

        if (error.response?.data) {
          if (typeof error.response.data === "string") {
            errorMessage = error.response.data;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data.errors) {
            if (Array.isArray(error.response.data.errors)) {
              errorMessage = error.response.data.errors[0];
            } else if (typeof error.response.data.errors === "object") {
              const firstError = Object.values(error.response.data.errors)[0];
              errorMessage = Array.isArray(firstError)
                ? firstError[0]
                : firstError;
            }
          }
        }

        toast.error(errorMessage);
      }
    },
  });

  const handleFileChange = (e, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload only image files");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    const newImages = [...images];
    const newImageFiles = [...imageFiles];

    if (index !== null) {
      newImages[index] = imageUrl;
      newImageFiles[index] = file;
    } else {
      const firstEmptyIndex = newImages.findIndex((img) => img === null);
      if (firstEmptyIndex === -1) {
        toast.error("Maximum 4 images allowed");
        return;
      }
      newImages[firstEmptyIndex] = imageUrl;
      newImageFiles[firstEmptyIndex] = file;
    }

    setImages(newImages);
    setImageFiles(newImageFiles);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newImageFiles = [...imageFiles];
    newImages[index] = null;
    newImageFiles[index] = null;
    setImages(newImages);
    setImageFiles(newImageFiles);
  };

  if (loading) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6 min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {" "}
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="mb-6">
          <h2 className="text-3xl mb-0.5">add new product</h2>
          <p className="text-lightblack text-sm">
            let's bring your product to life!
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="w-full lg:w-1/2">
              <div className="mb-4">
                <h4 className="text-xl mb-0.5">product details</h4>
                <p className="text-lightblack text-sm">
                  tell us more about your product
                </p>
              </div>
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="product-name"
                    className="flex items-start gap-2 mb-2"
                  >
                    <span className="text-lg">product name</span>
                    <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                  </label>
                  <input
                    type="text"
                    id="product-name"
                    name="name"
                    autoComplete="off"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                    placeholder="enter product name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.name}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="product-description"
                    className="flex items-start gap-2 mb-2"
                  >
                    <span className="text-lg">product description</span>
                    <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                  </label>
                  <input
                    type="text"
                    id="product-description"
                    name="description"
                    autoComplete="off"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                    placeholder="enter product description"
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.description}
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="product-category"
                    className="flex items-start gap-2 mb-2"
                  >
                    <span className="text-lg">category</span>
                    <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                  </label>
                  <select
                    id="product-category"
                    name="sub_category_id"
                    autoComplete="off"
                    value={formik.values.sub_category_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-blackmuted px-2 py-1.5 pb-2 focus:outline-none focus:border-2 w-full"
                  >
                    <option value="">Select category</option>
                    {subCategories.map((subcat) => (
                      <option key={subcat.id} value={subcat.id}>
                        {subcat.category.name} - {subcat.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.sub_category_id &&
                    formik.errors.sub_category_id && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.sub_category_id}
                      </div>
                    )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="discount_percentage"
                    className="flex items-start gap-2 mb-2"
                  >
                    <span className="text-lg">
                      discount percentage (optional)
                    </span>
                  </label>
                  <input
                    type="number"
                    id="discount_percentage"
                    name="discount_percentage"
                    autoComplete="off"
                    value={formik.values.discount_percentage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                    placeholder="enter discount percentage"
                    min="0"
                    max="100"
                    step="0.01"
                  />
                  {formik.touched.discount_percentage &&
                    formik.errors.discount_percentage && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.discount_percentage}
                      </div>
                    )}
                </div>
              </div>

              <div className="mb-2">
                <h4 className="text-xl mb-0.5">have sizes and colors?</h4>
              </div>
              <div
                className="flex gap-16 mb-8 text-lg"
                role="radiogroup"
                aria-label="Product has sizes and colors"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="has-sizes-yes"
                    name="has_sizes"
                    autoComplete="off"
                    checked={formik.values.has_sizes === true}
                    onChange={() => {
                      formik.setFieldValue("has_sizes", true);
                      formik.setFieldValue("colors[0].name", "");
                      formik.setFieldValue("sizes[0].size_id", "");
                      formik.setFieldValue("sizes[0].price", "");
                      formik.setFieldValue("sizes[0].stock", "");
                    }}
                  />
                  <label htmlFor="has-sizes-yes">yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="has-sizes-no"
                    name="has_sizes"
                    autoComplete="off"
                    checked={formik.values.has_sizes === false}
                    onChange={() => formik.setFieldValue("has_sizes", false)}
                  />
                  <label htmlFor="has-sizes-no">no</label>
                </div>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="w-full">
                    <label
                      htmlFor="product-price"
                      className="flex items-start gap-2 mb-2"
                    >
                      <span className="text-lg">price</span>
                      <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                    </label>
                    <input
                      type="number"
                      id="product-price"
                      name="price"
                      autoComplete="off"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                      placeholder="enter product price"
                    />
                    {formik.touched.price && formik.errors.price && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.price}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full mb-4">
                  <label
                    htmlFor="product-stock"
                    className="flex items-start gap-2 mb-2"
                  >
                    <span className="text-lg">stock</span>
                    <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                  </label>
                  <input
                    type="number"
                    id="product-stock"
                    name="stock"
                    autoComplete="off"
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                    placeholder="enter stock quantity"
                  />
                  {formik.touched.stock && formik.errors.stock && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.stock}
                    </div>
                  )}
                </div>

                {formik.values.has_sizes && (
                  <>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="w-full">
                        <label
                          htmlFor="product-size"
                          className="flex items-start gap-2 mb-2"
                        >
                          <span className="text-lg">size</span>
                          <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                        </label>
                        <select
                          id="product-size"
                          name="sizes[0].size_id"
                          autoComplete="off"
                          value={formik.values.sizes[0].size_id}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="border border-blackmuted px-2 py-1.5 pb-2 focus:outline-none focus:border-2 w-full"
                        >
                          <option value="">Select size</option>
                          {availableSizes.map((size) => (
                            <option key={size.id} value={size.id}>
                              {size.size}
                            </option>
                          ))}
                        </select>
                        {formik.touched.sizes?.[0]?.size_id &&
                          formik.errors.sizes?.[0]?.size_id && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.sizes[0].size_id}
                            </div>
                          )}
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="product-color"
                          className="flex items-start gap-2 mb-2"
                        >
                          <span className="text-lg">color</span>
                          <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                        </label>
                        <input
                          type="text"
                          id="product-color"
                          name="colors[0].name"
                          autoComplete="off"
                          value={formik.values.colors[0].name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                          placeholder="enter color name"
                        />
                        {formik.touched.colors?.[0]?.name &&
                          formik.errors.colors?.[0]?.name && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.colors[0].name}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="w-full">
                        <label
                          htmlFor="variant-price"
                          className="flex items-start gap-2 mb-2"
                        >
                          <span className="text-lg">variant price</span>
                          <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                        </label>
                        <input
                          type="number"
                          id="variant-price"
                          name="sizes[0].price"
                          autoComplete="off"
                          value={formik.values.sizes[0].price}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                          placeholder="enter variant price"
                        />
                        {formik.touched.sizes?.[0]?.price &&
                          formik.errors.sizes?.[0]?.price && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.sizes[0].price}
                            </div>
                          )}
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="variant-stock"
                          className="flex items-start gap-2 mb-2"
                        >
                          <span className="text-lg">variant stock</span>
                          <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                        </label>
                        <input
                          type="number"
                          id="variant-stock"
                          name="sizes[0].stock"
                          autoComplete="off"
                          value={formik.values.sizes[0].stock}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                          placeholder="enter variant stock"
                        />
                        {formik.touched.sizes?.[0]?.stock &&
                          formik.errors.sizes?.[0]?.stock && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.sizes[0].stock}
                            </div>
                          )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="mb-4">
                <h4 className="text-xl mb-0.5">product gallery</h4>
                <p className="text-lightblack text-sm">
                  upload stunning photos of your product
                </p>
              </div>
              <div>
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg">upload photos</span>
                  <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                </div>
                <div className="mb-4">
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
                        stroke="#404040"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <span className="text-blackmuted underline text-sm xs:text-base">
                      drop files here or click to upload
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e)}
                    />
                  </label>
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="w-full aspect-square border border-blackmuted flex items-center justify-center overflow-hidden bg-gray-100 relative"
                      >
                        {img ? (
                          <>
                            <img
                              src={img}
                              alt={`uploaded-${index}`}
                              className="object-cover w-full h-full"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-white text-red-500 border border-red-500 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                              title="Remove image"
                            >
                              ×
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-400">Empty</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full lg:w-1/4 bg-primary text-white py-2 rounded-full hover:bg-opacity-90 transition-all"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProduct;
