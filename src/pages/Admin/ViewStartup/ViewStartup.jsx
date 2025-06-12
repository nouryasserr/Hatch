import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../../../context/Admin.context";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import toast from "react-hot-toast";

function ViewStartup() {
  const { token } = useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [startupData, setStartupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/admin/startups/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Startup data:", response.data);
        setStartupData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching startup data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (token && id) {
      fetchStartupData();
    }
  }, [token, id]);

  const handleAccept = async () => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/admin/startup/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Startup has been approved successfully");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/startups/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStartupData(response.data.data);
    } catch (error) {
      console.error("Error accepting startup:", error);
      toast.error(error.response?.data?.message || "Failed to approve startup");
    }
  };

  const handleReject = async () => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/admin/startup/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Startup has been rejected successfully");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/startups/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStartupData(response.data.data);
    } catch (error) {
      console.error("Error rejecting startup:", error);
      toast.error(error.response?.data?.message || "Failed to reject startup");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this startup?")) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/startups/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Startup has been deleted successfully");
      navigate("/admin/startups");
    } catch (error) {
      console.error("Error deleting startup:", error);
      toast.error(error.response?.data?.message || "Failed to delete startup");
    }
  };

  const handleBlockUnblock = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/admin/startup/${id}/block`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const action = startupData.status === "blocked" ? "unblocked" : "blocked";
      toast.success(`Startup has been ${action} successfully`);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/startups/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStartupData(response.data.data);
    } catch (error) {
      console.error("Error blocking/unblocking startup:", error);
      toast.error(
        error.response?.data?.message || "Failed to update startup status"
      );
    }
  };

  const handleAcceptUpdateRequest = async () => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/admin/startup/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Update request has been approved successfully");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/startups/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStartupData(response.data.data);
    } catch (error) {
      console.error("Error approving update request:", error);
      toast.error(
        error.response?.data?.message || "Failed to approve update request"
      );
    }
  };

  const handleRejectUpdateRequest = async () => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/admin/startup/${id}/decline`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Update request has been rejected successfully");
      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/startups/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStartupData(response.data.data);
    } catch (error) {
      console.error("Error rejecting update request:", error);
      toast.error(
        error.response?.data?.message || "Failed to reject update request"
      );
    }
  };

  const getImageUrl = (product) => {
    if (
      product.images &&
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      const mainImage =
        product.images.find((img) => img.is_main) || product.images[0];
      const imageUrl = mainImage.url;
      if (imageUrl.startsWith("http")) {
        return imageUrl;
      }
      return `http://127.0.0.1:8000/${imageUrl}`;
    }
    return "https://placehold.co/250x200?text=Product+Image";
  };

  if (loading) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div className="text-red-500">Error loading startup data: {error}</div>
      </div>
    );
  }

  if (!startupData) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div className="text-gray-500">No startup data found</div>
      </div>
    );
  }
  const socialMediaLinks = startupData.social_media_links
    ? typeof startupData.social_media_links === "string"
      ? JSON.parse(startupData.social_media_links)
      : startupData.social_media_links
    : {};

  console.log("Social media links:", socialMediaLinks);

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div>
          <h1 className="text-2xl xs:text-4xl">
            startup #{startupData.id} - {startupData.name}
          </h1>
          <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
            view full startup info, plan details, performance, and actions
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">basic information</h2>
              <p className="text-lightgray text-xs xs:text-sm">
                general details about the startup
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">startup name:</p>
                <p className="text-sm xs:text-base">category:</p>
                <p className="text-sm xs:text-base">status:</p>
                <p className="text-sm xs:text-base">registered at:</p>
                <p className="text-sm xs:text-base">description:</p>
              </div>
              <div className="w-1/2 space-y-4 text-end sm:text-start">
                <p className="text-sm xs:text-base">{startupData.name}</p>
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis">
                  {startupData.category?.name || "N/A"}
                </p>
                <p className="text-sm xs:text-base">
                  {startupData.status?.toUpperCase()}
                </p>
                <p className="text-sm xs:text-base">
                  {new Date(startupData.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis line-clamp-3">
                  {startupData.description}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">contact info</h2>
              <p className="text-lightgray text-xs xs:text-sm">
                contact details for the startup
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">email:</p>
                <p className="text-sm xs:text-base">phone:</p>
                <p className="text-sm xs:text-base">facebook:</p>
                <p className="text-sm xs:text-base">instagram:</p>
              </div>
              <div className="w-1/2 space-y-4 text-end sm:text-start">
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis">
                  {startupData.email || startupData.user?.email || "N/A"}
                </p>
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis">
                  {startupData.phone || "N/A"}
                </p>
                <a
                  href={socialMediaLinks.Facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm xs:text-base text-nowrap overflow-hidden text-ellipsis hover:underline"
                >
                  {socialMediaLinks.Facebook || "N/A"}
                </a>
                <a
                  href={socialMediaLinks.Instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm xs:text-base text-nowrap overflow-hidden text-ellipsis hover:underline"
                >
                  {socialMediaLinks.Instagram || "N/A"}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">
                plan & subscription
              </h2>
              <p className="text-lightgray text-xs xs:text-sm">
                details about the selected plan and payment
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">selected plan:</p>
                <p className="text-sm xs:text-base">payment method:</p>
                <p className="text-sm xs:text-base">renewal date:</p>
              </div>
              <div className="w-1/2 space-y-4 text-end sm:text-start">
                <p className="text-sm xs:text-base text-nowrap overflow-hidden text-ellipsis">
                  {startupData.package?.name || "N/A"}
                </p>
                <p className="text-sm xs:text-base">
                  {startupData.payment_method || "N/A"}
                </p>
                <p className="text-sm xs:text-base">
                  {startupData.package_ends_at
                    ? new Date(startupData.package_ends_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">
                financial performance
              </h2>
              <p className="text-lightgray text-xs xs:text-sm">
                track how much the startup has made on the platform
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">revenue:</p>
                <p className="text-sm xs:text-base">orders no:</p>
              </div>
              <div className="w-1/2 space-y-4 text-end sm:text-start">
                <p className="text-sm xs:text-base">
                  {startupData.total_revenue || 0} EGP
                </p>
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis">
                  {startupData.products?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 xs:mb-0 mt-8">
          <h2 className="text-2xl xs:text-3xl mb-0.5">revenue by product</h2>
          <p className="text-lightgray text-xs xs:text-sm">
            details about the selected plan and payment
          </p>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] grid grid-cols-3 items-center gap-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                product
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                total sales
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                total revenue
              </span>
            </div>
            {startupData.products?.map((product) => (
              <div
                key={product.id}
                className="min-w-[600px] grid grid-cols-3 items-center gap-4 mt-3"
              >
                <span className="text-sm whitespace-nowrap">
                  {product.name}
                </span>
                <span className="text-sm whitespace-nowrap">
                  {product.total_sales || 0}
                </span>
                <span className="text-sm whitespace-nowrap">
                  {product.total_revenue || 0} EGP
                </span>
              </div>
            ))}
            {(!startupData.products || startupData.products.length === 0) && (
              <div className="min-w-[600px] grid grid-cols-3 items-center gap-4 mt-3">
                <span className="text-sm whitespace-nowrap text-gray-500">
                  No products found
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="mb-4 xs:mb-0 mt-8">
          <h2 className="text-2xl xs:text-3xl mb-0.5">published products</h2>
          <p className="text-lightgray text-xs xs:text-sm">
            all active products listed under this startup
          </p>
        </div>
        <div className="flex gap-4 flex-wrap mt-4">
          {startupData.products?.map((product) => (
            <div key={product.id} className="w-64 overflow-hidden">
              <div className="h-52 w-full">
                <img
                  src={getImageUrl(product)}
                  alt={product.name}
                  className="object-cover object-center h-full w-full rounded-t"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/250x200?text=Product+Image";
                    e.target.className =
                      "object-contain object-center h-full w-full rounded-t";
                  }}
                />
              </div>
              <div className="flex justify-between px-1.5 py-2">
                <p className="text-xs text-lightblack">
                  category: {product.category?.name || "no category"}
                </p>
                <p className="text-xs text-lightblack">
                  quantity: {product.stock || 0}
                </p>
              </div>
              <div className="px-1.5">
                <div className="flex justify-between gap-4">
                  <h4 className="text-xl font-medium line-clamp-1">
                    {product.name}
                  </h4>
                  <h5 className="text-lightblack text-lg text-nowrap">
                    {product.price || 0} EGP
                  </h5>
                </div>
              </div>
            </div>
          ))}
          {(!startupData.products || startupData.products.length === 0) && (
            <p className="text-lightblack">No products found</p>
          )}
        </div>
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-2xl xs:text-3xl mb-0.5">actions</h2>
            <p className="text-lightgray text-xs xs:text-sm">
              manage startup status and requests
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {startupData.status === "PENDING" && (
              <>
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Accept Request
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject Request
                </button>
              </>
            )}

            {startupData.pending_updates && (
              <>
                <button
                  onClick={handleAcceptUpdateRequest}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve Update
                </button>
                <button
                  onClick={handleRejectUpdateRequest}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject Update
                </button>
              </>
            )}

            {startupData.status !== "pending" && (
              <>
                <button
                  onClick={handleBlockUnblock}
                  className={`px-4 py-2 ${
                    startupData.status === "blocked"
                      ? "bg-yellow-500"
                      : "bg-primary"
                  } text-white rounded-sm`}
                >
                  {startupData.status === "blocked" ? "Unblock" : "Block"}{" "}
                  Startup
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-secondary text-white rounded-sm"
                >
                  Delete Startup
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewStartup;
