import { NavLink } from "react-router-dom";

function ForgetPassword({ onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-blackmuted bg-opacity-70">
        <div className="w-11/12 xs:w-96 md:w-1/2 lg:w-1/3 bg-white shadow-lg">
          <div className="flex items-center justify-between py-4 px-4 xs:px-6">
            <h4 className="text-base xs:text-xl">forgot your password</h4>
            <button onClick={onClose}>
              <i className="fa-solid fa-xmark text-lightblack"></i>
            </button>
          </div>
          <hr />
          <div className="px-4 xs:px-6 py-2 xs:py-4">
            <h5 className="pb-2 text-sm xs:text-lg font-light">
              don't worry, it happens!
            </h5>
            <input
              type="email"
              autoComplete="on"
              name="email"
              placeholder="enter your e-mail"
              className="py-1 xs:py-2 px-2 xs:px-3 palceholder:text-xs placeholder:text-black w-full border border-blackmuted rounded-sm"
            />
          </div>
          <div className="px-4 xs:px-6">
            <button className="w-full my-4 bg-black border border-black rounded-full font-extralight text-sm text-white p-2 hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150">
              send code
            </button>
            <NavLink
              to="/Signin"
              className={
                "underline text-sm flex justify-center mb-6 hover:no-underline transition duration-300 ease-in-out delay-150"
              }
              onClick={onClose}
            >
              back to login
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
