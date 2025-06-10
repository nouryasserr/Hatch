import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FactoryContext } from "../../../context/Factory.context";
import { useNavigate } from "react-router-dom";

function FactoryProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const { token, logout } = useContext(FactoryContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/factory/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          setProfile(response.data.data);
          setFormData(response.data.data);
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to fetch profile data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/factory/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setProfile(response.data.data);
        setIsEditing(false);
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your factory profile? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await axios.delete(
        "http://127.0.0.1:8000/api/factory/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success("Profile deleted successfully");
        logout();
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete profile");
    }
  };

  if (loading) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="text-center">Failed to load profile data</div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="flex gap-4 flex-wrap justify-between items-center">
          <div>
            <h2 className="text-2xl xs:text-3xl mb-0.5">
              factory # {profile.name}
            </h2>
            <p className="text-lightgray text-xs xs:text-sm">
              view complete information about your factory
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full xs:w-auto px-4 py-1.5 bg-primary text-white border border-lightblack rounded-sm hover:bg-transparent hover:text-black transition"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            <button
              onClick={handleDelete}
              className="w-full xs:w-auto px-4 py-1.5 bg-secondary border border-lightblack text-white rounded-sm hover:bg-transparent hover:text-black transition"
            >
              Delete Profile
            </button>
          </div>
        </div>
        {isEditing ? (
          <form onSubmit={handleUpdate} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      rows="4"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl mb-4">Payment Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1">Payment Method</label>
                    <input
                      type="text"
                      name="payment_methods"
                      value={formData.payment_methods}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">
                      Payment Account
                    </label>
                    <input
                      type="text"
                      name="payment_account"
                      value={formData.payment_account}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 border border-lightblack text-white rounded-sm hover:bg-transparent hover:text-black transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <div className="lg:w-1/2">
              <div className="mb-4 xs:mb-0">
                <h3 className="text-2xl mb-0.5">Basic Information</h3>
                <p className="text-lightgray text-xs xs:text-sm">
                  general profile and contact data
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="w-1/2 space-y-2">
                  <p className="text-sm xs:text-base">name:</p>
                  <p className="text-sm xs:text-base">email:</p>
                  <p className="text-sm xs:text-base">phone:</p>
                  <p className="text-sm xs:text-base">created at:</p>
                  <p className="text-sm xs:text-base">description</p>
                </div>
                <div className="w-1/2 space-y-2">
                  <p className="text-sm xs:text-base">{profile.name}</p>
                  <p className="text-sm xs:text-base overflow-hidden text-ellipsis">
                    {profile.email}
                  </p>
                  <p className="text-nowrap text-xs xs:text-base">
                    {profile.phone}
                  </p>
                  <p className="text-sm xs:text-base text-nowrap overflow-hidden text-ellipsis">
                    {new Date(profile.created_at).toLocaleString()}
                  </p>
                  <p className="text-sm xs:text-base overflow-hidden text-ellipsis line-clamp-3">
                    {profile.description || "-"}
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="mb-4 xs:mb-0">
                <h3 className="text-2xl mb-0.5">financial performance</h3>
                <p className="text-lightgray text-xs xs:text-sm">
                  track how much your factory has made on the platform
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="w-1/2 space-y-2">
                  <p className="text-sm xs:text-base">payment method:</p>
                  <p className="text-sm xs:text-base text-nowrap overflow-hidden text-ellipsis">
                    payment account:
                  </p>
                  <p className="text-sm xs:text-base">deals:</p>
                  <p className="text-sm xs:text-base">paid orders no:</p>
                  <p className="text-sm xs:text-base">total revenue:</p>
                </div>
                <div className="w-1/2 space-y-2">
                  <p className="text-sm xs:text-base">
                    {profile.payment_methods || "-"}
                  </p>
                  <p className="text-sm xs:text-base">
                    {profile.payment_account || "-"}
                  </p>
                  <p className="text-sm xs:text-base">
                    {profile.deals_count || "0"}
                  </p>
                  <p className="text-sm xs:text-base">
                    {profile.number_of_paid_orders || "0"}
                  </p>
                  <p className="text-sm xs:text-base">
                    {profile.total_revenue || "0"} EGP
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FactoryProfile;
