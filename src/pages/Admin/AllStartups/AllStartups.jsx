import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/Admin.context";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import toast from "react-hot-toast";

function AllStartups() {
  const { token } = useContext(AdminContext);
  const [startups, setStartups] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStartups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchStartups = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/startups",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStartups(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching startups:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDeleteStartup = async (startupId) => {
    try {
      const confirmMessage = "Are you sure you want to delete this startup?";
      if (!window.confirm(confirmMessage)) {
        return;
      }

      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/startup/${startupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Startup deleted successfully");
        fetchStartups();
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.status === 500) {
        toast.error(
          "Cannot delete this startup. Please make sure all related data is handled first."
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            "Failed to delete startup. Please try again later."
        );
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-500";
      case "APPROVED":
        return "text-green-500";
      case "REJECTED":
        return "text-red-500";
      default:
        return "text-black";
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
        <div className="text-red-500">Error loading startups: {error}</div>
      </div>
    );

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div>
          <h1 className="text-2xl xs:text-4xl">all startups</h1>
          <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
            view and manage all registered startups
          </p>
        </div>
        <div className="mb-4 xs:mb-0 mt-4">
          <h2 className="text-2xl xs:text-3xl mb-0.5">startups list</h2>
          <p className="text-lightgray text-xs xs:text-sm">
            list of all startups with basic info and quick actions
          </p>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[800px] grid grid-cols-8 items-center gap-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                startup id
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                name
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                category
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                status
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                package
              </span>
              <span className="col-span-3 text-sm whitespace-nowrap text-lightblack">
                actions
              </span>
            </div>
            {startups?.map((startup, index) => (
              <div
                key={startup.id}
                className="min-w-[850px] grid grid-cols-8 items-center gap-4 mt-3"
              >
                <span className="text-sm whitespace-nowrap">{index + 1}</span>
                <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  {startup.name}
                </span>
                <span className="text-sm whitespace-nowrap">
                  {startup.category?.name || "N/A"}
                </span>
                <span
                  className={`text-sm whitespace-nowrap ${getStatusColor(
                    startup.status
                  )}`}
                >
                  {startup.status}
                </span>
                <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  {startup.package?.name || "N/A"}
                </span>
                <div className="col-span-3 flex gap-2">
                  <Link
                    to={`/Admin/ViewStartup/${startup.id}`}
                    className="w-fit text-sm whitespace-nowrap bg-primary text-white rounded-sm py-1 px-4 border border-lightblack hover:bg-transparent hover:text-black transition duration-300"
                  >
                    view
                  </Link>
                  <button
                    onClick={() => handleDeleteStartup(startup.id)}
                    className="w-fit text-sm whitespace-nowrap bg-secondary text-white rounded-sm py-1 px-4 border border-lightblack hover:bg-transparent hover:text-black transition duration-300"
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllStartups;
