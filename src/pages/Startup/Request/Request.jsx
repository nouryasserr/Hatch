function Request() {
  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div>
          <h2 className="text-3xl mb-0.5">send request to factory</h2>
          <p className="text-lightblack text-sm">
            fill in the details below to send a request for product
            manufacturing
          </p>
        </div>
        <div className="my-4">
          <h4 className="text-xl mb-0.5">request details</h4>
          <p className="text-lightblack text-sm">
            tell us more about what you need
          </p>
        </div>
        <form>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="flex items-start gap-2 mb-2"
            >
              <span className="text-lg">description</span>
              <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="enter description"
              name="description"
              id="description"
              className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="delivery_date"
              className="flex items-start gap-2 mb-2"
            >
              <span className="text-lg">delivery date</span>
              <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="2025-07-09"
              id="delivery_date"
              name="delivery_date"
              className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="flex items-start gap-2 mb-2">
              <span className="text-lg">image</span>
              <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
            </label>
            <input
              type="file"
              autoComplete="on"
              id="image"
              name="image"
              className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
            />
          </div>
          <button
            className={
              "w-full mt-4 bg-primary rounded-full py-1.5 px-6 text-white border border-primary hover:border-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
            }
          >
            send request
          </button>
        </form>
      </div>
    </>
  );
}

export default Request;
