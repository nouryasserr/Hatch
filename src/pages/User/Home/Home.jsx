import Category from "../../../components/Category/Category";
import { useState, useEffect, useRef } from "react";
import ProductsSlider from "../../../components/ProductsSlider/ProductsSlider";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import hatch01 from "../../../assets/imgs/hatch01.jpeg";
import hatch02 from "../../../assets/imgs/hatch02.avif";
import {
  getBestSellersProducts,
  getNewArrivalsProducts,
} from "../../../apis/productsApis";

const slides = [
  {
    title: "exclusive",
    subtitle: "hatch objectives",
    paragraph:
      "Real-world examples of how we have helped companies achieve their marketing objectives.",
    bg: "url('https://images.pexels.com/photos/5930091/pexels-photo-5930091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
  },
  {
    title: "online-ready",
    subtitle: "digital storefront",
    paragraph:
      "Easily launch your online shop and start selling your products to a wider audience.",
    bg: "url('https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
  },
  {
    title: "connected",
    subtitle: "supplier network",
    paragraph:
      "Discover trusted suppliers and build reliable partnerships to grow your brand.",
    bg: "url('https://images.pexels.com/photos/162487/old-factory-dusty-large-space-emptiness-162487.jpeg?auto=compress&cs=tinysrgb&w=600')",
  },
];
function Home() {
  const [current, setCurrent] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade");
  const nextSlide = () => {
    setFadeClass("");
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setFadeClass("fade");
    }, 50);
  };
  const prevSlide = () => {
    setFadeClass("");
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      setFadeClass("fade");
    }, 50);
  };
  const { title, subtitle, paragraph, bg } = slides[current];
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivalsLoading, setNewArrivalsLoading] = useState(true);
  const [bestSellersLoading, setBestSellersLoading] = useState(true);
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  async function getCategories() {
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/general/subcategory",
        method: "GET",
      };
      const response = await axios.request(options);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  useEffect(() => {
    getCategories();
    getBestSellersProducts()
      .then((res) => {
        setBestSellers(res.data);
        setNewArrivalsLoading(false);
      })
      .catch((e) => {
        console.error("Error fetching best sellers:", e);
      });
    getNewArrivalsProducts()
      .then((res) => {
        setBestSellersLoading(false);
        setNewArrivals(res.data);
      })
      .catch((e) => {
        console.error("Error fetching best new arrivals:", e);
      });
  }, []);
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
  return (
    <>
      {/* main-slider */}
      <div className="p-6 pt-0">
        <div
          className={`h-[300px] md:h-[500px] lg:h-[550px] w-full rounded-3xl py-6 md:py-16 px-6 flex flex-col sm:flex-row sm:items-center justify-end sm:justify-between transition-all duration-500 ${fadeClass}`}
          style={{
            backgroundImage: bg,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-3/5 md:w-3/4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 sm:mb-0">
            {title}
          </div>
          <div className="w-full sm:w-1/3 xl:w-1/5 self-end">
            <h6 className="text-white mb-2 md:mb-4 text-base md:text-lg">
              {subtitle}
            </h6>
            <p className="text-lightblack text-sm md:text-base">{paragraph}</p>
          </div>
        </div>
      </div>
      <div className="mx-6 flex md:hidden justify-end items-center gap-2 text-xs">
        <button
          onClick={prevSlide}
          className="fa-solid fa-arrow-left border border-black py-1.5 px-5 rounded-full hover:bg-black hover:text-white transition"
        ></button>
        <p className="text-lightblack">
          <span className="underline text-black">
            {String(current + 1).padStart(2, "0")}
          </span>
          /{String(slides.length).padStart(2, "0")}
        </p>
        <button
          onClick={nextSlide}
          className="fa-solid fa-arrow-right border border-black bg-black text-white py-1.5 px-5 rounded-full hover:bg-transparent hover:text-black transition"
        ></button>
      </div>
      <div className="px-6 lg:px-12 pt-6 md:pt-0 pb-6 flex flex-wrap sm:flex-nowrap gap-2 justify-center sm:justify-between items-center">
        <h4 className="text-base lg:lg:text-xl font-medium sm:w-52 md:w-56 lg:w-60 xl:w-64">
          est 2025
        </h4>
        <h4 className="text-base lg:text-xl font-medium text-center">
          empowering brands to break through
        </h4>
        <div className="hidden md:flex items-center gap-4 lg:gap-7 xl:gap-8  text-xs lg:text-xl">
          <button
            onClick={prevSlide}
            className="fa-solid fa-arrow-left border border-black py-1.5 pt-2 px-6 rounded-full hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150"
          ></button>
          <p className="text-lightblack">
            <span className="underline text-black">
              {String(current + 1).padStart(2, "0")}
            </span>
            /{String(slides.length).padStart(2, "0")}
          </p>
          <button
            onClick={nextSlide}
            className="fa-solid fa-arrow-right border border-black bg-black text-white py-1.5 pt-2 px-6 rounded-full hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
          ></button>
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
        {newArrivalsLoading ? (
          <Loader />
        ) : (
          <ProductsSlider productsData={newArrivals} />
        )}
      </div>
      <NavLink
        to="/User/FreshDrops"
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
        <div className="flex flex-wrap gap-6 mt-16 text-white">
          {categories.slice(0, 10).map((subcategory, index) => (
            <Category
              key={subcategory.id}
              subcategory={subcategory}
              index={index}
            />
          ))}
        </div>
        <NavLink to="/User/Categories" className={"flex justify-end mt-8"}>
          <span className="text-white underline cursor-pointer hover:no-underline transition duration-300 ease-in-out delay-150">
            view all
          </span>
        </NavLink>
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
        {bestSellersLoading ? (
          <Loader />
        ) : (
          <ProductsSlider productsData={bestSellers} />
        )}
      </div>
      <NavLink
        to="/User/BestSales"
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
          <h1 className="text-4xl md:text-8xl md:w-1/5">why hatch?</h1>
          <div className="w-full md:w-1/4 flex flex-col gap-8">
            <i className="fa-solid fa-arrow-right origin-center -rotate-45 text-5xl self-end w-fit hidden md:block"></i>
            <div className="mb-8">
              <h4 className="text-xl mb-4">01</h4>
              <h4 className="text-xl mb-4">
                built for brands that start small
              </h4>
              <p className="text-lightblack text-sm">
                we know what it's like to build from scratch. hatch gives you
                the tools to grow without the noise.
              </p>
            </div>
            <div>
              <h4 className="text-xl mb-4">02</h4>
              <h4 className="text-xl mb-4">production made possible</h4>
              <p className="text-lightblack text-sm">
                from idea to factory floor, we help startups turn bold concepts
                into real products. simply and smartly.
              </p>
            </div>
            <i className="fa-solid fa-arrow-right origin-center rotate-45 text-5xl self-end w-fit hidden md:block"></i>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-16">
          <div className="grow">
            <img src={hatch01} className="md:h-72 lg:h-96 rounded w-full" />
          </div>
          <div className="grow">
            <img src={hatch02} className="md:h-72 lg:h-96 rounded w-full" />
          </div>
        </div>
      </div>
      {/* end-why-us */}
    </>
  );
}

export default Home;
