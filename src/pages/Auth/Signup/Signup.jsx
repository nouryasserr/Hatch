import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
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
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: validate,
    onSubmit: sendDataToApi,
  });

  async function sendDataToApi(values) {
    const loadingToastId = toast.loading("creating account...");
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/register",
        method: "POST",
        data: values,
      };
      let { data } = await axios(options);
      console.log("data of registration", data);
      if (data) {
        toast.dismiss(loadingToastId);
        toast.success("Account created successfully!");
        setTimeout(() => {
          navigate("/Auth/Signin");
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

  return (
    <>
      <div className="w-full lg:w-3/6 px-6 lg:pl-12 py-8 space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl mb-2">create an account</h2>
          <p className="text-xs text-slate-500">
            join to start shopping and stay up-to-date on the latest deals
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button className="flex gap-2 items-center justify-center border border-slate-600 rounded-full px-5 py-1.5 w-full sm:w-1/2 hover:bg-black hover:text-white transition-all duration-200 ease-in-out cursor-pointer">
            <i className="fa-brands fa-apple text-xl"></i>
            <span className="text-sm font-medium">continue with apple</span>
          </button>
          <button className="flex gap-2 items-center justify-center border border-slate-600 rounded-full px-5 py-1.5 w-full sm:w-1/2 hover:bg-black hover:text-white transition-all duration-200 ease-in-out cursor-pointer">
            <i className="fa-brands fa-google text-lg"></i>
            <span className="text-sm font-medium"> continue with google </span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <hr className="flex-grow border-t border-gray-300" />
          <h6 className="text-center text-base">or</h6>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg">
              name
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="type here"
              className="border border-slate-600 px-2 py-1.5 pb-2 placeholder:text-xs"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              id="name"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500">*{formik.errors.name}</p>
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
              className="border border-slate-600 px-2 py-1.5 pb-2 placeholder:text-xs"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
              id="phone"
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-red-500">*{formik.errors.phone}</p>
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
              className="border border-slate-600 px-2 py-1.5 pb-2 placeholder:text-xs"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              id="email"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500">*{formik.errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-lg">
              password
            </label>
            <div className="flex gap-2 items-center justify-between border border-slate-600 px-2 py-1.5 pb-2 focus-within:border-slate-600 focus-within:border-2 focus-within:outline-none focus-within:rounded">
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
              <p className="text-red-500">*{formik.errors.password}</p>
            )}
          </div>
          <div className="pb-6  flex flex-col gap-2">
            <label htmlFor="password_confirmation" className="text-lg">
              confirm password
            </label>
            <div className="flex gap-2 items-center justify-between border border-slate-600 px-2 py-1.5 pb-2 focus-within:border-slate-600 focus-within:border-2 focus-within:outline-none focus-within:rounded">
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
                <p className="text-red-500">
                  *{formik.errors.password_confirmation}
                </p>
              )}
            {accountExistsError && (
              <p className="text-red-500">*{accountExistsError}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-black border border-black text-white rounded-full px-2 py-2 pb-2.5 w-full hover:bg-white hover:text-black transition-all duration-200 ease-in-out cursor-pointer"
          >
            create account
          </button>
          <div className="flex justify-between gap-2 flex-wrap">
            <p className="text-blackmuted text-sm">
              already created?
              <span
                className="text-black underline cursor-pointer text-base"
                onClick={() => navigate("/Auth/Signin")}
              >
                login
              </span>
            </p>
            <p
              onClick={() => navigate("/Startup/Registeration")}
              className="ttext-black underline cursor-pointer"
            >
              join as a startup
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
