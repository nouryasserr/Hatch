import zazaExample from "../../assets/imgs/zazaExample.png";
import "../Product/product.css";

const Product = () => {
  return (
    <>
      <div className="px-6 lg:px-12">
        <div className=" grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-6  p-4">
          <div className=" decardKolhyasta rounded-md bg-transparent ">
            <div className=" dehsorabs portrait rounded-t-md relative hoverable">
              <img
                src={zazaExample}
                alt="product"
                className=" w-full imgExample"
              />
              <div
                className=" absolute top-3 right-3 bg-primary
            rounded-sm text-sm text-white px-3 py-1"
              >
                New
              </div>
            </div>
            <div className="elKalam px-4 py-4 bg-white rounded-b-md">
              <div className=" grid grid-cols-6">
                <div className=" col-span-4 font-medium text-xl">
                  product name
                </div>
                <div className=" col-span-2 blackMuted50 pt-2 text-sm text-end">
                  500 EGP
                </div>
              </div>

              <div className=" grid grid-cols-6 mb-4">
                <div className=" col-span-4 blackMuted50  text-xs">
                  brand name
                </div>
                <div className=" col-span-2 red line-through  text-xs text-end">
                  750 EGP
                </div>
              </div>

              <div className=" grid grid-cols-6 gap-2">
                <div className=" col-span-4 bg-black text-sm rounded-full px-6 py-2 text-center borderTransparent text-white">
                  add to cart
                </div>

                <div className="col-span-2 rounded-full border bordercolor flex items-center justify-center ml-auto w-full h-full">
                  <i className="fa-regular fa-heart blackMuted50"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="decardKolhyasta rounded-md bg-transparent   ">
            <div className=" dehsorabs portrait rounded-t-md relative hoverable">
              <img
                src={zazaExample}
                alt="product"
                className=" w-full imgExample"
              />
              <div
                className=" absolute top-3 right-3 bg-primary
            rounded-sm text-sm text-white px-3 py-1"
              >
                New
              </div>
            </div>
            <div className="elKalam px-4 py-4 bg-white rounded-b-md">
              <div className=" grid grid-cols-9">
                <div className=" col-span-6 font-medium text-xl">
                  product name
                </div>
                <div className=" col-span-3 blackMuted50 pt-2 text-sm text-end">
                  500 EGP
                </div>
              </div>
              <div className=" grid grid-cols-6 mb-4">
                <div className=" col-span-4 blackMuted50  text-xs">
                  brand name
                </div>
                <div className=" col-span-2 red line-through  text-xs text-end"></div>
              </div>
              <div className=" grid grid-cols-6 gap-2">
                <div className=" col-span-4 bg-white borderBlack text-sm rounded-full px-6 py-2  text-center underline text-black">
                  remove
                </div>
                <div className="col-span-2 favorite rounded-full border bordercolor flex items-center justify-center ml-auto w-full h-full">
                  <i className="fa-solid fa-heart text-white"></i>
                </div>
              </div>
            </div>
          </div>
          <div className=" decardKolhyasta rounded-md bg-transparent ">
            <div className=" dehsorabs portrait rounded-t-md relative hoverable">
              <img
                src={zazaExample}
                alt="product"
                className=" w-full imgExample"
              />
              <div
                className=" absolute top-3 right-3 bg-primary
            rounded-sm text-sm text-white px-3 py-1"
              >
                New
              </div>
            </div>

            <div className="elKalam px-4 py-4 bg-white rounded-b-md">
              <div className=" grid grid-cols-6">
                <div className=" col-span-4 font-medium text-xl">
                  product name
                </div>
                <div className=" col-span-2 blackMuted50 pt-2 text-sm text-end">
                  500 EGP
                </div>
              </div>

              <div className=" grid grid-cols-6 mb-4">
                <div className=" col-span-4 blackMuted50  text-xs">
                  brand name
                </div>
                <div className=" col-span-2 red line-through  text-xs text-end">
                  750 EGP
                </div>
              </div>
              <div className=" grid grid-cols-6 gap-2">
                <div className=" col-span-4 bg-black text-sm rounded-full px-6 py-2 text-center borderTransparent text-white">
                  add to cart
                </div>
                <div className="col-span-2 rounded-full border bordercolor flex items-center justify-center ml-auto w-full h-full">
                  <i className="fa-regular fa-heart blackMuted50"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="decardKolhyasta rounded-md bg-transparent   ">
            <div className=" dehsorabs portrait rounded-t-md relative hoverable">
              <img
                src={zazaExample}
                alt="product"
                className=" w-full imgExample"
              />
              <div
                className=" absolute top-3 right-3 bg-primary
            rounded-sm text-sm text-white px-3 py-1"
              >
                New
              </div>
            </div>
            <div className="elKalam px-4 py-4 bg-white rounded-b-md">
              <div className=" grid grid-cols-9">
                <div className=" col-span-6 font-medium text-xl">
                  product name
                </div>
                <div className=" col-span-3 blackMuted50 pt-2 text-sm text-end">
                  500 EGP
                </div>
              </div>
              <div className=" grid grid-cols-6 mb-4">
                <div className=" col-span-4 blackMuted50  text-xs">
                  brand name
                </div>
                <div className=" col-span-2 red line-through  text-xs text-end"></div>
              </div>
              <div className=" grid grid-cols-6 gap-2">
                <div className=" col-span-4 bg-white borderBlack text-sm rounded-full px-6 py-2  text-center underline text-black">
                  remove
                </div>
                <div className="col-span-2 favorite rounded-full border bordercolor flex items-center justify-center ml-auto w-full h-full">
                  <i className="fa-solid fa-heart text-white"></i>
                </div>
              </div>
            </div>
          </div>
          <div className=" decardKolhyasta rounded-md bg-transparent ">
            <div className=" dehsorabs portrait rounded-t-md relative hoverable">
              <img
                src={zazaExample}
                alt="product"
                className=" w-full imgExample"
              />
              <div
                className=" absolute top-3 right-3 bg-primary
            rounded-sm text-sm text-white px-3 py-1"
              >
                New
              </div>
            </div>
            <div className="elKalam px-4 py-4 bg-white rounded-b-md">
              <div className=" grid grid-cols-6">
                <div className=" col-span-4 font-medium text-xl">
                  product name
                </div>
                <div className=" col-span-2 blackMuted50 pt-2 text-sm text-end">
                  500 EGP
                </div>
              </div>
              <div className=" grid grid-cols-6 mb-4">
                <div className=" col-span-4 blackMuted50  text-xs">
                  brand name
                </div>
                <div className=" col-span-2 red line-through  text-xs text-end">
                  750 EGP
                </div>
              </div>
              <div className=" grid grid-cols-6 gap-2">
                <div className=" col-span-4 bg-black text-sm rounded-full px-6 py-2 text-center borderTransparent text-white">
                  add to cart
                </div>
                <div className="col-span-2 rounded-full border bordercolor flex items-center justify-center ml-auto w-full h-full">
                  <i className="fa-regular fa-heart blackMuted50"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
