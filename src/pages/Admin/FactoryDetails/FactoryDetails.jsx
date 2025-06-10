import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../../../context/Admin.context";
import Loader from "../../../components/Loader/Loader";

function FactoryDetails() {
  const { id } = useParams();
  const { token } = useContext(AdminContext);
  const [factory, setFactory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFactoryDetails() {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/admin/factory/",
          {
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
          const factoryData = data.data.find((f) => f.id === parseInt(id));
          if (factoryData) {
            setFactory(factoryData);
          } else {
            throw new Error("Factory not found");
          }
        } else {
          throw new Error(data.message || "Failed to fetch factory details");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id && token) {
      fetchFactoryDetails();
    }
  }, [id, token]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!factory) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="text-gray-500">Factory not found</div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div>
          <h2 className="text-2xl xs:text-3xl mb-0.5">
            factory #{factory.id} - {factory.name}
          </h2>
          <p className="text-lightgray text-xs xs:text-sm">
            view complete information about this factory, its responses, deals,
            and requests
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h3 className="text-2xl mb-0.5">Basic Information</h3>
              <p className="text-lightgray text-xs xs:text-sm">
                general profile and contact data
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">name:</p>
                <p className="text-sm xs:text-base">email:</p>
                <p className="text-sm xs:text-base">phone:</p>
                <p className="text-sm xs:text-base">created at:</p>
                <p className="text-sm xs:text-base">description</p>
              </div>
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">{factory.name}</p>
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis">
                  {factory.email}
                </p>
                <p className="text-nowrap text-xs xs:text-base">
                  {factory.phone}
                </p>
                <p className="text-sm xs:text-base text-nowrap overflow-hidden text-ellipsis">
                  {new Date(factory.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm xs:text-base overflow-hidden text-ellipsis line-clamp-3">
                  {factory.description}
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
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">payment method:</p>
                <p className="text-sm xs:text-base text-nowrap overflow-hidden text-ellipsis">
                  payment account:
                </p>
                <p className="text-sm xs:text-base">deals:</p>
                <p className="text-sm xs:text-base">paid orders no:</p>
                <p className="text-sm xs:text-base">total revenue:</p>
              </div>
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">
                  {factory.payment_methods}
                </p>
                <p className="text-sm xs:text-base">
                  {factory.payment_account}
                </p>
                <p className="text-sm xs:text-base">{factory.deals_count}</p>
                <p className="text-sm xs:text-base">
                  {factory.number_of_paid_orders}
                </p>
                <p className="text-sm xs:text-base">
                  {factory.total_revenue} EGP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FactoryDetails;
