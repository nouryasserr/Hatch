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
        localStorage.setItem("selectedAddress", JSON.stringify(data.data));
        toast.success("Address Added Successfully");
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add address");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="w-11/12 xs:w-96 md:w-1/2 lg:w-1/3 bg-white shadow-lg">
        <div className="flex items-center justify-between py-4 px-4 xs:px-6">
          <h4 className="text-base xs:text-xl">Add New Address</h4>
          <button onClick={onClose}>
            <i className="fa-solid fa-xmark text-lightblack"></i>
          </button>
        </div>
        <hr />
        <form onSubmit={formik.handleSubmit} className="p-4 xs:p-6">
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white rounded-full py-2 hover:bg-white hover:text-black border border-black transition duration-300"
          >
            Add Address
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLocation;
