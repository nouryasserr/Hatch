import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/Admin.context";
import Loader from "../../../components/Loader/Loader";

function AllFactories() {
  const [factories, setFactories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const { token } = useContext(AdminContext);

  const fetchFactories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://127.0.0.1:8000/api/admin/factory/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setFactories(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch factories");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (factoryId) => {
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
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setFactories(factories.filter((factory) => factory.id !== factoryId));
      } else {
        throw new Error(data.message || "Failed to delete factory");
      }
    } catch (err) {
      setError(`Failed to delete factory: ${err.message}`);
    } finally {
      setDeleteLoading(null);
    }
  };

  useEffect(() => {
    fetchFactories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
        {error && <div className="text-red-500 mb-4">Error: {error}</div>}
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] grid grid-cols-6 items-center gap-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                factory id
              </span>
              <span className="col-span-2 text-sm whitespace-nowrap text-lightblack">
                factory name
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                status
              </span>
              <span className="col-span-2 text-sm whitespace-nowrap text-lightblack">
                actions
              </span>
            </div>
            {factories.map((factory) => (
              <div
                key={factory.id}
                className="min-w-[600px] grid grid-cols-6 items-center gap-4 mt-3"
              >
                <span className="text-sm whitespace-nowrap">{factory.id}</span>
                <span className="col-span-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  {factory.name}
                </span>
                <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  {factory.status}
                </span>
                <div className="flex gap-6 col-span-2">
                  <NavLink
                    to={`/Admin/ViewFactory/${factory.id}`}
                    className="text-sm whitespace-nowrap bg-primary text-white rounded-sm py-1 px-4 border border-lightblack hover:bg-transparent hover:text-black transition duration-300"
                  >
                    view
                  </NavLink>
                  <button
                    onClick={() => handleDelete(factory.id)}
                    disabled={deleteLoading === factory.id}
                    className="text-sm whitespace-nowrap bg-secondary text-white rounded-sm py-1 px-4 border border-lightblack hover:bg-transparent hover:text-black transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleteLoading === factory.id ? "Deleting..." : "delete"}
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

export default AllFactories;
