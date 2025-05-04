import { NavLink, useNavigate } from "react-router-dom";
import notFound from "../../assets/imgs/visuals/404Error.png";

function Error404() {
  const navigate = useNavigate();
  return (
    <>
      <div className="px-6 lg:px-12 pb-6 sm:py-6">
        <div className="space-y-8 md:space-y-16 mb-6 sm:mb-10 md:mb-16">
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
              looks like you took a wrong turn
            </h4>
            <p className="blackMuted70 text-center text-xs sm:text-base">
              the page you're looking for doesn’t exist – but great finds do
            </p>
            <NavLink
              to="/"
              className={
                "mt-4 sm:mt-0 flex items-center gap-2 hover:gap-3 transition duration-300 ease-in-out delay-150"
              }
            >
              <span>back home</span>
              <i className="fa-solid fa-arrow-right"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error404;
