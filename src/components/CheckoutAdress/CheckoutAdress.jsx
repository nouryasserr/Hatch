import { useContext, useState, useEffect } from "react";
import AddLocation from "../AddLocation/AddLocation";
import { UserContext } from "../../context/User.context";
import axios from "axios";

function CheckoutAddress({ onClose, onAddressSelect }) {
  const { token } = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAddresses() {
    try {
      setIsLoading(true);
      setError(null);
      const options = {
        url: "http://127.0.0.1:8000/api/user/addresses",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.request(options);
      setAddresses(data.data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setError("Failed to load addresses. Please try again.");
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleConfirm = () => {
    if (selectedAddress) {
      onAddressSelect(selectedAddress);
      onClose();
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="w-11/12 xs:w-96 md:w-1/2 lg:w-1/3 bg-white shadow-lg p-6 text-center">
          <p>Loading addresses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="w-11/12 xs:w-96 md:w-1/2 lg:w-1/3 bg-white shadow-lg p-6">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={getAddresses}
            className="w-full bg-black text-white p-2 rounded-full"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="w-11/12 xs:w-96 md:w-1/2 lg:w-1/3 bg-white shadow-lg">
          <div className="flex items-center justify-between py-4 px-4 xs:px-6">
            <h4 className="text-base xs:text-xl">Your Locations</h4>
            <button onClick={onClose}>
              <i className="fa-solid fa-xmark text-lightblack"></i>
            </button>
          </div>
          <hr />
          <div className="py-4 md:py-6 px-4 xs:px-6 max-h-96 overflow-y-auto">
            {addresses.length === 0 ? (
              <p className="text-center py-4">
                No addresses found. Please add one.
              </p>
            ) : (
              addresses.map((addr) => (
                <div key={addr.id} className="py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-zinc-400 text-xs">
                        {addr.city || "No city specified"}
                      </p>
                      <p>{addr.address}</p>
                    </div>
                    {selectedAddress?.id === addr.id ? (
                      <p className="py-1 px-3 border border-stone-100 bg-stone-100 text-sm rounded-full cursor-pointer">
                        Selected
                      </p>
                    ) : (
                      <p
                        className="py-1 px-4 border border-black text-sm rounded-full cursor-pointer"
                        onClick={() => handleAddressSelect(addr)}
                      >
                        Select
                      </p>
                    )}
                  </div>
                  <hr className="mt-4" />
                </div>
              ))
            )}
            <div className="mt-4">
              <button
                onClick={handleConfirm}
                disabled={!selectedAddress}
                className={`w-full my-2 border rounded-full font-extralight text-sm p-2 transition duration-300 ease-in-out delay-150 ${
                  selectedAddress
                    ? "bg-black border-black text-white hover:bg-transparent hover:text-black"
                    : "bg-lightblack border-lightblack text-blackmuted cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
              <button
                onClick={() => setShowAddLocation(true)}
                className="w-full border border-black rounded-full font-extralight text-sm p-2 hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150"
              >
                Add New Address
              </button>
            </div>
          </div>
        </div>
      </div>
      {showAddLocation && (
        <AddLocation
          onClose={() => {
            setShowAddLocation(false);
            getAddresses();
          }}
        />
      )}
    </>
  );
}

export default CheckoutAddress;
