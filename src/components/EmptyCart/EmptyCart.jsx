import { NavLink, useNavigate } from "react-router-dom";
import noCart from "../../assets/imgs/visuals/EmptyBox.png";

function EmptyCart() {
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
            <img src={noCart} className=" w-80 mb-4" />
            <h4 className="text-xl sm:text-2xl text-center">
              your cart is feeling kinda light
            </h4>
            <p className="blackMuted70 text-center text-xs sm:text-base">
              add something special to make it feel complete
            </p>
            <NavLink
              to="/"
              className={
                "mt-4 sm:mt-0 flex items-center gap-2 hover:gap-3 transition duration-300 ease-in-out delay-150"
              }
            >
              <span>start shopping</span>
              <i className="fa-solid fa-arrow-right"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmptyCart;
