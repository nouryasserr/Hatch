import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StartupContext } from "../../../context/Startup.context";
import Loader from "../../../components/Loader/Loader";
import toast from "react-hot-toast";

function RequestDetails() {
  const { id } = useParams();
  const { token } = useContext(StartupContext);
  const [requestDetails, setRequestDetails] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingResponse, setProcessingResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !id) {
        setLoading(false);
        return;
      }

      try {
        const requestResponse = await axios.get(
          `http://127.0.0.1:8000/api/startup/request/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (requestResponse.data.success && requestResponse.data.data.Request) {
          setRequestDetails(requestResponse.data.data.Request);
        }

        try {
          const responsesResponse = await axios.get(
            `http://127.0.0.1:8000/api/startup/factory/response`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (responsesResponse.data.success && responsesResponse.data.data) {
            const filteredResponses = Array.isArray(responsesResponse.data.data)
              ? responsesResponse.data.data.filter(
                  (response) => response.request_id === parseInt(id)
                )
              : responsesResponse.data.data.request_id === parseInt(id)
              ? [responsesResponse.data.data]
              : [];

            setResponses(filteredResponses);
          } else {
            setResponses([]);
          }
        } catch (responseError) {
          if (responseError.response?.status === 422) {
            setResponses([]);
          } else {
            console.error("Error fetching responses:", responseError);
          }
        }
      } catch (error) {
        console.error("Error fetching request details:", error);
        setError(
          error.response?.data?.message || "Failed to load request details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, id]);

  const handleResponseAction = async (responseId, action) => {
    setProcessingResponse(responseId);
    const toastId = toast.loading(
      `${action === "accept" ? "Accepting" : "Rejecting"} response...`
    );

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/startup/factory-responses/${responseId}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(
          action === "accept"
            ? "Response accepted successfully!"
            : "Response rejected successfully!"
        );

        setResponses((prevResponses) =>
          prevResponses.map((resp) =>
            resp.id === responseId
              ? {
                  ...resp,
                  status: action === "accept" ? "APPROVED" : "REJECTED",
                }
              : resp
          )
        );
      }
    } catch (error) {
      console.error(`Error ${action}ing response:`, error);
      toast.error(
        error.response?.data?.message || `Failed to ${action} response`
      );
    } finally {
      setProcessingResponse(null);
      toast.dismiss(toastId);
    }
  };

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
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!requestDetails) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div>No request details found</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div>
          <h2 className="text-3xl mb-0.5">
            request #{requestDetails.id} - details page
          </h2>
          <p className="text-lightblack text-sm">
            here you can review your request and track responses from factories
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="lg:w-1/2">
            {" "}
            <div className="mt-8">
              <div className="mb-4 xs:mb-0">
                <h2 className="text-3xl mb-0.5">request info</h2>
                <p className="text-lightblack text-sm">
                  basic information about your order
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="w-1/2 space-y-4">
                  <p className="text-sm xs:text-base">product name</p>
                  <p className="text-sm xs:text-base">quantity</p>
                  <p className="text-sm xs:text-base">delivery date</p>
                </div>
                <div className="w-1/2 space-y-4">
                  <p className="text-sm xs:text-base">{requestDetails.name}</p>
                  <p className="text-sm xs:text-base">
                    {requestDetails.quantity}
                  </p>
                  <p className="text-sm xs:text-base">
                    {requestDetails.delivery_date}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mt-8">
              <div className="mb-4 xs:mb-0">
                <h2 className="text-3xl mb-0.5">additional info</h2>
                <p className="text-lightblack text-sm">
                  extra details that help factories understan your product
                  better
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="w-1/2 space-y-8">
                  <p className="text-sm xs:text-base ">description</p>
                  <p className="text-sm xs:text-base">notes</p>
                </div>
                <div className="w-1/2 space-y-4">
                  <p className="text-sm xs:text-base line-clamp-3 overfolw-hidden text-eclipse">
                    {requestDetails.description}
                  </p>
                  <p className="text-sm xs:text-base line-clamp-3 overfolw-hidden text-eclipse">
                    {requestDetails.notes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-2">
          <div className="lg:w-1/2">
            <div className="mb-4 mt-8 xs:mb-0">
              <h2 className="text-3xl mb-0.5">request status</h2>
              <p className="text-lightblack text-sm">
                track the current status of this request
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">status</p>
                <p className="text-sm xs:text-base">sent at</p>
              </div>
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">{requestDetails.status}</p>
                <p className="text-sm xs:text-base">
                  {formatDate(requestDetails.created_at)}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 mt-8 xs:mb-0">
              <h2 className="text-3xl mb-0.5">responses from factories</h2>
              <p className="text-lightblack text-sm">
                all offers received in response to your request
              </p>
            </div>
            {(!responses || responses.length === 0) && (
              <div className="mt-4">
                <p className="text-secondary text-center text-sm border border-secondary rounded-md py-1.5 px-2 bg-red-200">
                  no factories have responded to this request yet
                </p>
              </div>
            )}
            {responses &&
              responses.length > 0 &&
              responses.map((response) => (
                <div key={response.id}>
                  <div className="mb-4 mt-4 xs:mb-0">
                    <h3 className="text-2xl mb-0.5">
                      factory: # {response.factory.id}
                    </h3>
                    <p className="text-lightblack text-sm">
                      offer received - waiting for your action
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <div className="w-1/2 space-y-2">
                      <p className="text-sm xs:text-base">price offer</p>
                      <p className="text-sm xs:text-base">description</p>
                      <p className="text-sm xs:text-base">sent at</p>
                      <p className="text-sm xs:text-base">status</p>
                    </div>
                    <div className="w-1/2 space-y-2">
                      <p className="text-sm xs:text-base">
                        {response.price} EGP
                      </p>
                      <p className="text-sm xs:text-base">
                        {response.description || "-"}
                      </p>
                      <p className="text-sm xs:text-base">
                        {formatDate(response.created_at)}
                      </p>
                      <p
                        className={`text-sm xs:text-base ${
                          response.status === "PENDING"
                            ? "text-yellow-500"
                            : response.status === "APPROVED"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {response.status}
                      </p>
                    </div>
                  </div>
                  {response.status === "PENDING" && (
                    <div className="flex gap-6 mt-4">
                      <button
                        onClick={() =>
                          handleResponseAction(response.id, "accept")
                        }
                        disabled={processingResponse === response.id}
                        className="bg-green-500 text-white text-sm py-2 px-4 rounded hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {processingResponse === response.id
                          ? "Processing..."
                          : "Accept"}
                      </button>
                      <button
                        onClick={() =>
                          handleResponseAction(response.id, "reject")
                        }
                        disabled={processingResponse === response.id}
                        className="bg-secondary text-white text-sm py-2 px-4 rounded hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {processingResponse === response.id
                          ? "Processing..."
                          : "Reject"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RequestDetails;
