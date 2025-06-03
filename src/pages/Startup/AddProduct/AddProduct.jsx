import { Link } from "react-router-dom";
function AddProduct() {
  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div>
          <h2 className="text-3xl mb-0.5">add new product</h2>
          <p className="text-lightblack text-sm">
            let's bring your product to life!
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="w-full lg:w-3/4">
            <div className="mb-4 mt-8">
              <h4 className="text-xl mb-0.5">
                does this product have sizes and/or colors?
              </h4>
              <p className="text-lightblack text-sm">
                if yes, you'll be able to add and manage each variant. if not,
                you can skip this step
              </p>
            </div>
            <form>
              <div className="xs:w-2/3">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="w-full">
                    <label
                      htmlFor="color"
                      className="flex items-start gap-2 mb-2"
                    >
                      <span className="text-lg">color name</span>
                    </label>
                    <input
                      type="text"
                      autoComplete="on"
                      placeholder="enter color name"
                      name="color"
                      id="color"
                      className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="code"
                      className="flex items-start gap-2 mb-2"
                    >
                      <span className="text-lg">color code</span>
                    </label>
                    <input
                      type="text"
                      autoComplete="on"
                      placeholder="enter color code"
                      name="code"
                      id="code"
                      className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="w-full">
                    <label
                      htmlFor="color"
                      className="flex items-start gap-2 mb-2"
                    >
                      <span className="text-lg">color name</span>
                    </label>
                    <input
                      type="text"
                      autoComplete="on"
                      placeholder="enter color name"
                      name="color"
                      id="color"
                      className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="code"
                      className="flex items-start gap-2 mb-2"
                    >
                      <span className="text-lg">color code</span>
                    </label>
                    <input
                      type="text"
                      autoComplete="on"
                      placeholder="enter color code"
                      name="code"
                      id="code"
                      className="border border-blackmuted px-2 py-1.5 pb-2 placeholder:text-xs placeholder:font-light focus:outline-none focus:border-2 w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="flex items-start gap-2 mb-2">
                  <span className="text-lg">size</span>
                </label>
                <div className="flex gap-4 flex-wrap">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <label
                      key={size}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        className="hidden peer"
                      />
                      <div className="py-2 w-12 text-sm text-center text-lightblack border border-lightblack peer-checked:border-2 peer-checked:border-black peer-checked:text-black transition duration-300 ease-in-out delay-150">
                        {size}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <button
                className={
                  "w-full xs:w-2/3 mt-4 bg-primary rounded-full py-1.5 px-6 text-white border border-primary hover:border-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
                }
              >
                save & next
              </button>
              <Link
                to={"/Startup/AddProduct2"}
                className="w-full xs:w-2/3 block text-center mt-4 underline hover:no-underline transition duration-300 ease-in-out delay-150"
              >
                skip & next
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
