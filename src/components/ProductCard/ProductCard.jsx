function ProductCard({ productInfo }) {
  const { imageCover, title, price } = productInfo;
  return (
    <>
      <div className="relative max-w-[300px]">
        <span className="absolute right-1 top-3 bg-black text-white font-extralight px-2.5 py-0.5 rounded-sm">
          New
        </span>
        <img
          src={imageCover}
          alt="product"
          className="object-cover h-64 w-full rounded-t"
        />
        <div className="py-4 px-1.5">
          <div className="flex justify-between gap-4">
            <h5 className="text-lg font-medium line-clamp-1">{title}</h5>
            <h5 className="text-lightblack text-lg text-nowrap">
              <span className="font-light">{price}</span> EGP
            </h5>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-lightblack">brand name</p>
            <p className="text-secondary text-xs font-semibold line-through">
              750 EGP
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <button className="text-sm font-light bg-black border border-black text-white py-1.5 px-2 rounded-full w-full hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150">
            add to cart
          </button>
          <button className="border border-zinc-400 py-1.5 px-7 rounded-full text-zinc-400 hover:bg-secondary hover:text-white hover:border-secondary">
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
