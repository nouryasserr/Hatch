import logo from "../../assets/imgs/HatchWhite.png";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { FactoryContext } from "../../context/Factory.context";
function SideBar() {
  const { token } = useContext(FactoryContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };
  const { handleLogout } = useContext(FactoryContext);
  return (
    <>
      <button
        onClick={toggleSideBar}
        className="lg:hidden fixed top-2 left-3 z-50 rounded-md"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark text-white"></i>
        ) : (
          <i className="fa-solid fa-bars"></i>
        )}
      </button>
      <div
        className={`md:w-1/4 lg:w-1/6 bg-black h-full px-8 lg:px-4 py-8 fixed transition-all duration-300 ease-in-out ${
          isOpen ? "left-0" : "-left-full"
        } lg:left-0`}
      >
        <div className="relative h-full">
          <NavLink to="/Factory/FactoryProfile">
            <img src={logo} alt="logo" className="w-20 xl:w-24" />
          </NavLink>
          <ul className="text-white space-y-2 mt-8 font-light -mx-2">
            {!token && (
              <li className="flex gap-3 items-center cursor-pointer py-2 px-4 rounded-full hover:bg-primary transition duration-300 ease-in-ouy delay-150">
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <NavLink to="/Factory/FactoryLogin">login</NavLink>
              </li>
            )}
            {token && (
              <>
                <li className="flex gap-3 items-center cursor-pointer py-2 px-4 rounded-full hover:bg-primary transition duration-300 ease-in-ouy delay-150">
                  <i className="fa-regular fa-hand-point-up"></i>
                  <NavLink to="/Factory/FactoryResponse">responses</NavLink>
                </li>
                <li className="flex gap-3 items-center cursor-pointer py-2 px-4 rounded-full hover:bg-primary transition duration-300 ease-in-ouy delay-150">
                  <i className="fa-regular fa-circle-check"></i>
                  <NavLink to={"/Factory/Deals"}>deals</NavLink>
                </li>
                <li className="flex gap-3 items-center cursor-pointer py-2 px-4 rounded-full hover:bg-primary transition duration-300 ease-in-ouy delay-150">
                  <i className="fa-regular fa-comment-dots"></i>
                  <NavLink to={"/Factory/StartupRequests"}>requests</NavLink>
                </li>
              </>
            )}
          </ul>
          {token && (
            <ul className="text-white absolute bottom-0 left-0 space-y-2">
              <li className="flex gap-3 items-center cursor-pointer hover:text-lightblack transition duration-300 ease-in-out delay-150">
                <i className="fa-solid fa-gear"></i>
                <NavLink to={"/Factory/FactoryProfile"}>settings</NavLink>
              </li>
              <li className="flex gap-3 items-center cursor-pointer hover:text-secondary transition duration-300 ease-in-out delay-150">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span onClick={handleLogout}>logout</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default SideBar;
