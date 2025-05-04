import product from "../../assets/imgs/product.jpg";

function CartProduct() {
  return (
    <>
      <div className="px-6 md:pl-6 lg:pl-12">
        <div className="py-4 pt-6 border-t border-slate-300 flex flex-col xs:flex-row gap-6 xs:gap-0 items-center justify-between">
          <div className="flex items-center gap-8">
            <input
              type="checkbox"
              name="checkbox"
              className="hidden xs:block w-6 lg:w-8 h-6 lg:h-8 appearance-none border-2 border-black rounded checked:bg-black checked:border-black checked:after:content-['✔'] checked:after:text-white checked:after:text-lg checked:after:flex checked:after:justify-center checked:after:items-center"
            />
            <img src={product} alt="product" className="w-28 lg:w-48" />
            <div>
              <p className="text-zinc-400 text-xs lg:text-sm lg:mb-2">
                category name
              </p>
              <h5 className="text-lg lg:text-xl lg:mb-2">product name</h5>
              <h4 className="text-lg lg:text-2xl">1200 EGP</h4>
            </div>
          </div>
          <div className="flex items-center justify-between w-full xs:w-fit">
            <input
              type="checkbox"
              name="checkbox"
              className="block xs:hidden w-6 lg:w-8 h-6 lg:h-8 appearance-none border-2 border-black rounded checked:bg-black checked:border-black checked:after:content-['✔'] checked:after:text-white checked:after:text-lg checked:after:flex checked:after:justify-center checked:after:items-center"
            />
            <div className="flex items-center gap-4 text-lg lg:text-2xl">
              <i className="fa-solid fa-minus border border-zinc-300 p-1.5 px-2 lg:p-2 lg:px-2.5 rounded-sm"></i>
              <span className="text-sm">1</span>
              <i className="fa-solid fa-plus border border-zinc-900 p-1.5 px-2 lg:p-2 lg:px-2.5 rounded-sm"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProduct;
