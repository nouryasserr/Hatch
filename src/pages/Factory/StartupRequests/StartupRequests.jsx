import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FactoryContext } from "../../../context/Factory.context";
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router-dom";

function StartupRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(FactoryContext);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/factory/request",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setRequests(response.data.data || []);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [token]);
  if (loading) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="text-red-500">Error loading requests: {error}</div>
      </div>
    );
  }
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="w-full lg:w-5/6 float-end px-8 py-6">
      <div>
        <h2 className="text-3xl mb-0.5">startup requests</h2>
        <p className="text-lightblack text-sm">
          manage and respond to startup requests
        </p>
      </div>
      <div className="mt-8">
        {requests.length === 0 ? (
          <div className="text-center text-secondary">No requests found</div>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className="border border-slate-200 rounded-lg p-6 hover:shadow transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-medium mb-1">
                      Request #{request.id}
                    </h4>
                    <p className="text-lightblack text-xs">
                      {formatDate(request.created_at)}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-sm text-white ${
                      request.status === "PENDING"
                        ? "bg-primary"
                        : request.status === "APPROVED"
                        ? "bg-green-500"
                        : "bg-secondary"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm mb-0.5 font-medium text-lightblack">
                      Description
                    </p>
                    <p>{request.description}</p>
                  </div>

                  {request.image && (
                    <div>
                      <p className="text-sm font-medium text-lightblack mb-2">
                        Attached Image
                      </p>
                      <img
                        src={`http://127.0.0.1:8000/${request.image}`}
                        alt=" Request Attachement"
                        className="max-w-xs rounded-lg"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-lightblack mb-0.5">
                      Delivery Date
                    </p>
                    <p>{formatDate(request.delivery_date)}</p>
                  </div>
                  {request.status === "PENDING" && (
                    <div className="mt-4 pt-4 border-t">
                      <Link
                        to={`/Factory/SendOffer/${request.id}`}
                        className="w-full xs:w-auto bg-green-600 text-white px-4 py-2 rounded-md hover:bg-opacity-85 transition-colors duration-300"
                      >
                        Send Offer
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StartupRequests;
