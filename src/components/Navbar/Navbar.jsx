import logo from "../../assets/imgs/logo.jpeg";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="py-6 px-6 lg:px-12">
      <div className="flex justify-between items-center">
        <NavLink to="/">
          <img src={logo} alt="logo" className="w-20 lg:w-24" />
        </NavLink>
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
        <ul className="hidden lg:flex gap-4 items-center">
          {[
            { name: "new arrivals", to: "/FreshDrops" },
            { name: "best sales", to: "/BestSales" },
            { name: "categories", to: "/Categories" },
            { name: "about us", to: "/About" },
            { name: "sale", to: "/Sale", className: "text-red-500" },
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
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex gap-2 items-center border border-slate-800 rounded-full px-5 py-1.5 w-64">
            <i className="fa-solid fa-magnifying-glass text-slate-800"></i>
            <input
              type="text"
              name="search"
              placeholder="search"
              className="outline-none placeholder:text-slate-800 placeholder:font-medium w-full"
            />
          </div>
          <div className="space-x-2">
            <NavLink to="/Cart">
              <i className="fa-solid fa-cart-shopping border border-black bg-black p-2.5 rounded-full text-white hover:bg-white hover:text-black transition"></i>
            </NavLink>
            <NavLink to="/Wishlist">
              <i className="fa-regular fa-heart border border-black bg-black p-2.5 rounded-full text-white hover:bg-white hover:text-black transition"></i>
            </NavLink>
            <i className="fa-regular fa-user bg-black border border-black py-2.5 px-[0.700rem] rounded-full text-white hover:bg-white hover:text-black transition"></i>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden mt-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-2">
            {[
              { name: "new arrivals", to: "/FreshDrops" },
              { name: "best sales", to: "/BestSales" },
              { name: "categories", to: "/Categories" },
              { name: "about us", to: "/About" },
              { name: "sale", to: "/Sale", className: "text-red-500" },
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
          <div className="flex gap-2 items-center border border-slate-800 rounded-full px-5 py-1.5">
            <i className="fa-solid fa-magnifying-glass text-slate-800"></i>
            <input
              type="text"
              name="search"
              placeholder="search"
              className="outline-none placeholder:text-slate-800 placeholder:font-medium w-full"
            />
          </div>
          <div className="flex gap-4 pt-2">
            <NavLink to="/Cart">
              <i className="fa-solid fa-cart-shopping border border-black bg-black p-2.5 rounded-full text-white hover:bg-white hover:text-black transition"></i>
            </NavLink>
            <NavLink to="/Wishlist">
              <i className="fa-regular fa-heart border border-black bg-black p-2.5 rounded-full text-white hover:bg-white hover:text-black transition"></i>
            </NavLink>
            <i className="fa-regular fa-user bg-black border border-black py-2.5 px-[0.700rem] rounded-full text-white hover:bg-white hover:text-black transition"></i>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
