import { Link } from "react-router-dom";

function ProductDetail() {
  const sizes = ["M"];
  const colors = [{ name: "Light Coral", color: "#f08080" }];
  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="flex justify-between gap-2 flex-wrap">
          <div>
            <h2 className="text-3xl mb-0.5">product page</h2>
            <p className="text-lightblack text-sm">
              manage every detail of your product
            </p>
          </div>
          <Link className="border border-black p-2 px-4 flex items-center gap-2 h-fit hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150">
            <i className="fa-regular fa-pen-to-square"></i>
            <span>Edit</span>
          </Link>
        </div>
        <div className="flex mt-6 justify-between flex-col lg:flex-row">
          <div className="lg:w-1/3"></div>
          <div className="w-full lg:w-2/3">
            <p className="text-sm text-lightblack mb-4">product id: #23498</p>
            <h2 className="text-3xl my-2">urban flex t-shirt</h2>
            <p className="my-4">
              A lightweight, breathable cotton t-shirt designed for everyday
              comfort and a sleek urban look. Perfect for layering or wearing on
              its own.
            </p>
            <p className="text-sm text-lightblack mb-4">
              {`clothing > t-shirts`}
            </p>
            <div className="my-2 flex justify-between gap-2 flex-wrap">
              <p>
                base price:{" "}
                <span className="text-secondary line-through">499 EGP</span>
              </p>
              <p>discount: 20%</p>
              <p>final price: 399 EGP</p>
            </div>
            <div className="flex gap-8 my-4">
              <div>
                <p className="mb-1">size</p>
                <div className="flex gap-4 flex-wrap">
                  {sizes.length === 1 ? (
                    <div className="py-2 w-12 text-sm text-center text-black border border-black cursor-default">
                      {sizes[0]}
                    </div>
                  ) : (
                    sizes.map((size) => (
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
                    ))
                  )}
                </div>
              </div>
              <div>
                <p className="mb-1">color code</p>
                <div className="flex gap-2 flex-wrap">
                  {colors.length === 1 ? (
                    <div
                      className="py-2 w-24 text-sm text-center border border-black cursor-default"
                      title={colors[0].name}
                    >
                      {colors[0].color}
                    </div>
                  ) : (
                    colors.map(({ name, color }) => (
                      <label key={name} className="cursor-pointer">
                        <input
                          type="radio"
                          name="color"
                          value={name}
                          className="hidden peer"
                        />
                        <div
                          className="w-10 h-10 rounded-full border border-lightblack peer-checked:ring-1 peer-checked:ring-offset-1 peer-checked:ring-black transition duration-300 ease-in-out delay-150"
                          style={{ backgroundColor: color }}
                          title={name}
                        ></div>
                      </label>
                    ))
                  )}
                </div>
              </div>
              <div>
                <p className="mb-1">color</p>
                <div className="flex gap-2 flex-wrap">
                  {colors.length === 1 ? (
                    <div
                      className="w-10 h-10 rounded-full cursor-default"
                      style={{ backgroundColor: colors[0].color }}
                      title={colors[0].name}
                    ></div>
                  ) : (
                    colors.map(({ name, color }) => (
                      <label key={name} className="cursor-pointer">
                        <input
                          type="radio"
                          name="color"
                          value={name}
                          className="hidden peer"
                        />
                        <div
                          className="w-10 h-10 rounded-full border border-lightblack peer-checked:ring-1 peer-checked:ring-offset-1 peer-checked:ring-black transition duration-300 ease-in-out delay-150"
                          style={{ backgroundColor: color }}
                          title={name}
                        ></div>
                      </label>
                    ))
                  )}
                </div>
              </div>
            </div>
            <p>stock (total): 40 pieces</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
