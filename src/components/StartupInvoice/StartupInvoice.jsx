function StartupInvoice({ orderDetails }) {
  if (!orderDetails) return <div>Loading...</div>;

  const subtotal = Number(orderDetails.price) * orderDetails.quantity;
  const shippingFee = 50;
  const grandTotal = subtotal + shippingFee;

  return (
    <>
      <div>
        <div className="border-2 border-black px-6 py-8">
          <h5 className="text-xl lg:text-3xl mb-6">order summary</h5>
          <div>
            <div className="flex justify-between mb-4">
              <p>
                {orderDetails.product.name} (x{orderDetails.quantity})
              </p>
              <p>{subtotal.toFixed(2)} EGP</p>
            </div>
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

export default StartupInvoice;
