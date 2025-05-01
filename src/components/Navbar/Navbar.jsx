import logo from "../../assets/imgs/logo.png";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <>
      <nav className="flex justify-between items-center gap-8 py-6 px-12">
        <NavLink to="/Home">
          <img src={logo} alt="logo" className="w-24" />
        </NavLink>
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/FreshDrops"
              className={({ isActive }) => {
                console.log(isActive);
                return `no-underline hover:underline transition duration-300 ease-in-out delay-150 ${
                  isActive ? "underline" : ""
                }`;
              }}
            >
              new arrivals
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/BestSales"
              className={({ isActive }) => {
                return `no-underline hover:underline transition duration-300 ease-in-out delay-150 ${
                  isActive ? "underline" : ""
                }`;
              }}
            >
              best sales
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Categories"
              className={({ isActive }) => {
                return `no-underline hover:underline transition duration-300 ease-in-out delay-150${
                  isActive ? "underline" : ""
                }`;
              }}
            >
              categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/About"
              className={({ isActive }) => {
                return `no-underline hover:underline transition duration-300 ease-in-out delay-150${
                  isActive ? "underline" : ""
                }`;
              }}
            >
              about us
            </NavLink>
          </li>
          <li className="text-red-500">
            <NavLink
              to="#"
              className={({ isActive }) => {
                return `hover:underline transition duration-300 ease-in-out delay-150${
                  isActive ? "underline" : ""
                }`;
              }}
            >
              sale
            </NavLink>
          </li>
        </ul>
        <div className="flex gap-2 items-center border border-slate-600 rounded-full px-5 py-1.5 w-1/4">
          <i className="fa-solid fa-magnifying-glass text-slate-600"></i>
          <input
            type="text"
            name="search"
            placeholder="search"
            className="outline-none placeholder:text-slate-600 placeholder:font-medium"
          />
        </div>
        <div className="space-x-2">
          <NavLink to="/Cart">
            <i className="fa-solid fa-cart-shopping border border-black bg-black p-2.5 rounded-full text-white hover:bg-white hover:text-black transition duration-300 ease-in-out delay-150"></i>
          </NavLink>
          <NavLink to="/Wishlist">
            <i className="fa-regular fa-heart border border-black bg-black p-2.5 rounded-full text-white hover:bg-white hover:text-black transition duration-300 ease-in-out delay-150"></i>
          </NavLink>
          <i className="fa-regular fa-user bg-black border border-black py-2.5 px-[0.700rem] rounded-full text-white hover:bg-white hover:text-black transition duration-300 ease-in-out delay-150"></i>
          <i className="fa-solid fa-caret-down"></i>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
