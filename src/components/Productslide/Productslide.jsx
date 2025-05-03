import "./ProductSlide.css";
import Product from "../Product/Product";

function ProductSlide() {
  return (
    <>
      <Product />
      <div className=" grid xl:grid-cols-5 lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-6  p-4">
        <div className="col-span-4 xl:col-span-4 lg:col-span-0 md:col-span-0 sm:col-span-0"></div>
        <div className=" grid grid-cols-3 mx-4 ">
          <button className=" button2 me-4 py-3 flex justify-center justify-items-start">
            <div className="arrow-wrapper-two">
              <div className="arrow-two"></div>
            </div>
          </button>
          <div className=" flex justify-center pt-1">
            <span className=" text-black underline">01</span>
            <span className=" blackMuted70 ">/03</span>
          </div>
          <button className=" button1 ms-4 py-3 flex justify-center justify-items-end">
            <div className="arrow-wrapper">
              <div className="arrow"></div>
            </div>
          </button>
        </div>
      </div>
      <div className="flex justify-end mx-4 mt-3">
        <span className="me-4 underline">view all</span>
      </div>
    </>
  );
}

export default ProductSlide;
