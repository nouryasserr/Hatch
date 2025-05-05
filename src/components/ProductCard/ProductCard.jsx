import product from "../../assets/imgs/product.jpg";

function ProductCard() {
  return (
    <>
      <div className="max-w-64 relative">
        <span className="absolute right-1 top-3 bg-black text-white font-extralight px-2.5 py-0.5 rounded-sm">
          New
        </span>
        <img src={product} alt="product" className="object-cover" />
        <div className="py-4 px-1.5">
          <div className="flex justify-between">
            <h6 className="font-medium text-lg">product name</h6>
            <h6 className="text-zinc-500 text-lg">500 EGP</h6>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-zinc-400">brand name</p>
            <p className="text-secondary text-xs font-semibold line-through">
              750
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <button className="bg-black border border-black text-white py-1.5 px-2 rounded-full w-full hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150">
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
