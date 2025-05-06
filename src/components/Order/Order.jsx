import product from "../../assets/imgs/product.jpg";

function Order() {
  return (
    <>
      <div className="my-6 flex items-center h-fit">
        <img src={product} alt="product" className="w-32" />
        <div className="p-4">
          <p className="text-xs mb-1 text-zinc-400">category name</p>
          <h5 className="text-lg mb-2">product name</h5>
          <h5 className="text-lg mb-2">1200 EGP</h5>
          <p className="text-xs text-zinc-400">delivered 17 frbruary</p>
        </div>
      </div>
    </>
  );
}

export default Order;
