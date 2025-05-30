import hatch01 from "../../assets/imgs/hatch01.jpeg";
function StartupOrder() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <div className="flex items-center ">
          <p className="w-11 mr-2">1</p>
          <img
            src={
              hatch01?.[0] || "https://placehold.co/200x200?text=Product+Image"
            }
            alt="product"
            className="mr-6 object-contain object-center rounded-md"
            onError={(e) => {
              e.target.src = "https://placehold.co/100x100?text=Product+Image";
            }}
          />
        </div>
        <div className="flex justify-between grow flex-wrap gap-2">
          <h6 className="font-medium text-sm sm:text-base">product name</h6>
          <h6 className="font-medium text-sm sm:text-base">category</h6>
          <h6 className="font-medium text-sm sm:text-base">color</h6>
          <h6 className="font-medium text-sm sm:text-base">size</h6>
          <h6 className="font-medium text-sm sm:text-base">quantity</h6>
          <h6 className="font-medium text-sm sm:text-base">price per unit</h6>
          <h6 className="font-medium text-sm sm:text-base">total price</h6>
        </div>
      </div>
    </>
  );
}

export default StartupOrder;
