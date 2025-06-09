import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";
import { UserContext } from "../../../context/User.context";

function Registeration() {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const toastShown = useRef(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!token && !toastShown.current) {
      toast.error("You need to login first");
      toastShown.current = true;
      navigate("/Auth/Signin");
    }
  }, [token, navigate]);

  useEffect(() => {
    async function fetchCategoris() {
      try {
        const options = {
          url: "http://127.0.0.1:8000/api/general/subcategory",
          method: "GET",
        };
        let { data } = await axios(options);
        if (data) {
          setCategories(data.data);
        }
      } catch (error) {
        console.log("error in fetching categories", error);
        toast.error("Failed to fetch categories.");
      }
    }
    fetchCategoris();
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountExistsError, setAccountExistsError] = useState(null);
  const validate = object({
    name: string()
      .required("first name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    phone: string()
      .required("phone number is required")
      .matches(/^[0-9]{11}$/, "phone number must be 11 digits"),
    email: string().required("email is required").email("inavlid email"),
    password: string()
      .required("password is required")
      .min(8, "password must be at least 8 characters")
      .max(15, "password must be at most 15 characters"),
    password_confirmation: string()
      .required("confirm password is required")
      .oneOf([ref("password")], "confirm password must match password"),
    description: string()
      .required("description is required")
      .min(10, "description must be at least 10 characters")
      .max(255, "description must be at most 255 characters"),
    social_media_links: object({
      Facebook: string().url("invalid URL format"),
      Instagram: string().url("invalid URL format"),
    }).required("social media links are required"),
    categories_id: string().required("category is required"),
    payment_method: string()
      .required("payment method is required")
      .min(3, "payment method must be at least 3 characters")
      .max(50, "payment method must be at most 50 characters"),
    payment_account: string()
      .required("payment account is required")
      .min(3, "payment account must be at least 3 characters")
      .max(50, "payment account must be at most 50 characters"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      password_confirmation: "",
      description: "",
      social_media_links: {
        Facebook: "",
        Instagram: "",
      },
      categories_id: "",
      payment_method: "",
      payment_account: "",
    },
    validationSchema: validate,
    onSubmit: sendDataToApi,
  });

  async function sendDataToApi(values) {
    if (!token) {
      toast.error("You need to login first");
      navigate("/Auth/Signin");
      return;
    }
    const loadingToastId = toast.loading("creating request...");
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/user/startup/register",
        method: "POST",
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let { data } = await axios(options);
      console.log("data of registration", data);
      if (data) {
        toast.dismiss(loadingToastId);
        toast.success(
          "Registration request sent successfully! Please wait for approval."
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.dismiss(loadingToastId);
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.log("error in registeration", error);
      const msg = error?.response?.data?.message;
      setAccountExistsError(msg);
      toast.dismiss(loadingToastId);
      toast.error(msg);
    }
  }
  if (!token) {
    return (
      <div className="w-full lg:w-3/6 px-6 lg:pl-12 py-8 space-y-8">
        <p>You need to login first to register as a startup.</p>
        <button onClick={() => navigate("/Auth/Signin")}>Go to Login</button>
      </div>
    );
  }
  return (
    <>
      <div className="w-full lg:w-3/6 px-6 lg:pl-12 py-8 space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl mb-2">join us as a startup</h2>
          <p className="text-xs text-slate-500">
            create an account to start showcasing your products and services to
            a wider audience.
          </p>
        </div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg">
              startup name
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="type here"
              className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              id="name"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-secondary">*{formik.errors.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-lg">
              phone number
            </label>
            <input
              type="tel"
              autoComplete="on"
              placeholder="type your phone number"
              className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
              id="phone"
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-secondary">*{formik.errors.phone}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg">
              email
            </label>
            <input
              type="email"
              autoComplete="on"
              placeholder="type here"
              className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              id="email"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-secondary">*{formik.errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-lg">
              password
            </label>
            <div className="flex gap-2 items-center justify-between border border-blackmuted px-2 py-1.5 pb-2 focus-within:border-slate-600 focus-within:border-2 focus-within:outline-none focus-within:rounded">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="type here"
                className="outline-none placeholder:text-xs w-full"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                id="password"
              />
              <i
                className={`fa-regular ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } cursor-pointer`}
                onClick={() => setShowPassword((prev) => !prev)}
              ></i>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="text-secondary">*{formik.errors.password}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password_confirmation" className="text-lg">
              confirm password
            </label>
            <div className="flex gap-2 items-center justify-between border border-blackmuted px-2 py-1.5 pb-2 focus-within:border-slate-600 focus-within:border-2 focus-within:outline-none focus-within:rounded">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="type here"
                className="outline-none placeholder:text-xs w-full"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password_confirmation"
                id="password_confirmation"
              />
              <i
                className={`fa-regular ${
                  showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                } cursor-pointer`}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              ></i>
            </div>
            {formik.errors.password_confirmation &&
              formik.touched.password_confirmation && (
                <p className="text-secondary">
                  *{formik.errors.password_confirmation}
                </p>
              )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-lg">
              description
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="type here (about your startup)"
              className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="description"
              id="description"
            />
            {formik.errors.description && formik.touched.description && (
              <p className="text-secondary">*{formik.errors.description}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 space-y-2">
            {["Facebook", "Instagram"].map((platform) => (
              <div key={platform} className="flex flex-col gap-2">
                <label
                  htmlFor={`social_media_links[${platform}]`}
                  className="text-lg"
                >
                  {platform.toLowerCase()} link
                </label>
                <input
                  type="text"
                  autoComplete="on"
                  placeholder="type here"
                  className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs"
                  value={formik.values.social_media_links?.[platform] || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name={`social_media_links[${platform}]`}
                  id={`social_media_links[${platform}]`}
                />
                {formik.errors.social_media_links?.[platform] &&
                  formik.touched.social_media_links?.[platform] && (
                    <p className="text-secondary">
                      *{formik.errors.social_media_links[platform]}
                    </p>
                  )}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="categories_id" className="text-lg">
              category
            </label>
            <div className="relative">
              <select
                name="categories_id"
                id="categories_id"
                className="appearance-none border border-blackmuted px-2 py-1.5 pb-2 w-full"
                value={formik.values.categories_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" disabled>
                  select a category
                </option>
                {categories.map((subcat) => (
                  <option key={subcat.id} value={subcat.categories_id}>
                    {subcat.category.name} - {subcat.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-black">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="payment_method" className="text-lg">
              payment method
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="type here"
              className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs"
              value={formik.values.payment_method}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="payment_method"
              id="payment_method"
            />
            {formik.errors.payment_method && formik.touched.payment_method && (
              <p className="text-secondary">*{formik.errors.payment_method}</p>
            )}
          </div>
          <div className="pb-6 flex flex-col gap-2">
            <label htmlFor="payment_account" className="text-lg">
              payment account
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="type here"
              className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs"
              value={formik.values.payment_account}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="payment_account"
              id="payment_account"
            />
            {formik.errors.payment_account &&
              formik.touched.payment_account && (
                <p className="text-secondary">
                  *{formik.errors.payment_account}
                </p>
              )}
            {accountExistsError && (
              <p className="text-secondary">*{accountExistsError}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-black border border-black text-white rounded-full px-2 py-2 pb-2.5 w-full hover:bg-white hover:text-black transition-all duration-200 ease-in-out cursor-pointer"
          >
            send request
          </button>
        </form>
      </div>
    </>
  );
}

export default Registeration;
