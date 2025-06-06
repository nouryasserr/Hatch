import { useState, useEffect, useRef } from "react";
import CheckoutAdress from "../CheckoutAdress/CheckoutAdress";

function DeliveryAddress({ onAddressSelect }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const onAddressSelectRef = useRef(onAddressSelect);

  // Update ref when prop changes
  useEffect(() => {
    onAddressSelectRef.current = onAddressSelect;
  }, [onAddressSelect]);

  // Load saved address from localStorage on component mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("selectedAddress");
    if (savedAddress) {
      const parsedAddress = JSON.parse(savedAddress);
      setSelectedAddress(parsedAddress);
      if (onAddressSelectRef.current) {
        onAddressSelectRef.current(parsedAddress);
      }
    }
  }, []); // Remove onAddressSelect from dependencies

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    // Save selected address to localStorage
    localStorage.setItem("selectedAddress", JSON.stringify(address));
    if (onAddressSelectRef.current) {
      onAddressSelectRef.current(address);
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center mb-4">
          <h4 className="text-2xl">delivery address</h4>
          <button
            onClick={() => setShowCheckout(true)}
            className="flex items-center gap-2 py-2 px-4 border border-blackmuted rounded-full hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add New Address</span>
          </button>
        </div>
        {selectedAddress ? (
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-location-dot bg-stone-100 py-2 px-3.5 rounded-full text-xl"></i>
            <div>
              <h5 className="text-lg">{selectedAddress.city || "Address"}</h5>
              <p className="text-xs text-lightblack">
                {selectedAddress.address}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-blackmuted">No address selected</p>
        )}
      </div>
      {showCheckout && (
        <CheckoutAdress
          onClose={() => setShowCheckout(false)}
          onAddressSelect={handleAddressSelect}
        />
      )}
    </>
  );
}

export default DeliveryAddress;
