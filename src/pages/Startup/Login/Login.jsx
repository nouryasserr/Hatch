import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ForgetPassword from "../../../components/ForgetPassword/ForgetPassword";
import { object, string } from "yup";
import { StartupContext } from "../../../context/Startup.context";

function Login() {
  let { setToken } = useContext(StartupContext);
  const [inncorrectEmailOrPassword, setIncorrectEmailOrPassword] =
    useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const validate = object({
    email: string().required("email is required").email("invalid email"),
    password: string()
      .required("password is required")
      .min(8, "password must be at least 8 characters")
      .max(15, "password must be at most 15 characters"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: sendDataToApi,
  });
  const [showForget, setShowForget] = useState(false);
  async function sendDataToApi(values) {
    const loadingToastId = toast.loading("logging in...");
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/startup/login",
        method: "POST",
        data: values,
      };
      let { data } = await axios(options);
      if (data.data?.token) {
        localStorage.setItem("startupToken", data.data.token);
        setToken(data.data.token);
        toast.dismiss(loadingToastId);
        toast.success("logged in successfully!");
        setTimeout(() => {
          navigate("/Startup/Overview");
        }, 2000);
      } else {
        toast.dismiss(loadingToastId);
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.log("error in login", error);
      const msg = setIncorrectEmailOrPassword(error?.response?.data?.message);
      toast.dismiss(loadingToastId);
      toast.error(msg);
    }
  }
  return (
    <>
      <div className="w-full lg:w-3/6 px-6 lg:pl-12 py-8 md:py-16 space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl mb-2">welcome back to hatch</h2>
          <p className="text-xs text-slate-500">
            login to your account to start your journey!
          </p>
        </div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
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
            {inncorrectEmailOrPassword && (
              <p className="text-red-500">*{inncorrectEmailOrPassword}</p>
            )}
          </div>
          <button
            type="button"
            className="text-black underline cursor-pointer text-base"
            onClick={() => setShowForget(true)}
          >
            forget password?
          </button>
          <button
            type="submit"
            className="bg-black border border-black text-white rounded-full px-2 py-2 pb-2.5 w-full hover:bg-white hover:text-black transition-all duration-200 ease-in-out cursor-pointer"
          >
            login
          </button>
        </form>
      </div>
      {showForget && <ForgetPassword onClose={() => setShowForget(false)} />}
    </>
  );
}

export default Login;
