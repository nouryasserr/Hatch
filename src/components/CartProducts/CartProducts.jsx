import React, { useState } from "react";
import "../Cart/cartProducts.css";
import zazaExample from "../../assets/imgs/zazaExample.png";
import ProductCard from "../Product/Product";

function CartProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 1200,
      categoryName: "T-Shirts",
      image: zazaExample, // صورة مؤقتة
      checked: false,
    },
    {
      id: 2,
      name: "Product 2",
      price: 1200,
      categoryName: "Jackets",
      image: { zazaExample }, // صورة مؤقتة
      checked: false,
    },
    {
      id: 3,
      name: "Product 3",
      price: 1200,
      categoryName: "Accessories",
      image: { zazaExample }, // صورة مؤقتة
      checked: false,
    },
  ]);

  const allChecked = products.every((p) => p.checked);
  const someChecked = products.some((p) => p.checked);

  const toggleSelectAll = () => {
    const updated = products.map((p) => ({ ...p, checked: !allChecked }));
    setProducts(updated);
  };

  const toggleProduct = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, checked: !p.checked } : p
    );
    setProducts(updated);
  };

  return (
    <>
      <div className=" m-6 ">
        <div className="p-6 grid xl:grid-cols-12 ">
          <div className="xl:col-span-8">
            <div className=" header mb-4">
              <h2 className=" text-4xl mb-2">shopping cart</h2>
              <span className=" blackMuted70">
                showing 3 products you added
              </span>
            </div>

            <div className="line w-100 mb-6"></div>

            <div className="grid grid-cols-12">
              <div className=" col-span-8 ">
                <label className="flex items-center  ">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 accent-black cursor-pointer "
                  />
                  <span className="mx-3 ">select all</span>

                  <div
                    className="bg-black w-6 h-6 rounded-full flex items-center
                                justify-center text-white "
                  >
                    {products.length}
                  </div>
                </label>
              </div>
              <div className=" col-span-4 text-end ">
                <span className="red underline cursor-pointer">delete</span>
              </div>
            </div>

            <div className="repeatedforMAP">
              <div className="line w-100 my-6"></div>

              <div className="grid grid-cols-12 gap-x-4">
                <label className="flex items-center mb-4 col-span-1 lg:col-span-1 xl:col-span-1">
                  <input
                    type="checkbox"
                    checked={someChecked}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </label>

                <div className="col-span-11 lg:col-span-3 xl:col-span-3 dehsorabs portrait rounded-md relative hoverable flex justify-center items-center mb-4 sm:mb-0">
                  <img
                    src={zazaExample}
                    alt="product"
                    className="w-full imgExample"
                  />
                </div>

                <div
                  className="ms-3 col-span-12 lg:col-span-4 xl:col-span-4 text-center self-center justify-center space-y-2
                                xl:text-start
                                lg:text-start
                                md:text-center md:my-4
                                sm:text-center sm:my-4
                                xs:text-center xs:pb-2 "
                >
                  <span className="block text-sm blackMuted70">
                    category name
                  </span>
                  <span className="block text-2xl">product name</span>
                  <div>
                    <span className="text-2xl">1200</span>
                    <span className="text-2xl"> EGP</span>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-2 xl:col-span-2"></div>

                <div className="col-span-12 lg:col-span-2 xl:col-span-2 grid grid-cols-3">
                  <div className="flex justify-start self-center items-center">
                    <button className="flex justify-center self-center items-center h-10 w-10 border-black border cursor-pointer">
                      <i class="fa-solid fa-minus"></i>
                    </button>
                  </div>
                  <div className="text-center flex justify-center self-center">
                    <span>1</span>
                  </div>
                  <div className="flex justify-end self-center items-center">
                    <button className="h-10 w-10 border-black border cursor-pointer text-3xl font-thin">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="repeatedforMAP">
              <div className="line w-100 my-6"></div>

              <div className="grid grid-cols-12 gap-x-4">
                <label className="flex items-center mb-4 col-span-1 lg:col-span-1 xl:col-span-1">
                  <input
                    type="checkbox"
                    checked={someChecked}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </label>

                <div className="col-span-11 lg:col-span-3 xl:col-span-3 dehsorabs portrait rounded-md relative hoverable flex justify-center items-center mb-4 sm:mb-0">
                  <img
                    src={zazaExample}
                    alt="product"
                    className="w-full imgExample"
                  />
                </div>

                <div
                  className="ms-3 col-span-12 lg:col-span-4 xl:col-span-4 text-center self-center justify-center space-y-2
                                xl:text-start
                                lg:text-start
                                md:text-center md:my-4
                                sm:text-center sm:my-4
                                xs:text-center xs:pb-2 "
                >
                  <span className="block text-sm blackMuted70">
                    category name
                  </span>
                  <span className="block text-2xl">product name</span>
                  <div>
                    <span className="text-2xl">1200</span>
                    <span className="text-2xl"> EGP</span>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-2 xl:col-span-2"></div>

                <div className="col-span-12 lg:col-span-2 xl:col-span-2 grid grid-cols-3">
                  <div className="flex justify-start self-center items-center">
                    <button className="flex justify-center self-center items-center h-10 w-10 border-black border cursor-pointer">
                      <i class="fa-solid fa-minus"></i>
                    </button>
                  </div>
                  <div className="text-center flex justify-center self-center">
                    <span>1</span>
                  </div>
                  <div className="flex justify-end self-center items-center">
                    <button className="h-10 w-10 border-black border cursor-pointer text-3xl font-thin">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div></div>
          </div>

          <div className="xl:col-span-4  "></div>
        </div>

        <div className=" mt-12 grid grid-cols-12 self-center px-6 mb-2">
          <div className="col-span-8 flex items-end">
            <h2 className="text-4xl mb-2">similar products</h2>
          </div>
          <div className="col-span-4">
            <div className="flex justify-end items-center h-full">
              <span className="underline">view all</span>
            </div>
          </div>
        </div>
        <div className="mb-24">
          <ProductCard />
        </div>
      </div>
    </>
  );
}

export default CartProducts;
