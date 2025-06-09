import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/Admin.context";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";

function Dashboard() {
  const { token } = useContext(AdminContext);
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/admin/overview",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setOverviewData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching overview data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (token) {
      fetchOverviewData();
    }
  }, [token]);

  if (loading)
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div className="text-red-500">
          Error loading dashboard data: {error}
        </div>
      </div>
    );

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div>
          <h1 className="text-2xl xs:text-4xl">dashboard overview</h1>
          <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
            monitor key metrics and navigate quickly to manage different
            sections
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">users overview</h2>
              <p className="text-lightgray text-xs xs:text-sm">
                overview of all registered users and their status
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">users no:</p>
                <p className="text-sm xs:text-base">blocked users no:</p>
                <Link
                  to={"/Admin/AllUsers"}
                  className="text-nowrap block w-fit text-sm text-white bg-primary px-4 py-1.5 rounded-sm border border-lightblack hover:bg-transparent hover:text-black transition duration-300"
                >
                  manage users
                </Link>
              </div>
              <div className="w-1/2 space-y-4 text-end sm:text-start">
                <p className="text-sm xs:text-base">
                  #{overviewData?.users?.total || 0}
                </p>
                <p className="text-sm xs:text-base">
                  #{overviewData?.users?.blocked || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">
                categories overview
              </h2>
              <p className="text-lightgray text-xs xs:text-sm">
                number of product categories in the system
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">categories no:</p>
                <p className="text-sm xs:text-base">subcategories no:</p>
                <Link
                  to={"/Admin/AllCategories"}
                  className="text-nowrap block w-fit text-sm text-white bg-primary px-4 py-1.5 rounded-sm border border-lightblack hover:bg-transparent hover:text-black transition duration-300"
                >
                  manage categories
                </Link>
              </div>
              <div className="w-1/2 space-y-4 text-end sm:text-start">
                <p className="text-sm xs:text-base">
                  #{overviewData?.categories?.total || 0}
                </p>
                <p className="text-xs xs:text-base">
                  #{overviewData?.categories?.sub_categories || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-8 lg:mt-16">
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">startups overview</h2>
              <p className="text-lightgray text-xs xs:text-sm">
                overview of all registered startups and their status
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-nowrap text-sm xs:text-base">
                  active startups no:
                </p>
                <p className="text-nowrap text-sm xs:text-base">
                  pending approvals no:
                </p>
                <p className="text-nowrap text-sm xs:text-base">
                  blocked startups no:
                </p>
                <Link
                  to={"/Admin/AllStartups"}
                  className="text-nowrap block w-fit text-sm text-white bg-primary px-4 py-1.5 rounded-sm border border-lightblack hover:bg-transparent hover:text-black transition duration-300"
                >
                  manage startups
                </Link>
              </div>
              <div className="w-1/2 space-y-4 text-end sm:text-start">
                <p className="text-sm xs:text-base">
                  #{overviewData?.startups?.active || 0}
                </p>
                <p className="text-sm xs:text-base">
                  #{overviewData?.startups?.pending_approvals || 0}
                </p>
                <p className="text-sm xs:text-base">
                  #{overviewData?.startups?.blocked || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-2xl xs:text-3xl mb-0.5">
                factories overview
              </h2>
              <p className="text-lightgray text-xs xs:text-sm">
                number of production factories and activity level
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-4">
                <p className="text-sm xs:text-base">factories no:</p>
                <p className="text-nowrap text-sm xs:text-base">
                  active factories no:
                </p>
                <p className="text-nowrap text-sm xs:text-base">
                  blocked factories no:
                </p>
                <Link
                  to={"/Admin/AllFactories"}
                  className="text-nowrap block w-fit text-sm text-white bg-primary px-4 py-1.5 rounded-sm border border-lightblack hover:bg-transparent hover:text-black transition duration-300"
                >
                  manage factories
                </Link>
              </div>
              <div className="w-1/2 space-y-4 text-end sm:text-start">
                <p className="text-sm xs:text-base">
                  #{overviewData?.factories?.total || 0}
                </p>
                <p className="text-nowrap text-xs xs:text-base">
                  #{overviewData?.factories?.active_Factories || 0}
                </p>
                <p className="text-nowrap text-xs xs:text-base">
                  #{overviewData?.factories?.blocked || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
