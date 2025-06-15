function StartupInvoice({ orderDetails }) {
  if (!orderDetails) return <div>Loading...</div>;

  const items = Array.isArray(orderDetails) ? orderDetails : [orderDetails];
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );
  const shippingFee = 50;
  const grandTotal = subtotal + shippingFee;

  return (
    <>
      <div>
        <div className="border-2 border-black px-6 py-8">
          <h5 className="text-xl lg:text-3xl mb-6">order summary</h5>
          <div>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between mb-4">
                <p>
                  {item.product.name} (x{item.quantity})
                </p>
                <p>{(Number(item.price) * item.quantity).toFixed(2)} EGP</p>
              </div>
            ))}
            <hr className="my-8" />
          </div>
          <div>
            <div className="flex justify-between mb-4 text-lightblack">
              <p>total price (items)</p>
              <p>{subtotal.toFixed(2)} EGP</p>
            </div>
            <div className="flex justify-between mb-4 text-lightblack">
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
