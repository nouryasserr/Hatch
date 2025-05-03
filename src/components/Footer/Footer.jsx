import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="py-6 px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-2">
          <div className="w-full md:w-1/2 lg:w-2/5 space-y-16">
            <h1 className="text-5xl lg:text-6xl">stay connected with hatch</h1>
            <div className="flex justify-between items-center border-b-2 border-black py-1.5">
              <input
                type="text"
                name="email"
                autoComplete="on"
                placeholder="ENTER YOUR E-MAIL"
                className="placeholder:text-black focus:outline-none w-full"
              />
              <i className="fa-solid fa-arrow-right cursor-pointer"></i>
            </div>
            <div className="flex flex-col xs:flex-row justify-between gap-6 xs:gap-10 text-lg xs:text-xl">
              <ul className="space-y-6 grow">
                <li>
                  <NavLink className={"flex items-center justify-between"}>
                    new arrivals
                    <i className="fa-solid fa-arrow-right origin-center -rotate-45"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={"flex items-center justify-between"}>
                    best sales
                    <i className="fa-solid fa-arrow-right origin-center -rotate-45"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={"flex items-center justify-between"}>
                    categories
                    <i className="fa-solid fa-arrow-right origin-center -rotate-45"></i>
                  </NavLink>
                </li>
              </ul>
              <ul className="space-y-6 grow">
                <li>
                  <NavLink className={"flex items-center justify-between"}>
                    about us
                    <i className="fa-solid fa-arrow-right origin-center -rotate-45"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={"flex items-center justify-between"}>
                    contact us
                    <i className="fa-solid fa-arrow-right origin-center -rotate-45"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={"flex items-center justify-between"}>
                    sale
                    <i className="fa-solid fa-arrow-right origin-center -rotate-45"></i>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col md:items-end gap-16 md:gap-0 justify-between">
            <h2 className="text-4xl lg:text-5xl font-light md:text-end">
              "stay updated with the latest {""}
              <span className="text-neutral-500">
                exclusive offers and product launches {""}
              </span>
              from hatch.
            </h2>
            <div className="flex md:justify-end items-center gap-4 text-xl">
              <i className="fa-brands fa-facebook-f bg-black border border-black text-white py-2.5 px-4 rounded-sm cursor-pointer hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"></i>
              <i className="fa-brands fa-twitter bg-black border border-black text-white py-2.5 px-3 rounded-sm cursor-pointer hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"></i>
              <i className="fa-brands fa-instagram bg-black border border-black text-white py-2.5 px-3 rounded-sm cursor-pointer hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"></i>
            </div>
          </div>
        </div>
        <h6 className="text-center mt-20 cursor-pointer">
          COPYRIGHT © 2025 HATCH, Inc. All RIGHTS RESERVED.
        </h6>
      </footer>
    </>
  );
}

export default Footer;
