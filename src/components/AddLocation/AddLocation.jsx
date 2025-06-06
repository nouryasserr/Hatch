import { useFormik } from "formik";
import { useContext } from "react";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";

function AddLocation({ onClose }) {
  let { token } = useContext(UserContext);
  async function storeAddress(values) {
    let toastId = toast.loading("adding address...");
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/user/addresses",
        data: values,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let { data } = await axios.request(options);
      if (data.success) {
        toast.success("Address Added Succesfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
    },
    onSubmit: storeAddress,
  });
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
          <form
            onSubmit={formik.handleSubmit}
            className="py-4 md:py-6 px-4 xs:px-6"
          >
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
                name="address"
                placeholder="15 a - hada2ek el ahram - giza"
                value={formik.values.address}
                onChange={formik.handleChange}
                className="py-2 px-2 xs:px-3 text-xs placeholder:text-lightblack w-full border border-blackmuted rounded-sm"
              />
            </div>
            <div className="mt-4 mb-2">
              <h5 className="pb-1 text-sm xs:text-lg font-light">
                location type
              </h5>
              <input
                type="text"
                autoComplete="on"
                name="city"
                placeholder="Home"
                value={formik.values.city}
                onChange={formik.handleChange}
                className="py-2 px-2 xs:px-3 text-xs placeholder:text-lightblack w-full border border-blackmuted rounded-sm"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full my-2 bg-black border border-black rounded-full font-extralight text-sm text-white p-2 hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
            >
              confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddLocation;
