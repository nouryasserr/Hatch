import { NavLink, useNavigate } from "react-router-dom";
import noWishList from "../../assets/imgs/visuals/EmptyFolder.png";

function EmptyWishlist() {
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
            <img src={noWishList} className="w-64 sm:w-80 mb-4 sm:mb-10" />
            <h4 className="text-xl sm:text-2xl text-center">
              nothing caught your eye yet?
            </h4>
            <p className="blackMuted70 text-center text-xs sm:text-base">
              save the pieces you love – they'll be waiting when you come back
            </p>
            <NavLink
              to="/"
              className={
                "mt-4 sm:mt-0 flex items-center gap-2 hover:gap-3 transition duration-300 ease-in-out delay-150"
              }
            >
              <span>browse collections</span>
              <i className="fa-solid fa-arrow-right"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmptyWishlist;
