import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const passwordSchema = Yup.object().shape({
  new_password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("New password is required"),
  new_password_confirmation: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

function NewPassword({ onClose, email, otp }) {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const toastId = toast.loading("Resetting password...");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          otp_code: otp,
          new_password: values.new_password,
          new_password_confirmation: values.new_password_confirmation,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Password reset successfully!");
        onClose();
        navigate("/Auth/Signin");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to reset password");
    } finally {
      toast.dismiss(toastId);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blackmuted bg-opacity-70">
      <div className="w-11/12 xs:w-96 md:w-1/2 lg:w-1/3 bg-white shadow-lg">
        <div className="flex items-center justify-between py-4 px-4 xs:px-6">
          <h4 className="text-base xs:text-xl">reset password</h4>
          <button onClick={onClose}>
            <i className="fa-solid fa-xmark text-lightblack"></i>
          </button>
        </div>
        <hr />
        <Formik
          initialValues={{
            new_password: "",
            new_password_confirmation: "",
          }}
          validationSchema={passwordSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="px-4 xs:px-6 py-2 xs:py-4">
                <h5 className="pb-2 text-sm xs:text-lg font-light">
                  enter your new password
                </h5>
                <div className="space-y-4">
                  <div>
                    <Field
                      type="password"
                      name="new_password"
                      placeholder="new password"
                      className="py-1 xs:py-2 px-2 xs:px-3 placeholder:text-xs placeholder:text-black w-full border border-blackmuted rounded-sm"
                    />
                    {errors.new_password && touched.new_password && (
                      <div className="text-secondary text-xs mt-1">
                        {errors.new_password}
                      </div>
                    )}
                  </div>
                  <div>
                    <Field
                      type="password"
                      name="new_password_confirmation"
                      placeholder="confirm new password"
                      className="py-1 xs:py-2 px-2 xs:px-3 placeholder:text-xs placeholder:text-black w-full border border-blackmuted rounded-sm"
                    />
                    {errors.new_password_confirmation &&
                      touched.new_password_confirmation && (
                        <div className="text-secondary text-xs mt-1">
                          {errors.new_password_confirmation}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="px-4 xs:px-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full my-4 bg-black border border-black rounded-full font-extralight text-sm text-white p-2 hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "resetting..." : "reset password"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default NewPassword;
