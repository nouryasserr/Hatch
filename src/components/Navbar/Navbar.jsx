import logo from "../../assets/imgs/logo.jpeg";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { cartInfo, getCartProducts } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleProtectedNav = (path) => {
    if (!token) {
      toast.error("Please login first");
      navigate("/Auth/Signin");
    } else {
      navigate(path);
    }
  };
  useEffect(() => {
    if (token) {
      getCartProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      {token && (
        <div className="bg-black py-1 px-6">
          <p className="text-sm text-white overflow-hidden text-nowrap text-center">
            FREE SHIPPING ON ORDERS OVER 3000 EGP! SHOP NOW AND ENJOY STYLISH
            FASHION DELIVERED STRAIGHT TO YOUR DOORSTEP AT NO EXTRA COST.
          </p>
        </div>
      )}
      <nav className="py-6 px-6 lg:px-12">
        <div className="flex justify-between items-center gap-6">
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-20 xl:w-24" />
          </NavLink>
          <div className="hidden xs:flex lg:hidden gap-2 items-center border border-black rounded-full px-5 py-1.5 w-3/4">
            <i className="fa-solid fa-magnifying-glass text-blackmuted"></i>
            <input
              type="text"
              name="search"
              placeholder="search"
              className="outline-none placeholder:text-blackmuted w-full"
            />
          </div>
          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <i className="fa-solid fa-bars text-2xl"></i>
            </button>
          </div>
          <ul className="hidden lg:flex gap-2 xl:gap-4 items-center">
            {[
              { name: "new arrivals", to: "/User/FreshDrops" },
              { name: "best sales", to: "/User/BestSales" },
              { name: "categories", to: "/User/Categories" },
              { name: "about us", to: "/User/About" },
              { name: "sale", to: "/User/Sale", className: "text-secondary" },
            ].map(({ name, to, className = "" }) => (
              <li key={name} className={className}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `no-underline hover:underline transition duration-300 ease-in-out delay-150 ${
                      isActive ? "underline" : ""
                    }`
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex gap-2 items-center border border-black rounded-full px-5 py-1.5 xl:py-2 w-64 xl:w-1/3">
            <i className="fa-solid fa-magnifying-glass text-blackmuted"></i>
            <input
              type="text"
              name="search"
              placeholder="search"
              className="outline-none placeholder:text-blackmuted w-full"
            />
          </div>
          <div className="hidden lg:flex gap-2 items-center">
            <button
              onClick={() => handleProtectedNav("/User/Cart")}
              className={"relative"}
            >
              <i className="fa-solid fa-cart-shopping border border-black bg-black p-2.5 xl:p-3 rounded-full text-white hover:bg-white hover:text-black transition duration-300 ease-in-out delay-150"></i>
              <div className="flex justify-center items-center text-center h-5 w-5 border-2 border-white rounded-full bg-secondary text-white absolute right-0 top-0 translate-x-1/4 -translate-y-1/4">
                {cartInfo === null ? (
                  <i className="fa-solid fa-info text-xs"></i>
                ) : (
                  <span className="text-xs">{cartInfo?.data?.totalItems}</span>
                )}
              </div>
            </button>
            <button onClick={() => handleProtectedNav("/User/Wishlist")}>
              <i className="fa-regular fa-heart border border-black bg-black p-2.5 xl:p-3 rounded-full text-white hover:bg-white hover:text-black transition duration-300 ease-in-out delay-150"></i>
            </button>
            <NavLink to="/User/UserAccount">
              <i className="fa-regular fa-user bg-black border border-black p-2.5 xl:py-3 px-[0.70rem] xl:px-[0.80rem] rounded-full text-white hover:bg-white hover:text-black transition duration-300 ease-in-out delay-150"></i>
            </NavLink>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden mt-4 flex flex-col gap-4 items-center xs:items-start border-t pt-4">
            <ul className="flex flex-col gap-2 text-center xs:text-start">
              {[
                { name: "new arrivals", to: "/User/FreshDrops" },
                { name: "best sales", to: "/User/BestSales" },
                { name: "categories", to: "/User/Categories" },
                { name: "about us", to: "/User/About" },
                { name: "sale", to: "/User/Sale", className: "text-secondary" },
              ].map(({ name, to, className = "" }) => (
                <li key={name} className={className}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `no-underline hover:underline transition duration-300 ease-in-out delay-150 ${
                        isActive ? "underline" : ""
                      }`
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => handleProtectedNav("/User/Cart")}
                className={"relative"}
              >
                <i className="fa-solid fa-cart-shopping border border-black bg-black p-2.5 rounded-full text-white hover:bg-white hover:text-black transition duration-300 ease-in-out delay-150"></i>
                <div className="flex justify-center items-center h-5 w-5 border-2 border-white rounded-full bg-secondary text-white absolute right-0 top-0 translate-x-1/4 -translate-y-1/4">
                  {cartInfo === null ? (
                    <i className="fa-solid fa-info text-xs"></i>
                  ) : (
                    <span className="text-xs">
                      {cartInfo?.data?.totalItems}
                    </span>
                  )}
                </div>
              </button>
              <button onClick={() => handleProtectedNav("/User/Wishlist")}>
                <i className="fa-regular fa-heart border border-black bg-black p-2.5 rounded-full text-white hover:bg-white hover:text-black transition duration-300 ease-in-out delay-150"></i>
              </button>
              <i className="fa-regular fa-user bg-black border border-black py-2.5 px-[0.700rem] rounded-full text-white hover:bg-white hover:text-black transition duration-300 ease-in-out delay-150"></i>
            </div>
            <div className="flex xs:hidden gap-2 items-center border border-black rounded-full px-5 py-1.5">
              <i className="fa-solid fa-magnifying-glass text-blackmuted"></i>
              <input
                type="text"
                name="search"
                placeholder="search"
                className="outline-none placeholder:text-blackmuted w-full"
              />
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
