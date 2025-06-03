function Invoice() {
  return (
    <>
      <div className="border-2 border-black px-6 py-8">
        <h5 className="text-xl lg:text-3xl mb-6">order summary</h5>
        <div>
          <div className="flex justify-between mb-4">
            <p>product name</p>
            <p>1200 EGP</p>
          </div>
          <div className="flex justify-between mb-4">
            <p>product name</p>
            <p>1200 EGP</p>
          </div>
          <hr className="my-8" />
        </div>
        <div>
          <div className="flex justify-between mb-4 text-zinc-400">
            <p>total price (item)</p>
            <p>2650 EGP</p>
          </div>
          <div className="flex justify-between mb-4 text-zinc-400">
            <p>shipping tax & fee</p>
            <p>50 EGP</p>
          </div>
          <div className="flex justify-between mb-4">
            <p>grand total</p>
            <p>2700 EGP</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
