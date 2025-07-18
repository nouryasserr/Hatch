import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
function Invoice() {
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
              <p>total price (item)</p>
              <p>{subtotal.toFixed(2)} EGP</p>
            </div>
            <div className="flex justify-between mb-4 text-zinc-400">
              <p>shipping tax & fee</p>
              <p>{shippingFee.toFixed(2)} EGP</p>
            </div>
            <div className="flex justify-between mb-4">
              <p>grand total</p>
              <p>{grandTotal.toFixed(2)} EGP</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
