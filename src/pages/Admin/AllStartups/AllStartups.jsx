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

    if (token) {
      fetchStartups();
    }
  }, [token]);

  const handleAccept = async (id) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/startup/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Startup has been approved successfully");
        setStartups((prevStartups) =>
          prevStartups.map((startup) =>
            startup.id === id ? { ...startup, status: "APPROVED" } : startup
          )
        );
      }
    } catch (error) {
      console.error("Error accepting startup:", error);
      toast.error(error.response?.data?.message || "Failed to approve startup");
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/startup/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Startup has been rejected successfully");
        setStartups((prevStartups) =>
          prevStartups.map((startup) =>
            startup.id === id ? { ...startup, status: "REJECTED" } : startup
          )
        );
      }
    } catch (error) {
      console.error("Error rejecting startup:", error);
      toast.error(error.response?.data?.message || "Failed to reject startup");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return "text-green-500";
      case "REJECTED":
        return "text-secondary";
      case "PENDING":
        return "text-primary";
      case "SUSPENDED":
        return "text-yellow-500";
      default:
        return "text-lightblack";
    }
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
        <div className="text-red-500">Error loading startups: {error}</div>
      </div>
    );
  }

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
                id
              </span>
              <span className="col-span-2 text-sm whitespace-nowrap text-lightblack">
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
              <span className="col-span-2 text-sm whitespace-nowrap text-lightblack">
                actions
              </span>
            </div>
            {startups?.map((startup) => (
              <div
                key={startup.id}
                className="min-w-[850px] grid grid-cols-8 items-center gap-4 mt-3"
              >
                <Link
                  to={`/Admin/ViewStartup/${startup.id}`}
                  className="text-sm whitespace-nowrap"
                >
                  {startup.id}
                </Link>
                <span className="col-span-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
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
                <div className="col-span-2 flex gap-2">
                  {startup.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleAccept(startup.id)}
                        className="w-fit text-sm whitespace-nowrap bg-green-500 text-white rounded-sm py-1 px-4 border border-lightblack hover:bg-transparent hover:text-black transition duration-300"
                      >
                        accept
                      </button>
                      <button
                        onClick={() => handleReject(startup.id)}
                        className="w-fit text-sm whitespace-nowrap bg-secondary text-white rounded-sm py-1 px-4 border border-lightblack hover:bg-transparent hover:text-black transition duration-300"
                      >
                        reject
                      </button>
                    </>
                  )}
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
