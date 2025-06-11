import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StartupContext } from "../../../context/Startup.context";
import Loader from "../../../components/Loader/Loader";

function Factories() {
  const [requests, setRequests] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(StartupContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const [requestsResponse, responsesResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/startup/request", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
          axios.get("http://127.0.0.1:8000/api/startup/factory/response", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

        setRequests(requestsResponse.data.data);
        setResponses(responsesResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 422) {
          setError(
            "Access denied: Your package does not allow this action. Please upgrade your package to access this feature."
          );
        } else {
          setError(
            error.response?.data?.message ||
              "Failed to load data. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        <div className="flex flex-col items-center justify-center text-center p-8">
          <div className="text-secondary text-lg mb-4">{error}</div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="flex justify-between gap-2 flex-wrap">
          <div>
            <h2 className="text-3xl mb-0.5">factories</h2>
            <p className="text-lightblack text-sm">
              this page shows all the factory requests you've sent and responses
              received
            </p>
          </div>
          <Link
            to={"/Startup/Request"}
            className="border border-black p-2 px-4 flex items-center gap-2 h-fit hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150"
          >
            <i className="fa-solid fa-arrows-turn-right"></i>
            <span>send new requests</span>
          </Link>
        </div>
        <div className="mb-4 mt-8 xs:mb-0">
          <h2 className="text-3xl mb-0.5">requests</h2>
          <p className="text-lightblack">
            here are all the supply or manufacturing requests you've submitted
            to factories.
          </p>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] flex justify-between items-center gap-4 mb-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                request id
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                description
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                delivery date
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                status
              </span>
            </div>
            {requests.map((request) => (
              <div
                key={request.id}
                className="min-w-[600px] flex justify-between items-center gap-4 mb-4"
              >
                <Link
                  to={`/Startup/RequestDetails/${request.id}`}
                  className="text-sm"
                >
                  request #{request.id}
                </Link>
                <p className="text-sm">{request.description}</p>
                <p className="text-sm">{formatDate(request.delivery_date)}</p>
                <p
                  className={`text-sm py-1 px-2 ${
                    request.status === "PENDING"
                      ? "bg-yellow-500"
                      : request.status === "APPROVED"
                      ? "bg-green-500"
                      : "bg-secondary"
                  } text-white`}
                >
                  {request.status}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4 mt-8 xs:mb-0">
          <h2 className="text-3xl mb-0.5">responses</h2>
          <p className="text-lightblack">
            check incoming factory responses on the right
          </p>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] flex justify-between items-center gap-4 mb-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                request id
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                factory
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                offer price
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                status
              </span>
            </div>
            {responses.map((response) => (
              <div
                key={response.request.id}
                className="min-w-[600px] flex justify-between items-center gap-4 mb-4"
              >
                <p className="text-sm">request #{response.request_id}</p>
                <p className="text-sm">{response.factory.name}</p>
                <p className="text-sm">{response.price} EGP</p>
                <p
                  className={`text-sm py-1 px-2 ${
                    response.status === "PENDING"
                      ? "bg-yellow-500"
                      : response.status === "APPROVED"
                      ? "bg-green-500"
                      : "bg-secondary"
                  } text-white`}
                >
                  {response.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Factories;
