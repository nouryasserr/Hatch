import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import { FactoryContext } from "../../../context/Factory.context";
import toast from "react-hot-toast";

function Deals() {
  const { token } = useContext(FactoryContext);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markingDone, setMarkingDone] = useState(null);

  useEffect(() => {
    fetchDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchDeals = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/factory/deals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.data) {
        setDeals(response.data.data);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch deals");
      setLoading(false);
    }
  };

  const handleMarkAsDone = async (dealId) => {
    try {
      setMarkingDone(dealId);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/factory/deals/${dealId}/order-done`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.data.message);
        setDeals(
          deals.map((deal) =>
            deal.id === dealId ? response.data.data.deal : deal
          )
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to mark deal as done");
    } finally {
      setMarkingDone(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="text-center text-red-500 mt-8">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div>
          <h2 className="text-3xl mb-0.5">accepted deals</h2>
          <p className="text-lightblack text-sm">
            deals this factory has with startups
          </p>
        </div>
        {!deals || deals.length === 0 ? (
          <div className="text-center text-secondary mt-8">No deals found</div>
        ) : (
          <div className="flex flex-wrap gap-8 mt-8">
            {deals.map((deal) => (
              <div key={deal.id} className="w-full lg:w-[calc(50%-1rem)]">
                <div className="mb-4 xs:mb-0 flex flex-wrap gap-2 justify-between items-center">
                  <div>
                    <h2 className="text-3xl mb-0.5">
                      Request #{deal.request.id}
                    </h2>
                    <p className="text-lightblack text-sm">
                      {deal.request.description}
                    </p>
                  </div>
                  <button
                    onClick={() => !deal.is_done && handleMarkAsDone(deal.id)}
                    disabled={deal.is_done || markingDone === deal.id}
                    className={`w-full xs:w-auto px-4 py-2 text-white rounded transition-colors ${
                      deal.is_done
                        ? "bg-green-500 cursor-not-allowed"
                        : markingDone === deal.id
                        ? "bg-primary/70 cursor-not-allowed"
                        : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    {deal.is_done
                      ? "Completed"
                      : markingDone === deal.id
                      ? "Marking as Done..."
                      : "Done"}
                  </button>
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="w-1/2 space-y-4">
                    <p className="text-sm xs:text-base">deposit amount</p>
                    <p className="text-sm xs:text-base">final payment</p>
                    <p className="text-sm xs:text-base">total price</p>
                    <p className="text-sm xs:text-base">deal date</p>
                    <p className="text-sm xs:text-base">delivery date</p>
                    <p className="text-sm xs:text-base">description</p>
                    {deal.request.image && (
                      <p className="text-sm xs:text-base">request image</p>
                    )}
                  </div>
                  <div className="w-1/2 space-y-4">
                    <p
                      className={`text-sm xs:text-base ${
                        deal.is_deposit_paid
                          ? "text-green-500"
                          : "text-secondary"
                      }`}
                    >
                      {deal.deposit_amount} EGP
                    </p>
                    <p
                      className={`text-sm xs:text-base ${
                        deal.is_final_paid ? "text-green-500" : "text-secondary"
                      }`}
                    >
                      {deal.final_payment_amount} EGP
                    </p>
                    <p className="text-sm xs:text-base">{deal.price} EGP</p>
                    <p className="text-sm xs:text-base line-clamp-1 overflow-hidden text-ellepsis">
                      {formatDate(deal.deal_date)}
                    </p>
                    <p className="text-sm xs:text-base line-clamp-1 overflow-hidden text-ellepsis">
                      {formatDate(deal.request.delivery_date)}
                    </p>
                    <p className="text-sm xs:text-base line-clamp-1 overflow-hidden text-ellepsis">
                      {deal.request.description}
                    </p>
                    {deal.request.image && (
                      <img
                        src={`http://127.0.0.1:8000/${deal.request.image}`}
                        alt="Request Attachment"
                        className="w-24 h-24 rounded-sm mt-2"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Deals;
