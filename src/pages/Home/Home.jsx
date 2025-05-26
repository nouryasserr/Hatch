import { useState } from "react";
import Category from "../../components/Category/Category";
import { useEffect, useRef } from "react";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

function Home() {
  // auto-slider
  const sliderRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const track = trackRef.current;
    if (!slider || !track) return;
    const clone = track.innerHTML;
    track.innerHTML += clone;
    let scrollAmount = 0;
    function step() {
      scrollAmount += 0.4;
      if (scrollAmount >= track.scrollWidth / 2) {
        scrollAmount = 0;
      }
      slider.scrollLeft = scrollAmount;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    return () => cancelAnimationFrame(step);
  }, []);
  // end-auto-slider
  // fetch-products
  const [productsData, setProductsData] = useState(null);
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setProductsData(data.data);
  }
  useEffect(() => {
    getProducts();
  }, []);
  // end-fetch-products
  return (
    <>
      {/* main-slider */}
      <div className="p-6 pt-0">
        <div className="h-[300px] md:h-[500px] lg:h-[550px] w-full bg-black rounded-3xl py-6 md:py-16 px-6 flex flex-col sm:flex-row sm:items-center justify-end sm:justify-between">
          <div className="w-3/5 md:w-3/4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 sm:mb-0">
            exclusive
          </div>
          <div className="w-full sm:w-1/3 xl:w-1/5 self-end">
            <h6 className="text-white mb-2 md:mb-4 text-base md:text-lg">
              hatch objectives
            </h6>
            <p className="text-lightblack text-sm md:text-base">
              Real-world examples of how we have helped companies achieve their
              marketing objectives.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-6 flex md:hidden justify-end items-center gap-2 text-xs">
        <i className="fa-solid fa-arrow-left border border-black py-1 pt-1.5 px-5 rounded-full hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150 cursor-pointer"></i>
        <p className="text-lightblack">
          <span className="underline text-black">01</span>/05
        </p>
        <i className="fa-solid fa-arrow-right border border-black bg-black text-white py-1 pt-1.5 px-5 rounded-full hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150 cursor-pointer"></i>
      </div>
      <div className="px-6 lg:px-12 pt-6 md:pt-0 pb-6 flex flex-wrap sm:flex-nowrap gap-2 justify-center sm:justify-between items-center">
        <h4 className="text-base lg:lg:text-xl font-medium sm:w-52 md:w-56 lg:w-60 xl:w-64">
          est 2025
        </h4>
        <h4 className="text-base lg:text-xl font-medium text-center">
          empowering brands to break through
        </h4>
        <div className="hidden md:flex items-center gap-4 lg:gap-7 xl:gap-8  text-xs lg:text-xl">
          <i className="fa-solid fa-arrow-left border border-black py-1.5 pt-2 px-6 rounded-full hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150 cursor-pointer"></i>
          <p className="text-lightblack">
            <span className="underline text-black">01</span>/05
          </p>
          <i className="fa-solid fa-arrow-right border border-black bg-black text-white py-1.5 pt-2 px-6 rounded-full hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150 cursor-pointer"></i>
        </div>
      </div>
      {/* end-main-slider */}
      {/* auto-slider */}
      <div
        ref={sliderRef}
        className="bg-black px-2 py-2 pt-3 md:py-5 overflow-x-hidden whitespace-nowrap"
        style={{ width: "100%" }}
      >
        <div
          ref={trackRef}
          className="slider-track flex gap-4 md:gap-10 items-center inline-flex"
          style={{ display: "inline-flex" }}
        >
          <svg
            width="14px"
            height="24px"
            viewBox="0 0 24.00 24.00"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepoBgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepotracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepoIconCarrier">
              <path
                d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <h5 className="text-white text-sm lg:text-lg inline-block">CAP</h5>
          <svg
            width="14px"
            height="24px"
            viewBox="0 0 24.00 24.00"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepoBgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepotracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepoIconCarrier">
              <path
                d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <h5 className="text-white text-sm lg:text-lg inline-block">
            TROUSER
          </h5>
          <svg
            width="14px"
            height="24px"
            viewBox="0 0 24.00 24.00"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepoBgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepotracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepoIconCarrier">
              <path
                d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <h5 className="text-white text-sm lg:text-lg inline-block">SHORTS</h5>
          <svg
            width="14px"
            height="24px"
            viewBox="0 0 24.00 24.00"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepoBgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepotracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepoIconCarrier">
              <path
                d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <h5 className="text-white text-sm lg:text-lg inline-block">SHOES</h5>
          <svg
            width="14px"
            height="24px"
            viewBox="0 0 24.00 24.00"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepoBgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepotracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepoIconCarrier">
              <path
                d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <h5 className="text-white text-sm lg:text-lg inline-block">SOCKS</h5>
          <svg
            width="14px"
            height="24px"
            viewBox="0 0 24.00 24.00"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepoBgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepotracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepoIconCarrier">
              <path
                d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <h5 className="text-white text-sm lg:text-lg inline-block">JACKET</h5>
          <svg
            width="14px"
            height="24px"
            viewBox="0 0 24.00 24.00"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepoBgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepotracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepoIconCarrier">
              <path
                d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <h5 className="text-white text-sm lg:text-lg inline-block">HOODIE</h5>
          <svg
            width="14px"
            height="24px"
            viewBox="0 0 24.00 24.00"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepoBgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepotracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepoIconCarrier">
              <path
                d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <h5 className="text-white text-sm lg:text-lg inline-block">
            GLASSES
          </h5>
          <svg
            width="14px"
            height="24px"
            viewBox="0 0 24.00 24.00"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepoBgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepotracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepoIconCarrier">
              <path
                d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <h5 className="text-white text-sm lg:text-lg inline-block">BAG</h5>
          <svg
            width="14px"
            height="24px"
            viewBox="0 0 24.00 24.00"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <g id="SVGRepoBgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepotracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepoIconCarrier">
              <path
                d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <h5 className="text-white text-sm lg:text-lg inline-block">JEANS</h5>
        </div>
      </div>
      {/* end-auto-slider */}
      {/* new-arrivals */}
      <div className="pt-16 md:pt-20 pb-6 md:pb-16 px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-16 md:gap-2">
          <div className="w-full md:w-1/2 lg:w-2/5">
            <h1 className="text-4xl sm:text-6xl lg:text-9xl mb-0 sm:mb-6">
              new arrivals
            </h1>
          </div>
          <div className="w-full md:w-1/2 lg:w-3/12 self-end">
            <h1 className="text-4xl mb-4">stay ahead of the trends</h1>
            <p className="font-extralight">
              discover the latest additions to our collection. Fresh styles,
              trending designs, and must have pieces - just in!
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-12">
        {!productsData ? (
          <Loader />
        ) : (
          <ProductsSlider productsData={productsData} />
        )}
      </div>
      <NavLink
        to="/FreshDrops"
        className={
          "px-6 lg:px-12 pt-6 flex justify-end underline text-2xl font-medium hover:no-underline transition duration-300 ease-in-out delay-150"
        }
      >
        view all
      </NavLink>
      {/* end-new-arrivals */}
      {/* categories */}
      <div className="mt-16 py-16 md:py-20 px-6 lg:px-12 bg-black flex flex-col">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl text-white mb-10 md:mb-0">
          categories
        </h1>
        <div className="text-white w-full md:w-1/3 lg:w-1/4 self-end">
          <h3 className="text-2xl mb-2 md:mb-4">find your perfect match</h3>
          <p className="font-extralight text-lightblack text-sm">
            browse through our curated selections and discover styles that suit
            every occasion.
          </p>
        </div>
        <Category />
        <div className="flex justify-end mt-8">
          <span className="text-white underline cursor-pointer">view all</span>
        </div>
      </div>
      {/* end-categories */}
      {/* best-sales */}
      <div className="py-16 md:py-20 px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-16 md:gap-2">
          <div className="w-full md:w-1/2 lg:w-2/5">
            <h1 className="text-4xl sm:text-6xl lg:text-9xl mb-0 sm:mb-6">
              best sales
            </h1>
          </div>
          <div className="w-full md:w-1/2 lg:w-3/12 self-end">
            <h2 className="text-3xl mb-4">don't miss out</h2>
            <p className="font-extralight">
              shop our top deals and grap your favourites at unbeatable prices
              before they're gone!
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-12">
        {!productsData ? (
          <Loader />
        ) : (
          <ProductsSlider productsData={productsData} />
        )}
      </div>
      <NavLink
        to="/BestSales"
        className={
          "px-6 lg:px-12 pt-6 flex justify-end underline text-2xl font-medium hover:no-underline transition duration-300 ease-in-out delay-150"
        }
      >
        view all
      </NavLink>
      {/* end-best-sales */}
      {/* why-us */}
      <div className="my-16 py-16 md:py-20 px-6 lg:px-12 bg-black flex flex-col text-white">
        <div className="flex flex-col md:flex-row gap-2 sm:gap-8 md:gap-0 justify-between">
          <div className="w-full sm:w-1/4">
            <p className="text-white mb-4 text-sm">
              hatch - empowering brands to break through
            </p>
            <p className="text-lightblack text-xs">
              Get informed get quick response to your questions through{" "}
              <span className="underline text-white cursor-pointer">
                this link
              </span>
            </p>
          </div>
          <h3 className="text-2xl sm:text-4xl lg:text-5xl w-full sm:w-2/4 lg:w-2/5 md:text-end font-extralight">
            "connect{" "}
            <span className="text-blackmuted">
              with <br /> emerging brands and discover quality products at great
              prices - all
            </span>{" "}
            in one place with hatch.
          </h3>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 justify-between mt-6 sm:mt-16">
          <h1 className="text-4xl md:text-8xl md:w-1/5">why htach?</h1>
          <div className="w-full md:w-1/4 flex flex-col gap-8">
            <i className="fa-solid fa-arrow-right origin-center -rotate-45 text-5xl self-end w-fit hidden md:block"></i>
            <div className="mb-8">
              <h4 className="text-xl mb-4">01</h4>
              <h4 className="text-xl mb-4">INCLUSIVE COLLABORATION</h4>
              <p className="text-lightblack text-sm">
                Beyond photography, we empower diverse creatives , including
                under privileged talents.
              </p>
            </div>
            <div>
              <h4 className="text-xl mb-4">02</h4>
              <h4 className="text-xl mb-4">UNIQUE & CINEMATIC CONCEPT</h4>
              <p className="text-lightblack text-sm">
                Every shot tells a story, crafted with cinematic lighting &
                composition.
              </p>
            </div>
            <i className="fa-solid fa-arrow-right origin-center rotate-45 text-5xl self-end w-fit hidden md:block"></i>
          </div>
        </div>
      </div>
      {/* end-why-us */}
    </>
  );
}

export default Home;
