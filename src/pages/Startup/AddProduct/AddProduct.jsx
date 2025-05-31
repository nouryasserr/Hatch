function AddProduct() {
  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="mb-6">
          <h2 className="text-3xl mb-0.5">add new product</h2>
          <p className="text-lightblack text-sm">
            let's bring your product to life!
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="w-full lg:w-1/2">
            <div className="mb-4">
              <h4 className="text-xl mb-0.5">product details</h4>
              <p className="text-lightblack text-sm">
                tell us more about your product
              </p>
            </div>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="flex items-start gap-2 mb-2">
                  <span className="text-lg">product name</span>
                  <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                </label>
                <input
                  type="text"
                  autoComplete="on"
                  placeholder="enter product name"
                  name="name"
                  id="name"
                  className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="description"
                  className="flex items-start gap-2 mb-2"
                >
                  <span className="text-lg">product description</span>
                  <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                </label>
                <input
                  type="text"
                  autoComplete="on"
                  placeholder="enter product description"
                  id="description"
                  name="description"
                  className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                />
              </div>
            </form>
            <div className="mb-4">
              <h4 className="text-xl mb-0.5">general info</h4>
              <p className="text-lightblack text-sm">
                add the essential details
              </p>
            </div>
            <form>
              <div className="flex gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="flex items-start gap-2 mb-2">
                    <span className="text-lg">category</span>
                    <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                  </label>
                  <input
                    type="text"
                    autoComplete="on"
                    placeholder="select category"
                    name="category"
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="flex items-start gap-2 mb-2">
                    <span className="text-lg">price</span>
                    <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                  </label>
                  <input
                    type="number"
                    autoComplete="on"
                    placeholder="enter product price"
                    name="price"
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <label htmlFor="name" className="flex items-start gap-2 mb-2">
                    <span className="text-lg">stock</span>
                    <i className="fa-solid fa-asterisk text-secondary text-xs"></i>
                  </label>
                  <input
                    type="number"
                    autoComplete="on"
                    placeholder="enter stock quantity"
                    name="stock"
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="flex items-start gap-2 mb-2">
                    <span className="text-lg">discount %</span>
                  </label>
                  <input
                    type="number"
                    autoComplete="on"
                    placeholder="enter discount percentage"
                    name="discount"
                    className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="mb-4">
              <h4 className="text-xl mb-0.5">product gallery</h4>
              <p className="text-lightblack text-sm">
                upload stunning photos of your product
              </p>
            </div>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="file-upload"
                  className="relative flex flex-col items-center justify-center h-80 w-80 lg:w-full border border-blackmuted text-black text-center cursor-pointer"
                >
                  <svg
                    className="w-16 h-16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M12 19V12M12 12L9.75 14.3333M12 12L14.25 14.3333M6.6 17.8333C4.61178 17.8333 3 16.1917 3 14.1667C3 12.498 4.09438 11.0897 5.59198 10.6457C5.65562 10.6268 5.7 10.5675 5.7 10.5C5.7 7.46243 8.11766 5 11.1 5C14.0823 5 16.5 7.46243 16.5 10.5C16.5 10.5582 16.5536 10.6014 16.6094 10.5887C16.8638 10.5306 17.1284 10.5 17.4 10.5C19.3882 10.5 21 12.1416 21 14.1667C21 16.1917 19.3882 17.8333 17.4 17.8333"
                        stroke="#404040"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                  <span className="text-blackmuted underline">
                    drop files here or click to upload
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      console.log(e.target.files[0]?.name);
                    }}
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
