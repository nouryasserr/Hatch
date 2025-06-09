import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/Admin.context";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import toast from "react-hot-toast";

function ViewUser() {
  const { token } = useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUserBlocked, setIsUserBlocked] = useState(() => {
    const stored = localStorage.getItem(`user_${id}_blocked`);
    return stored === "true";
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem(`user_${id}_blocked`, isUserBlocked);
    }
  }, [isUserBlocked, id, userData]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/admin/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Full API response:", response.data);
        console.log("User data details:", {
          id: response.data.data.id,
          role: response.data.data.role,
          status: response.data.data.status,
          blocked: response.data.data.blocked,
          deleted_at: response.data.data.deleted_at,
          all_data: response.data.data,
        });
        setUserData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (token && id) {
      fetchUserData();
    }
  }, [token, id]);

  const handleDeleteUser = async () => {
    try {
      // First check if user can be deleted
      const checkResponse = await axios.get(
        `http://127.0.0.1:8000/api/admin/user/${id}/checkDestroy`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Check destroy response:", checkResponse.data);

      let confirmMessage = "Are you sure you want to delete this user?";

      // If user is a startup owner, show special confirmation
      if (userData.role === "OWNER") {
        confirmMessage =
          "Warning: This user is registered as a startup owner. Deleting this user might cause issues with their startup account. Are you absolutely sure you want to delete this user?";
      }

      // Ask for confirmation
      if (!window.confirm(confirmMessage)) {
        return;
      }

      // Proceed with deletion
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("User deleted successfully");
        navigate("/Admin/AllUsers");
      }
    } catch (error) {
      console.error("Error:", error);

      // Handle different types of errors
      if (error.response) {
        // Server responded with an error
        if (error.response.status === 500 && userData.role === "OWNER") {
          toast.error(
            "Cannot delete this user because they have an active startup account. Please delete their startup account first from the startups page."
          );
        } else {
          toast.error(
            error.response.data?.message ||
              "Failed to delete user. Please try again later."
          );
        }
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something else went wrong
        toast.error("An error occurred while trying to delete the user.");
      }
    }
  };

  const handleToggleUserStatus = async () => {
    const action = isUserBlocked ? "unblock" : "block";
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
      return;
    }

    setIsUpdatingStatus(true);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/admin/user/${id}/block`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Block/Unblock response:", response.data);

      if (response.data.success) {
        toast.success(response.data.message || `User ${action}ed successfully`);
        const newBlockedStatus = response.data.message.includes("BLOCKED");
        setIsUserBlocked(newBlockedStatus);
        localStorage.setItem(`user_${id}_blocked`, newBlockedStatus);

        const {
          data: { data: updatedUser },
        } = await axios.get(`http://127.0.0.1:8000/api/admin/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Updated user data after block/unblock:", {
          id: updatedUser.id,
          role: updatedUser.role,
          status: updatedUser.status,
          blocked: updatedUser.blocked,
          deleted_at: updatedUser.deleted_at,
          all_data: updatedUser,
        });
        setUserData(updatedUser);
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error(error.response?.data?.message || `Failed to ${action} user`);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (loading)
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div className="text-red-500">Error loading user data: {error}</div>
      </div>
    );

  if (!userData)
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div className="text-gray-500">No user data found</div>
      </div>
    );

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div>
          <h1 className="text-2xl xs:text-4xl">
            user #{userData.id} - {userData.name}
          </h1>
          <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
            view full profile details of this user
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">user information</h2>
              <p className="text-lightgray text-xs xs:text-sm">
                basic information about the user
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">name:</p>
                <p className="text-sm xs:text-base">email:</p>
                <p className="text-sm xs:text-base">phone:</p>
                <p className="text-sm xs:text-base">registered at:</p>
                <p className="text-sm xs:text-base">total orders:</p>
                <p className="text-sm xs:text-base">status:</p>
              </div>
              <div className="w-1/2 space-y-4 text-end sm:text-start">
                <p className="text-sm xs:text-base">{userData.name}</p>
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis">
                  {userData.email}
                </p>
                <p className="text-sm xs:text-base">{userData.phone}</p>
                <p className="text-sm xs:text-base">
                  {new Date(userData.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm xs:text-base">
                  {userData.orders?.length || 0}
                </p>
                <p className="text-sm xs:text-base">
                  {isUserBlocked ? "BLOCKED" : "ACTIVE"}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">actions</h2>
              <p className="text-lightgray text-xs xs:text-sm">
                take direct actions on this user account
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleDeleteUser}
                className="text-sm px-4 py-1.5 rounded-sm border border-lightblack hover:bg-secondary hover:text-white transition duration-300"
              >
                delete user
              </button>
              <button
                onClick={handleToggleUserStatus}
                disabled={isUpdatingStatus}
                className={`text-sm px-4 py-1.5 rounded-sm border border-lightblack hover:bg-secondary hover:text-white transition duration-300 ${
                  isUpdatingStatus ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isUpdatingStatus
                  ? `${isUserBlocked ? "unblocking" : "blocking"}...`
                  : isUserBlocked
                  ? "unblock user"
                  : "block user"}
              </button>
            </div>
          </div>
        </div>
        <div className="mb-4 xs:mb-0 mt-8">
          <h2 className="text-2xl xs:text-3xl mb-0.5">user orders</h2>
          <p className="text-lightgray text-xs xs:text-sm">
            list of all items placed by this user
          </p>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] grid grid-cols-7 items-center gap-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                order id
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                product
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                quantity
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                size
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                color
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                unit price
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                subtotal
              </span>
            </div>
            {userData.orders?.map((order) =>
              order.order_items?.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[600px] grid grid-cols-7 items-center gap-4 mt-3"
                >
                  <span className="text-sm whitespace-nowrap">{order.id}</span>
                  <span className="text-sm whitespace-nowrap">
                    {item.product.name}
                  </span>
                  <span className="text-sm whitespace-nowrap">
                    {item.quantity}
                  </span>
                  <span className="text-sm whitespace-nowrap">-</span>
                  <span className="text-sm whitespace-nowrap">-</span>
                  <span className="text-sm whitespace-nowrap">
                    {Number(item.price).toFixed(2)} EGP
                  </span>
                  <span className="text-sm whitespace-nowrap">
                    {Number(item.price * item.quantity).toFixed(2)} EGP
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewUser;
