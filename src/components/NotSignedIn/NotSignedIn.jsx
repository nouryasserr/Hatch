import { NavLink, useNavigate } from "react-router-dom";
import notFound from "../../assets/imgs/visuals/FileNotFound1.png";

function NotSignedIn() {
  const navigate = useNavigate();
  return (
    <>
      <div className="px-6 lg:px-12 pb-6 sm:py-6">
        <div>
          <div className="flex justify-end">
            <button
              onClick={() => navigate(-1)}
              className={
                "flex items-center gap-2 hover:gap-3 transition duration-300 ease-in-out delay-150"
              }
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>back</span>
            </button>
          </div>
          <div className="flex justify-content-center items-center flex-col gap-2 sm:gap-6">
            <img src={notFound} className="w-64 sm:w-80 mb-4 sm:mb-10" />
            <h4 className="text-xl sm:text-2xl text-center">
              whoops - you're not signed in
            </h4>
            <p className="blackMuted70 text-center text-xs sm:text-base">
              this page is personal - please login to access your profile
            </p>
            <NavLink
              to="/Signin"
              className={
                "mt-4 sm:mt-0 flex items-center gap-2 hover:gap-3 transition duration-300 ease-in-out delay-150"
              }
            >
              <span>login</span>
              <i className="fa-solid fa-arrow-right"></i>
            </NavLink>
            <NavLink
              to="/Signin"
              className={
                "mt-2 underline text-xs text-blackmuted hover:no-underline transition duration-300 ease-in-out delay-150"
              }
            >
              or create an account
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotSignedIn;
