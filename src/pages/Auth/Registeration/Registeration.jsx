import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string, number } from "yup";
import { UserContext } from "../../../context/User.context";

function Registeration() {
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const toastShown = useRef(false);
  const [categories, setCategories] = useState([]);
  const [billingCycle, setBillingCycle] = useState("quarterly");
  const [selectedPackage, setSelectedPackage] = useState("pro_supply");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountExistsError, setAccountExistsError] = useState(null);

  const PACKAGE_PRICES = {
    starter: 600,
    pro_marketing: 1200,
    pro_supply: 1200,
    premium: 2500,
  };

  const calculatePrice = () => {
    const basePrice = PACKAGE_PRICES[selectedPackage];
    if (billingCycle === "yearly") {
      const yearlyPrice = basePrice * 4;
      const discount = yearlyPrice * 0.2;
      return yearlyPrice - discount;
    }
    return basePrice;
  };

  const packages = [
    {
      id: "starter",
      name: "starter package",
      description: "for small startups",
      package_id: 1,
    },
    {
      id: "pro_marketing",
      name: "pro package",
      description: "for growing businesses",
      subtitle: "marketing add-on",
      package_id: 2,
    },
    {
      id: "pro_supply",
      name: "pro package",
      description: "for growing businesses",
      subtitle: "supply/chain add-on",
      package_id: 3,
    },
    {
      id: "premium",
      name: "premium package",
      description: "for scaling professionals",
      package_id: 4,
    },
  ];

  const packageFeatures = {
    starter: {
      title: "brand profile",
      features: [
        "brand profile",
        "product management",
        "up to xx products",
        "dashboard tracking",
        "order alerts",
        "own analytics platform",
        "reports",
      ],
    },
    pro_marketing: {
      title: "includes everything in starter +",
      features: [
        "includes everything in starter +",
        "up to xxx products",
        "up to xx employees",
        "homepage feature",
        "social media shoutouts",
        "email campaigns",
        "seo boost",
      ],
    },
    pro_supply: {
      title: "includes everything in starter +",
      features: [
        "includes everything in starter +",
        "up to xxx products",
        "up to xx employees",
        "homepage feature",
        "social media shoutouts",
        "email campaigns",
        "seo boost",
      ],
    },
    premium: {
      title: "includes all add-ons +",
      features: [
        "includes all add-ons +",
        "unlimited products",
        "unlimited employees",
        "1 custom campaign/month",
        "early access to features",
        "hatch middleman support",
        "seasonal campaign",
      ],
    },
  };

  const getCurrentFeatures = () => {
    return packageFeatures[selectedPackage].features;
  };

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
          console.log(
            "Available categories:",
            data.data.map((cat) => ({
              id: cat.id,
              name: `${cat.category.name} - ${cat.name}`,
            }))
          );
        }
      } catch (error) {
        console.log("error in fetching categories", error);
        toast.error("Failed to fetch categories.");
      }
    }
    fetchCategoris();
  }, []);

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
    })
      .required("social media links are required")
      .test(
        "at-least-one-social",
        "At least one social media link is required",
        function (value) {
          return value && (value.Facebook || value.Instagram);
        }
      ),
    categories_id: number()
      .required("category is required")
      .test("valid-category", "Invalid category selected", function (value) {
        console.log("Validating category ID:", value);
        console.log(
          "Available category IDs:",
          categories.map((cat) => cat.id)
        );
        const isValid = categories.some((cat) => cat.id === value);
        console.log("Is category valid?", isValid);
        return isValid;
      }),
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
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      console.log("Selected package:", selectedPackage);
      console.log("Billing cycle:", billingCycle);
      sendDataToApi(values);
    },
  });

  async function sendDataToApi(values) {
    console.log("Starting API request...");
    if (!token) {
      toast.error("You need to login first");
      navigate("/Auth/Signin");
      return;
    }

    const selectedPkg = packages.find((pkg) => pkg.id === selectedPackage);
    if (!selectedPkg) {
      toast.error("Please select a package");
      return;
    }

    const selectedCategory = categories.find(
      (cat) => cat.id === Number(values.categories_id)
    );
    if (!selectedCategory) {
      toast.error("Selected category is not valid");
      return;
    }

    // Clean up social media links - remove empty values
    const cleanSocialMediaLinks = {};
    if (values.social_media_links.Facebook) {
      cleanSocialMediaLinks.Facebook = values.social_media_links.Facebook;
    }
    if (values.social_media_links.Instagram) {
      cleanSocialMediaLinks.Instagram = values.social_media_links.Instagram;
    }

    const loadingToastId = toast.loading("creating request...");
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/user/startup/register",
        method: "POST",
        data: {
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
          description: values.description,
          social_media_links: cleanSocialMediaLinks,
          categories_id: selectedCategory.category_id,
          package_id: selectedPkg.package_id,
          payment_method: values.payment_method,
          payment_account: values.payment_account,
          billing_cycle: billingCycle,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      console.log("Selected category details:", {
        subcategory_id: selectedCategory.id,
        subcategory_name: selectedCategory.name,
        category_id: selectedCategory.category_id,
        category_name: selectedCategory.category.name,
      });
      console.log(
        "Sending registration data:",
        JSON.stringify(options.data, null, 2)
      );

      let { data } = await axios(options);
      console.log("Registration response:", data);

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
      console.log("Error response data:", error.response?.data);
      const errorDetails = {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.response?.data?.message,
        errors: error.response?.data?.errors,
        validationErrors: error.response?.data?.errors || {},
      };
      console.log("Full error response:", error.response);
      console.log("Error details:", errorDetails);

      if (errorDetails.validationErrors) {
        Object.entries(errorDetails.validationErrors).forEach(
          ([field, errors]) => {
            console.log(`Validation error for ${field}:`, errors);
            if (Array.isArray(errors)) {
              errors.forEach((error) => toast.error(`${field}: ${error}`));
            } else if (typeof errors === "string") {
              toast.error(`${field}: ${errors}`);
            }
          }
        );
      }

      const msg = error?.response?.data?.message;
      if (msg) {
        console.log("Error message from API:", msg);
        toast.error(msg);
      } else {
        toast.error("An error occurred during registration");
      }

      setAccountExistsError(error?.response?.data?.message);
      toast.dismiss(loadingToastId);
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
      <div className="px-6 lg:px-12 py-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl xs:text-4xl font-medium mb-2">
          choose your plan
        </h1>
        <p className="text-lightblack mb-4 xs:mb-8 text-sm">flexible billing</p>
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6 sm:mb-12">
          <span
            className={`${
              billingCycle === "quarterly" ? "text-black" : "text-lightblack"
            }`}
          >
            quarterly
          </span>
          <button
            type="button"
            className="relative w-14 h-7 border border-lightblack rounded-full py-0.5 px-1 transition-colors duration-300"
            onClick={() =>
              setBillingCycle((prev) =>
                prev === "quarterly" ? "yearly" : "quarterly"
              )
            }
          >
            <div
              className={`w-5 h-5 bg-primary rounded-full transition-transform duration-300 transform ${
                billingCycle === "yearly" ? "translate-x-7" : ""
              }`}
            />
          </button>
          <span
            className={`${
              billingCycle === "yearly" ? "text-black" : "text-lightblack"
            }`}
          >
            yearly
          </span>
          <span className="text-sm px-2 py-1 rounded-full border border-blackmuted">
            20% off
          </span>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 w-full xl:max-w-6xl">
          <div className="flex-1 space-y-4">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                className={`w-full text-left p-6 rounded-xl border transition-all ${
                  selectedPackage === pkg.id
                    ? "border-lightblack bg-black opacity-95 text-white"
                    : "border-lightblack hover:border-black"
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex flex-col xs:flex-row gap-1.5 xs:items-end mb-1">
                      <h6 className="font-medium">{pkg.name}</h6>
                      {pkg.subtitle && (
                        <span className="text-xs opacity-80">
                          {pkg.subtitle}
                        </span>
                      )}
                    </div>
                    <p className="text-sm opacity-50">{pkg.description}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedPackage === pkg.id
                        ? "bg-white"
                        : "border-lightblack"
                    }`}
                  >
                    {selectedPackage === pkg.id && (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-black"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="flex-1 rounded-xl border border-lightblack p-4 xs:py-6 xs:px-8">
            <h3 className="text-2xl mb-6 text-center">what you get?</h3>
            <div className="space-y-4 mb-8">
              {getCurrentFeatures().map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-row-reverse justify-between items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col xs:flex-row gap-4 items-center">
              <div className="flex items-end">
                <span className="text-2xl">{calculatePrice()} EGP</span>
                <span className="text-lightblack text-sm">/{billingCycle}</span>
              </div>
              <button
                type="button"
                className="w-full xs:w-auto grow bg-black border border-black text-white py-3 rounded-lg hover:bg-transparent hover:text-black transition ease-in-out duration-300 dealy-150"
                onClick={() => {
                  const element = document.querySelector("form");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Choose plan
              </button>
            </div>
          </div>
        </div>

        <div className="w-full px-6 lg:pl-12 py-8 space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl mb-2">join us as a startup</h2>
            <p className="text-xs text-slate-500">
              create an account to start showcasing your products and services
              to a wider audience.
            </p>
          </div>
          <form className="space-y-4" onSubmit={formik.handleSubmit} noValidate>
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
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    formik.setFieldValue("categories_id", value);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <option value="">select a category</option>
                  {categories.map((subcat) => (
                    <option key={subcat.id} value={subcat.id}>
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
              {formik.errors.categories_id && formik.touched.categories_id && (
                <p className="text-secondary">*{formik.errors.categories_id}</p>
              )}
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
              {formik.errors.payment_method &&
                formik.touched.payment_method && (
                  <p className="text-secondary">
                    *{formik.errors.payment_method}
                  </p>
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
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Sending request..." : "send request"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registeration;
