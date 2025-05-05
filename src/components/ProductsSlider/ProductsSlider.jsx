function ProductsSlider() {
  return (
    <>
      <div className="mx-6 lg:mx-12 mt-8 md:mt-16 flex items-center justify-end gap-4 lg:gap-7 xl:gap-8  text-sm lg:text-xl">
        <i className="fa-solid fa-arrow-left border border-black py-1.5 pt-1.5 pt-2 px-6 rounded-full hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150 cursor-pointer"></i>
        <p className="text-zinc-500 ">
          <span className="underline text-black">01</span>/05
        </p>
        <i className="fa-solid fa-arrow-right border border-black bg-black text-white py-1 py-1.5 pt-1.5 pt-2 px-6 rounded-full hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150 cursor-pointer"></i>
      </div>
    </>
  );
}

export default ProductsSlider;
