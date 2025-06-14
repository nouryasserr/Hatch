import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { StartupContext } from "../../../context/Startup.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Request() {
  const navigate = useNavigate();
  const { token } = useContext(StartupContext);

  const validate = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be at least 1"),
    notes: Yup.string(),
    description: Yup.string()
      .required("Description is required")
      .min(3, "Description must be at least 3 characters"),
    delivery_date: Yup.string()
      .required("Delivery date is required")
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "Delivery date must be in format YYYY-MM-DD"
      ),
    image: Yup.mixed().required("Image is required"),
  });

  async function sendDataToApi(values) {
    const loadingToastId = toast.loading("Creating request...");
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("quantity", values.quantity);
      formData.append("notes", values.notes);
      formData.append("description", values.description);
      formData.append("delivery_date", values.delivery_date);
      formData.append("image", values.image);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/startup/request",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.dismiss(loadingToastId);
        toast.success("Request created successfully!");
        navigate("/Startup/Factories");
      } else {
        throw new Error(response.data.message || "Failed to create request");
      }
    } catch (error) {
      console.error("Error creating request:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create request";
      toast.dismiss(loadingToastId);
      toast.error(errorMessage);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      notes: "",
      description: "",
      delivery_date: "",
      image: null,
    },
    validationSchema: validate,
    onSubmit: sendDataToApi,
  });

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div>
          <h2 className="text-3xl mb-0.5">send request to factory</h2>
          <p className="text-lightblack text-sm">
            fill in the details below to send a request for product
            manufacturing
          </p>
        </div>
        <div className="my-4">
          <h4 className="text-xl mb-0.5">request details</h4>
          <p className="text-lightblack text-sm">
            tell us more about what you need
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="flex items-start gap-2 mb-2">
              <span className="text-lg">name</span>
              <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="enter name"
              name="name"
              id="name"
              className={`border ${
                formik.touched.name && formik.errors.name
                  ? "border-secondary"
                  : "border-blackmuted"
              } px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-secondary text-xs mt-1">
                {formik.errors.name}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="flex items-start gap-2 mb-2">
              <span className="text-lg">quantity</span>
              <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
            </label>
            <input
              type="number"
              autoComplete="on"
              placeholder="enter quantity"
              name="quantity"
              id="quantity"
              className={`border ${
                formik.touched.quantity && formik.errors.quantity
                  ? "border-secondary"
                  : "border-blackmuted"
              } px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
            />
            {formik.touched.quantity && formik.errors.quantity && (
              <p className="text-secondary text-xs mt-1">
                {formik.errors.quantity}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="notes" className="flex items-start gap-2 mb-2">
              <span className="text-lg">notes</span>
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="enter notes (optional)"
              name="notes"
              id="notes"
              className={`border ${
                formik.touched.notes && formik.errors.notes
                  ? "border-secondary"
                  : "border-blackmuted"
              } px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.notes}
            />
            {formik.touched.notes && formik.errors.notes && (
              <p className="text-secondary text-xs mt-1">
                {formik.errors.notes}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="flex items-start gap-2 mb-2"
            >
              <span className="text-lg">description</span>
              <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="enter description"
              name="description"
              id="description"
              className={`border ${
                formik.touched.description && formik.errors.description
                  ? "border-secondary"
                  : "border-blackmuted"
              } px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-secondary text-xs mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="delivery_date"
              className="flex items-start gap-2 mb-2"
            >
              <span className="text-lg">delivery date</span>
              <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
            </label>
            <input
              type="date"
              autoComplete="on"
              placeholder="2025-07-09"
              id="delivery_date"
              name="delivery_date"
              className={`border ${
                formik.touched.delivery_date && formik.errors.delivery_date
                  ? "border-secondary"
                  : "border-blackmuted"
              } px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.delivery_date}
            />
            {formik.touched.delivery_date && formik.errors.delivery_date && (
              <p className="text-secondary text-xs mt-1">
                {formik.errors.delivery_date}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="flex items-start gap-2 mb-2">
              <span className="text-lg">image</span>
              <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
            </label>
            <input
              type="file"
              autoComplete="on"
              id="image"
              name="image"
              className={`border ${
                formik.touched.image && formik.errors.image
                  ? "border-secondary"
                  : "border-blackmuted"
              } px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full`}
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-secondary text-xs mt-1">
                {formik.errors.image}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`w-full mt-4 ${
              formik.isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:border-black hover:bg-transparent hover:text-black"
            } rounded-full py-1.5 px-6 text-white border border-primary transition duration-300 ease-in-out delay-150`}
          >
            {formik.isSubmitting ? "Sending..." : "send request"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Request;
