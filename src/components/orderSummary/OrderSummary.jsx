import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { NavLink } from "react-router-dom";
function OrderSummary() {
  const { cartInfo } = useContext(CartContext);
  if (!cartInfo) return <div>Loading...</div>;
  const subtotal = cartInfo.data.data.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = 50;
  const grandTotal = subtotal + shippingFee;
  return (
    <>
      <div className="px-6 lg:px-12">
        <div className="border-2 border-black px-6 py-8">
          <h5 className="text-xl lg:text-3xl mb-6">order summary</h5>
          <div>
            {cartInfo.data.data.map((item) => (
              <div key={item.id} className="flex justify-between mb-4">
                <p>
                  {item.name} (x{item.quantity})
                </p>
                <p>{(item.price * item.quantity).toFixed(2)} EGP</p>
              </div>
            ))}
            <hr className="my-8" />
          </div>
          <div>
            <div className="flex justify-between mb-4 text-zinc-400">
              <p>total price (items)</p>
              <p>{subtotal.toFixed(2)} EGP</p>
            </div>
            <div className="flex justify-between mb-4 text-zinc-400">
              <p>shipping tax & fee</p>
              <p>{shippingFee.toFixed(2)} EGP</p>
            </div>
            <div className="flex justify-between mb-4 font-bold">
              <p>grand total</p>
              <p>{grandTotal.toFixed(2)} EGP</p>
            </div>
          </div>
          <NavLink
            to={"/User/Checkout"}
            className="block text-center bg-black text-white rounded-full w-full p-3 mt-6 border border-black hover:bg-white hover:text-black transition duration-300 ease-in-out"
          >
            Checkout
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
