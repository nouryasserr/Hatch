import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { StartupContext } from "../../../context/Startup.context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

function Settings() {
  const { token } = useContext(StartupContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    description: Yup.string().required("Description is required"),
    "social_media_links[Facebook]": Yup.string().url("Invalid Facebook URL"),
    "social_media_links[Instagram]": Yup.string().url("Invalid Instagram URL"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      description: "",
      "social_media_links[Facebook]": "",
      "social_media_links[Instagram]": "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const loadingToast = toast.loading("Updating profile...");
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/startup/profile",
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error(
          error.response?.data?.message || "Failed to update profile"
        );
      } finally {
        toast.dismiss(loadingToast);
      }
    },
  });

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    ) {
      const loadingToast = toast.loading("Deleting profile...");
      try {
        const response = await axios.delete(
          "http://127.0.0.1:8000/api/startup/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          toast.success("Profile deleted successfully");
          navigate("/Auth/Signin");
        }
      } catch (error) {
        console.error("Error deleting profile:", error);
        toast.error(
          error.response?.data?.message || "Failed to delete profile"
        );
      } finally {
        toast.dismiss(loadingToast);
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/startup/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          const { startup } = response.data.data;
          formik.setValues({
            name: startup.name || "",
            email: startup.email || "",
            phone: startup.phone || "",
            description: startup.description || "",
            "social_media_links[Facebook]":
              startup.social_media_links?.Facebook || "",
            "social_media_links[Instagram]":
              startup.social_media_links?.Instagram || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full lg:w-5/6 float-end px-8 py-6">
      <div>
        <h2 className="text-3xl mb-0.5">settings</h2>
        <p className="text-lightblack text-sm">
          manage your startup profile settings
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="mt-8">
        <div className="mb-4">
          <label htmlFor="name" className="flex items-start gap-2 mb-2">
            <span className="text-lg">startup name</span>
            <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter startup name"
            className={`border ${
              formik.touched.name && formik.errors.name
                ? "border-secondary"
                : "border-blackmuted"
            } px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full`}
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-secondary text-xs mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="flex items-start gap-2 mb-2">
            <span className="text-lg">email</span>
            <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            className={`border ${
              formik.touched.email && formik.errors.email
                ? "border-secondary"
                : "border-blackmuted"
            } px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full`}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-secondary text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="flex items-start gap-2 mb-2">
            <span className="text-lg">phone</span>
            <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter phone number"
            className={`border ${
              formik.touched.phone && formik.errors.phone
                ? "border-secondary"
                : "border-blackmuted"
            } px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full`}
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-secondary text-xs mt-1">{formik.errors.phone}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="flex items-start gap-2 mb-2">
            <span className="text-lg">description</span>
            <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter startup description"
            className={`border ${
              formik.touched.description && formik.errors.description
                ? "border-secondary"
                : "border-blackmuted"
            } px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full min-h-[100px]`}
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-secondary text-xs mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="social_media_links[Facebook]"
            className="flex items-start gap-2 mb-2"
          >
            <span className="text-lg">facebook link</span>
          </label>
          <input
            type="text"
            id="social_media_links[Facebook]"
            name="social_media_links[Facebook]"
            placeholder="Enter Facebook URL"
            className={`border ${
              formik.touched["social_media_links[Facebook]"] &&
              formik.errors["social_media_links[Facebook]"]
                ? "border-secondary"
                : "border-blackmuted"
            } px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full`}
            {...formik.getFieldProps("social_media_links[Facebook]")}
          />
          {formik.touched["social_media_links[Facebook]"] &&
            formik.errors["social_media_links[Facebook]"] && (
              <p className="text-secondary text-xs mt-1">
                {formik.errors["social_media_links[Facebook]"]}
              </p>
            )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="social_media_links[Instagram]"
            className="flex items-start gap-2 mb-2"
          >
            <span className="text-lg">instagram link</span>
          </label>
          <input
            type="text"
            id="social_media_links[Instagram]"
            name="social_media_links[Instagram]"
            placeholder="Enter Instagram URL"
            className={`border ${
              formik.touched["social_media_links[Instagram]"] &&
              formik.errors["social_media_links[Instagram]"]
                ? "border-secondary"
                : "border-blackmuted"
            } px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full`}
            {...formik.getFieldProps("social_media_links[Instagram]")}
          />
          {formik.touched["social_media_links[Instagram]"] &&
            formik.errors["social_media_links[Instagram]"] && (
              <p className="text-secondary text-xs mt-1">
                {formik.errors["social_media_links[Instagram]"]}
              </p>
            )}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`${
              formik.isSubmitting
                ? "bg-gray-400"
                : "bg-primary hover:bg-transparent hover:text-black"
            } text-white border border-primary py-2 px-6 transition duration-300 ease-in-out delay-150`}
          >
            {formik.isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-secondary text-white border border-secondary py-2 px-6 hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
          >
            Delete Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
