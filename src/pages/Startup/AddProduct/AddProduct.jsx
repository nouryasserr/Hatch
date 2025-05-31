import { useState } from "react";
import toast from "react-hot-toast";
function AddProduct() {
  const [images, setImages] = useState([null, null, null, null]);
  const handleFileChange = (e, index = null) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const newImages = [...images];
    if (index !== null) {
      newImages[index] = imageUrl;
    } else {
      const firstEmptyIndex = newImages.findIndex((img) => img === null);
      if (firstEmptyIndex === -1) {
        toast.error("Maximum 4 images allowed");
        return;
      }
      newImages[firstEmptyIndex] = imageUrl;
    }
    setImages(newImages);
  };
  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };
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
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="w-full">
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
                <div className="w-full">
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
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
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
                <div className="w-full">
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
            <div className="mb-4 mt-8">
              <h4 className="text-xl mb-0.5">variants (sizes & colors)</h4>
              <p className="text-lightblack text-sm">
                if your product comes in diffrent sizes or colors
              </p>
            </div>
            <form>
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
                  <label htmlFor="code" className="flex items-start gap-2 mb-2">
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
                  className="flex flex-col items-center justify-center h-80 w-full border border-blackmuted text-black text-center cursor-pointer"
                >
                  <svg
                    className="w-16 h-16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V12M12 12L9.75 14.3333M12 12L14.25 14.3333M6.6 17.8333C4.61178 17.8333 3 16.1917 3 14.1667C3 12.498 4.09438 11.0897 5.59198 10.6457C5.65562 10.6268 5.7 10.5675 5.7 10.5C5.7 7.46243 8.11766 5 11.1 5C14.0823 5 16.5 7.46243 16.5 10.5C16.5 10.5582 16.5536 10.6014 16.6094 10.5887C16.8638 10.5306 17.1284 10.5 17.4 10.5C19.3882 10.5 21 12.1416 21 14.1667C21 16.1917 19.3882 17.8333 17.4 17.8333"
                      stroke="#404040"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="text-blackmuted underline text-sm xs:text-base">
                    drop files here or click to upload
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e)}
                  />
                </label>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-full aspect-square border border-blackmuted flex items-center justify-center overflow-hidden bg-gray-100"
                    >
                      {img ? (
                        <>
                          <img
                            src={img}
                            alt={`uploaded-${index}`}
                            className="object-cover w-full h-full"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-white text-red-500 border border-red-500 rounded-full w-6 h-6 flex items-center justify-center text-sm"
                            title="Remove image"
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <label className="cursor-pointer text-gray-400 text-sm text-center">
                          + Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, index)}
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
        <button
          className={
            "w-full lg:w-1/2 mt-4 self-end xs:self-auto bg-primary rounded-full py-1.5 px-6 text-white border border-primary hover:border-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
          }
        >
          add product
        </button>
      </div>
    </>
  );
}

export default AddProduct;
