import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FactoryContext } from "../../../context/Factory.context";
function SendOffer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(FactoryContext);

  const validate = Yup.object({
    description: Yup.string()
      .required("Description is required")
      .min(3, "Description must be at least 3 characters"),
    price: Yup.string().required("Price is required"),
    image: Yup.mixed().required("Image is required"),
  });

  async function sendDataToApi(values) {
    const loadingToastId = toast.loading("Creating request...");
    try {
      const formData = new FormData();
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("image", values.image);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/factory/response/send-offer/${id}`,
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
        toast.success("Offer sent successfully!");
        navigate("/Factory/StartupRequests");
      } else {
        throw new Error(response.data.message || "Failed to send offer");
      }
    } catch (error) {
      console.error("Error creating request:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to send offer";
      toast.dismiss(loadingToastId);
      toast.error(errorMessage);
    }
  }

  const formik = useFormik({
    initialValues: {
      description: "",
      price: "",
      image: null,
    },
    validationSchema: validate,
    onSubmit: sendDataToApi,
  });
  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div>
          <h2 className="text-3xl mb-0.5">send offer to startup</h2>
          <p className="text-lightblack text-sm">
            respond to this request by sendind your offer details
          </p>
        </div>
        <div className="my-4">
          <h4 className="text-xl mb-0.5">offer details</h4>
          <p className="text-lightblack text-sm">
            provide your core offer details
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
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
              placeholder="any notes or details about your offer"
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
            <label htmlFor="price" className="flex items-start gap-2 mb-2">
              <span className="text-lg">offer price per unit</span>
              <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="enter offer price"
              id="price"
              name="price"
              className={`border ${
                formik.touched.price && formik.errors.price
                  ? "border-secondary"
                  : "border-blackmuted"
              } px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-secondary text-xs mt-1">
                {formik.errors.price}
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
            {formik.isSubmitting ? "Sending..." : "send offer"}
          </button>
        </form>
      </div>
    </>
  );
}

export default SendOffer;
