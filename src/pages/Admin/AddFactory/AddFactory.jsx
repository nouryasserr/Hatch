import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { AdminContext } from "../../../context/Admin.context";
import Loader from "../../../components/Loader/Loader";

function AddFactory() {
  const navigate = useNavigate();
  const { token } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = object({
    name: string()
      .required("Factory name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    phone: string()
      .required("Phone number is required")
      .matches(/^[0-9]{11}$/, "Phone number must be 11 digits"),
    email: string().required("Email is required").email("Invalid email format"),
    payment_methods: string()
      .required("Payment method is required")
      .min(3, "Payment method must be at least 3 characters")
      .max(50, "Payment method must be at most 50 characters"),
    payment_account: string()
      .required("Payment account is required")
      .min(3, "Payment account must be at least 3 characters")
      .max(50, "Payment account must be at most 50 characters"),
    description: string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(255, "Description must be at most 255 characters"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password must be at most 15 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      payment_methods: "",
      payment_account: "",
      description: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/admin/factory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/Admin/AllFactories");
      } else {
        throw new Error(data.message || "Failed to create factory");
      }
    } catch (error) {
      formik.setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div>
          <h2 className="text-2xl xs:text-3xl">add new factory</h2>
          <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
            manage all factories on the platform
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg">
              factory name
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="type here"
              className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs">{formik.errors.name}</p>
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
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs">{formik.errors.phone}</p>
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
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
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
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <i
                className={`fa-regular ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } cursor-pointer`}
                onClick={() => setShowPassword((prev) => !prev)}
              ></i>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs">{formik.errors.password}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="payment_methods" className="text-lg">
              payment method
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="type here"
              className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs"
              name="payment_methods"
              id="payment_methods"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.payment_methods}
            />
            {formik.touched.payment_methods &&
              formik.errors.payment_methods && (
                <p className="text-red-500 text-xs">
                  {formik.errors.payment_methods}
                </p>
              )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="payment_account" className="text-lg">
              payment account
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="type here"
              className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs"
              name="payment_account"
              id="payment_account"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.payment_account}
            />
            {formik.touched.payment_account &&
              formik.errors.payment_account && (
                <p className="text-red-500 text-xs">
                  {formik.errors.payment_account}
                </p>
              )}
          </div>
          <div className="flex flex-col gap-2 pb-6">
            <label htmlFor="description" className="text-lg">
              description
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="type here (about your startup)"
              className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs"
              name="description"
              id="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-xs">
                {formik.errors.description}
              </p>
            )}
          </div>
          {formik.errors.submit && (
            <div className="text-red-500 text-sm text-center">
              {formik.errors.submit}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary border border-lightblack text-white rounded-full px-2 py-2 pb-2.5 w-full hover:bg-white hover:text-black transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "add new factory"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddFactory;
