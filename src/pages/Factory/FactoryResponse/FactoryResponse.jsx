import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import { FactoryContext } from "../../../context/Factory.context";
import toast from "react-hot-toast";

function FactoryResponse() {
  const { token } = useContext(FactoryContext);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchResponses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchResponses = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/factory/response",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.data) {
        setResponses(response.data.data);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch responses");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/factory/response/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Response deleted successfully");
        setResponses(responses.filter((resp) => resp.id !== id));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete response");
    } finally {
      setDeletingId(null);
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
          <h2 className="text-3xl mb-0.5">factory responses</h2>
          <p className="text-lightblack text-sm">
            responses you have sent to startup requests
          </p>
        </div>
        {!responses || responses.length === 0 ? (
          <div className="text-center text-secondary mt-8">
            No responses found
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 mt-8">
            {responses.map((response) => (
              <div key={response.id} className="w-full lg:w-[calc(50%-1rem)]">
                <div className="mb-4 xs:mb-0 flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl mb-0.5">
                      Request #{response.request_id}
                    </h2>
                    <p className="text-lightblack text-sm">offer you sent</p>
                  </div>
                  <button
                    onClick={() => handleDelete(response.id)}
                    disabled={deletingId === response.id}
                    className={`px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition-colors ${
                      deletingId === response.id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {deletingId === response.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="w-1/2 space-y-2">
                    <p className="text-sm xs:text-base">offer price</p>
                    <p className="text-sm xs:text-base">message</p>
                    <p className="text-sm xs:text-base">sent at</p>
                    <p className="text-sm xs:text-base">status</p>
                    {response.image && (
                      <p className="text-sm xs:text-base">image</p>
                    )}
                  </div>
                  <div className="w-1/2 space-y-2">
                    <p className="text-sm xs:text-base">
                      {response.price} EGP/unit
                    </p>
                    <p className="text-sm xs:text-base">
                      {response.description}
                    </p>
                    <p className="text-sm xs:text-base">
                      {formatDate(response.created_at)}
                    </p>
                    <p className="text-sm xs:text-base">
                      {response.status.toLowerCase()}
                    </p>
                    {response.image && (
                      <img
                        src={`http://127.0.0.1:8000/${response.image}`}
                        alt="Response Attachment"
                        className="max-w-xs rounded-lg mt-2"
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

export default FactoryResponse;
