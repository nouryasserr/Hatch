import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FactoryContext } from "../../../context/Factory.context";

function FactoryProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(FactoryContext);

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
        <div>
          <h2 className="text-3xl mb-0.5">{profile.name}</h2>
          <p className="text-lightblack text-sm">
            View complete information about your factory.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-3xl mb-0.5">Basic Information</h2>
              <p className="text-lightblack text-sm">
                General profile and contact data
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">Name</p>
                <p className="text-sm xs:text-base">Average Rating</p>
                <p className="text-sm xs:text-base">Status</p>
                <p className="text-sm xs:text-base">Created At</p>
                <p className="text-sm xs:text-base">Description</p>
              </div>
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">{profile.name}</p>
                <p className="text-sm xs:text-base">
                  {profile.average_rating || "N/A"}
                </p>
                <p className="text-sm xs:text-base">{profile.status}</p>
                <p className="text-sm xs:text-base">
                  {new Date(profile.created_at).toLocaleString()}
                </p>
                <p className="text-sm xs:text-base">
                  {profile.description || "-"}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-3xl mb-0.5">Contact Info</h2>
              <p className="text-lightblack text-sm">
                Contact details submitted when registering the factory
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">Email</p>
                <p className="text-sm xs:text-base">Phone</p>
                <p className="text-sm xs:text-base">Social Media</p>
              </div>
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">{profile.email}</p>
                <p className="text-nowrap text-xs xs:text-base">
                  {profile.phone}
                </p>
                <div className="space-y-1">
                  {profile.social_media_links &&
                    Object.entries(profile.social_media_links).map(
                      ([platform, link]) => (
                        <a
                          key={platform}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm xs:text-base text-blue-600 hover:underline"
                        >
                          {platform}
                        </a>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-3xl mb-0.5">Payment Info</h2>
              <p className="text-lightblack text-sm">
                This is where you can view your payment information
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">Payment Method</p>
                <p className="text-sm xs:text-base">Payment Account</p>
              </div>
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">
                  {profile.payment_method || "-"}
                </p>
                <p className="text-sm xs:text-base">
                  {profile.payment_account || "-"}
                </p>
              </div>
            </div>
          </div>
          {profile.statistics && (
            <div className="lg:w-1/2">
              <div className="mb-4 xs:mb-0">
                <h2 className="text-3xl mb-0.5">Financial Performance</h2>
                <p className="text-lightblack text-sm">
                  Track how much your factory has made on the platform
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="w-1/2 space-y-2">
                  <p className="text-sm xs:text-base">Total Revenue</p>
                  <p className="text-sm xs:text-base">No. of Paid Orders</p>
                  <p className="text-sm xs:text-base">Avg. Order Value</p>
                </div>
                <div className="w-1/2 space-y-2">
                  <p className="text-sm xs:text-base">
                    {profile.statistics.total_revenue || "0"} EGP
                  </p>
                  <p className="text-nowrap text-xs xs:text-base">
                    {profile.statistics.paid_orders || "0"}
                  </p>
                  <p className="text-sm xs:text-base">
                    {profile.statistics.average_order || "0"} EGP
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FactoryProfile;
