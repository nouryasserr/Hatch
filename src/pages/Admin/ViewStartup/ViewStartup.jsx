function ViewStartup() {
  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div>
          <h1 className="text-2xl xs:text-4xl">startup #5 - hatch</h1>
          <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
            view full startup info, plan details, performance, and actions
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">basic information</h2>
              <p className="text-lightgray text-xs xs:text-sm">
                general details about the startup
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">startup name:</p>
                <p className="text-sm xs:text-base">category:</p>
                <p className="text-sm xs:text-base">status:</p>
                <p className="text-sm xs:text-base">registered at:</p>
                <p className="text-sm xs:text-base">logo:</p>
                <p className="text-sm xs:text-base">description:</p>
              </div>
              <div className="w-1/2 space-y-4 text-end sm:text-start">
                <p className="text-sm xs:text-base">hatch</p>
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis">
                  clothes
                </p>
                <p className="text-sm xs:text-base">APPROVED</p>
                <p className="text-sm xs:text-base">2025-05-04</p>
                <p className="text-sm xs:text-base underline hover:no-underline transition">
                  view logo
                </p>
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis line-clamp-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tenetur ipsum doloremque qui voluptatibus?
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">contact info</h2>
              <p className="text-lightgray text-xs xs:text-sm">
                contact details for the startup
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">email:</p>
                <p className="text-sm xs:text-base">phone:</p>
                <p className="text-sm xs:text-base">facebook:</p>
                <p className="text-sm xs:text-base">instagram:</p>
              </div>
              <div className="w-1/2 space-y-4 text-end sm:text-start">
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis">
                  hanaahanyy7@gmail.com
                </p>
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis">
                  980.474.7933
                </p>
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis">
                  http:facebook.com
                </p>
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis">
                  http:instagram.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">
                plan & subscription
              </h2>
              <p className="text-lightgray text-xs xs:text-sm">
                details about the selected plan and payment
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">selected plan:</p>
                <p className="text-sm xs:text-base">payment method:</p>
                <p className="text-sm xs:text-base">renewal date:</p>
              </div>
              <div className="w-1/2 space-y-4 text-end sm:text-start">
                <p className="text-sm xs:text-base">pro</p>
                <p className="text-sm xs:text-base">visa</p>
                <p className="text-sm xs:text-base">2025-05-04</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">
                financial performance
              </h2>
              <p className="text-lightgray text-xs xs:text-sm">
                track how much the startup has made on the platform
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">revenue:</p>
                <p className="text-sm xs:text-base">orders no:</p>
              </div>
              <div className="w-1/2 space-y-4 text-end sm:text-start">
                <p className="text-sm xs:text-base">12,400 EGP</p>
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis">
                  98
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 xs:mb-0 mt-8">
          <h2 className="text-2xl xs:text-3xl mb-0.5">revenue by product</h2>
          <p className="text-lightgray text-xs xs:text-sm">
            details about the selected plan and payment
          </p>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] grid grid-cols-3 items-center gap-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                product
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                total sales
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                total revenue
              </span>
            </div>
            <div className="min-w-[600px] grid grid-cols-3 items-center gap-4 mt-3">
              <span className="text-sm whitespace-nowrap">hoodie</span>
              <span className="text-sm whitespace-nowrap">15</span>
              <span className="text-sm whitespace-nowrap">6,000 EGP</span>
            </div>
          </div>
        </div>
        <div className="mb-4 xs:mb-0 mt-8">
          <h2 className="text-2xl xs:text-3xl mb-0.5">published products</h2>
          <p className="text-lightgray text-xs xs:text-sm">
            all active products listed under this startup
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          <div>
            <img
              src={"#"}
              alt="product"
              className="object-contain object-center h-62 w-full rounded-t"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/250x200?text=Product+Image";
              }}
            />
            <div className="flex justify-between px-1.5 py-2">
              <p className="text-xs text-lightblack">category: stars</p>
              <p className="text-xs text-lightblack">stock: 2</p>
            </div>
            <div className="px-1.5">
              <div className="flex justify-between gap-4">
                <h4 className="text-xl font-medium line-clamp-1">name</h4>
                <h5 className="text-lightblack text-lg text-nowrap">500 EGP</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 mt-8">
          <div className="mb-4 xs:mb-0">
            <h2 className="text-2xl xs:text-3xl mb-0.5">actions</h2>
            <p className="text-lightgray text-xs xs:text-sm">
              take direct actions on this startup account
            </p>
          </div>
          <div className="grid xs:grid-cols-2 gap-4 mt-4">
            <button className="text-sm px-4 py-2 rounded-sm text-white bg-green-500 border border-lightblack hover:bg-transparent hover:text-black transition duration-300">
              accept
            </button>
            <button className="text-sm px-4 py-2 rounded-sm text-white bg-secondary border border border-lightblack hover:bg-transparent hover:text-black transition duration-300">
              reject
            </button>
            <button className="text-sm px-4 py-2 rounded-sm text-white bg-secondary border border-lightblack hover:bg-transparent hover:text-black transition duration-300">
              delete
            </button>
            <button className="text-sm px-4 py-2 rounded-sm text-white bg-primary border border border-lightblack hover:bg-transparent hover:text-black transition duration-300">
              block
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewStartup;
