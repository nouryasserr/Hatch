function AddProduct() {
  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="mb-4 xs:mb-0">
          <h2 className="text-3xl mb-0.5">add new product</h2>
          <p className="text-lightblack text-sm">
            let's bring your product to life!
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="w-1/2">
            <div className="mb-4 xs:mb-0">
              <h4 className="text-xl mb-0.5">product details</h4>
              <p className="text-lightblack text-sm">
                tell us more about your product
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="mb-4 xs:mb-0">
              <h4 className="text-xl mb-0.5">product gallery</h4>
              <p className="text-lightblack text-sm">
                upload stunning photos of your product
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
