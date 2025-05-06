function DeliveryAddress() {
  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center mb-4">
          <h4 className="text-2xl">delivery address</h4>
          <button className="flex items-center gap-2 py-2 px-4 border border-blackmuted rounded-full hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150">
            <i className="fa-solid fa-plus"></i>
            <span>Add New Address</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-location-dot bg-stone-100 py-2 px-3.5 rounded-full text-xl"></i>
          <div>
            <h5 className="text-lg">ziad's home</h5>
            <p className="text-xs text-zinc-400">
              15 a - hada2ek el ahram - giza
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryAddress;
