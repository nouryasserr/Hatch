function AddLocation({ onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-blackmuted bg-opacity-70">
        <div className="w-11/12 xs:w-96 md:w-1/2 lg:w-1/3 bg-white shadow-lg">
          <div className="flex items-center justify-between py-4 px-4 xs:px-6">
            <button onClick={onClose}>
              <i className="fa-solid fa-arrow-left text-lightblack"></i>
            </button>
            <h4 className="text-base xs:text-xl">your location</h4>
            <button onClick={onClose}>
              <i className="fa-solid fa-xmark text-lightblack"></i>
            </button>
          </div>
          <hr />
          <div className="py-4 md:py-6 px-4 xs:px-6">
            <div className="w-full h-52 relative mb-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=YourMapURL"
                allowFullScreen=""
                loading="lazy"
                className="w-full h-full"
              ></iframe>
              <button className="text-nowrap text-xs md:text-base absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center gap-2 border border-black bg-white py-1 px-3">
                <i className="fa-solid fa-location-crosshairs text-lightblack"></i>
                <span>use current location</span>
              </button>
            </div>
            <div className="mt-4 mb-2">
              <h5 className="pb-1 text-sm xs:text-lg font-light">
                your location
              </h5>
              <input
                type="text"
                autoComplete="on"
                name="location"
                placeholder="15 a - hada2ek el ahram - giza"
                className="py-2 px-2 xs:px-3 text-xs placeholder:text-zinc-400 w-full border border-blackmuted rounded-sm"
              />
            </div>
            <button
              onClick={onClose}
              className="mt-4 w-full my-2 bg-black border border-black rounded-full font-extralight text-sm text-white p-2 hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
            >
              continue to detail adress
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddLocation;
