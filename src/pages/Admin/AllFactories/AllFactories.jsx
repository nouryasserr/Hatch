import { Link, Links, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/Admin.context";
import Loader from "../../../components/Loader/Loader";

function AllFactories() {
  const navigate = useNavigate();
  const [factories, setFactories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [blockLoading, setBlockLoading] = useState(null);
  const { token } = useContext(AdminContext);

  const fetchFactories = async () => {
    try {
      if (!token) {
        navigate("/Auth/Signin");
        return;
      }

      setLoading(true);
      setError(null);
      const response = await fetch("http://127.0.0.1:8000/api/admin/factory", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.status === 401) {
        navigate("/Auth/Signin");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      if (data.success) {
        setFactories(data.data || []);
      } else {
        throw new Error(data.message || "Failed to fetch factories");
      }
    } catch (err) {
      console.error("Error fetching factories:", err);
      setError(
        err.message || "Failed to fetch factories. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (factoryId) => {
    if (!token) {
      navigate("/Auth/Signin");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this factory?")) {
      return;
    }

    try {
      setDeleteLoading(factoryId);
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/factory/${factoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 401) {
        navigate("/Auth/Signin");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      if (data.success) {
        setFactories(factories.filter((factory) => factory.id !== factoryId));
      } else {
        throw new Error(data.message || "Failed to delete factory");
      }
    } catch (err) {
      console.error("Error deleting factory:", err);
      setError(`Failed to delete factory: ${err.message}`);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleBlockToggle = async (factoryId, currentStatus) => {
    if (!token) {
      navigate("/Auth/Signin");
      return;
    }

    const action = currentStatus === "BLOCKED" ? "unblock" : "block";
    if (!window.confirm(`Are you sure you want to ${action} this factory?`)) {
      return;
    }

    try {
      setBlockLoading(factoryId);
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/factory/${factoryId}/block`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 401) {
        navigate("/Auth/Signin");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      if (data.success) {
        setFactories(
          factories.map((factory) =>
            factory.id === factoryId
              ? {
                  ...factory,
                  status: factory.status === "BLOCKED" ? "APPROVED" : "BLOCKED",
                }
              : factory
          )
        );
      } else {
        throw new Error(data.message || `Failed to ${action} factory`);
      }
    } catch (err) {
      console.error(`Error ${action}ing factory:`, err);
      setError(`Failed to ${action} factory: ${err.message}`);
    } finally {
      setBlockLoading(null);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFactories();
    } else {
      navigate("/Auth/Signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div>
          <h1 className="text-2xl xs:text-4xl">all factories</h1>
          <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
            administer factory accounts on the platform
          </p>
        </div>
        <div className="mt-8 mb-4 gap-4 flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="mb-4 xs:mb-0">
            <h2 className="text-2xl xs:text-3xl mb-0.5">factories list</h2>
            <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
              list of all factories with basic info and quick actions
            </p>
          </div>
          <NavLink
            to={"/Admin/AddFactory"}
            className={
              "self-end xs:self-auto bg-primary rounded-full py-1.5 px-6 text-white border border-primary hover:border-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
            }
          >
            add new factory
          </NavLink>
        </div>
        {error && (
          <div className="text-secondary mb-4 p-3 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] grid grid-cols-7 items-center gap-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                factory id
              </span>
              <span className="col-span-2 text-sm whitespace-nowrap text-lightblack">
                factory name
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                status
              </span>
              <span className="col-span-3 text-sm whitespace-nowrap text-lightblack">
                actions
              </span>
            </div>
            {factories.length === 0 && !error ? (
              <div className="text-center py-4 text-lightblaxk">
                No factories found
              </div>
            ) : (
              factories.map((factory, index) => (
                <div
                  key={factory.id}
                  className="min-w-[600px] grid grid-cols-7 items-center gap-4 mt-3"
                >
                  <Link
                    to={`/Admin/FactoryDetails/${factory.id}`}
                    className="text-sm whitespace-nowrap"
                  >
                    {index + 1}
                  </Link>
                  <span className="col-span-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {factory.name}
                  </span>
                  <span
                    className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis ${
                      factory.status === "BLOCKED"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {factory.status}
                  </span>
                  <div className="flex gap-4 col-span-3">
                    <NavLink
                      to={`/Admin/FactoryDetails/${factory.id}`}
                      className="text-sm whitespace-nowrap bg-primary text-white rounded-sm py-1 px-4 border border-lightblack hover:bg-transparent hover:text-black transition duration-300"
                    >
                      view
                    </NavLink>
                    <button
                      onClick={() =>
                        handleBlockToggle(factory.id, factory.status)
                      }
                      disabled={blockLoading === factory.id}
                      className={`text-sm whitespace-nowrap ${
                        factory.status === "BLOCKED"
                          ? "bg-green-500 hover:text-black"
                          : "bg-blue-500 hover:text-black"
                      } text-white rounded-sm py-1 px-4 border border-lightblack hover:bg-transparent transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {blockLoading === factory.id
                        ? "Processing..."
                        : factory.status === "BLOCKED"
                        ? "unblock"
                        : "block"}
                    </button>
                    <button
                      onClick={() => handleDelete(factory.id)}
                      disabled={deleteLoading === factory.id}
                      className="text-sm whitespace-nowrap bg-secondary text-white rounded-sm py-1 px-4 border border-lightblack hover:bg-transparent hover:text-black transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleteLoading === factory.id ? "Deleting..." : "delete"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllFactories;
