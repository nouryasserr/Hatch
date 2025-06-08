import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StartupContext } from "../../../context/Startup.context";
import Loader from "../../../components/Loader/Loader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(StartupContext);
  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/startup/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setOrders(response.data.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="text-red-500">Error loading orders: {error}</div>
      </div>
    );
  }
  const pendingOrders = orders.filter(
    (order) => order.order?.status === "PENDING"
  );

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="flex justify-between gap-2 flex-wrap">
          <div>
            <h2 className="text-3xl mb-0.5">orders</h2>
            <p className="text-lightblack text-sm">
              track and manage your orders easily
            </p>
          </div>
          <Link className="border border-black p-2 px-4 flex items-center gap-2 h-fit hover:bg-black hover:text-white transition duration-300 ease-in-out delay-150">
            <i className="fa-solid fa-download"></i>
            <span>Export</span>
          </Link>
        </div>
        <div className="mb-4 mt-8 xs:mb-0">
          <div className="flex gap-2 items-center">
            <h2 className="text-3xl mb-0.5">new orders</h2>
            <span className="bg-primary text-sm font-extralight text-white rounded-full py-0.5 px-4">
              {pendingOrders.length}
            </span>
          </div>
          <NavLink className={"text-lightblack"}>
            you have {pendingOrders.length} new orders ready to review
          </NavLink>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] flex justify-between items-center gap-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                order id
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                customer
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                amount
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                order date
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                status
              </span>
            </div>
            {orders.map((orderItem) => (
              <div
                key={orderItem.id}
                className="min-w-[600px] flex justify-between items-center gap-4 mb-4"
              >
                <Link
                  to={`/Startup/OrderDetails/${orderItem.id}`}
                  className="text-sm"
                >
                  order #{orderItem.id}
                </Link>
                <p className="text-sm">
                  {orderItem.order?.user?.name || "N/A"}
                </p>
                <p className="text-sm">{orderItem.price || 0} EGP</p>
                <p className="text-sm">
                  {new Date(orderItem.created_at).toLocaleDateString()}
                </p>
                <p
                  className={`text-sm py-1 px-2 ${
                    orderItem.order?.status === "PENDING"
                      ? "bg-yellow-500"
                      : orderItem.order?.status === "APPROVED"
                      ? "bg-green-500"
                      : "bg-secondary"
                  } text-white`}
                >
                  {orderItem.order?.status || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4 mt-8 xs:mb-0">
          <h2 className="text-3xl mb-0.5">orders history</h2>
          <NavLink className={"text-lightblack"}>
            your completed and cancelled orders
          </NavLink>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] flex justify-between items-center gap-4 px-4 py-2">
              <span className="text-sm whitespace-nowrap text-lightblack">
                order id
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                customer
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                amount
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                order date
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                status
              </span>
            </div>
            {orders.map((orderItem) => (
              <div
                key={orderItem.id}
                className="min-w-[600px] flex justify-between items-center gap-4 mb-4 px-4 py-2"
              >
                <Link
                  to={`/Startup/OrderDetails/${orderItem.id}`}
                  className="text-sm"
                >
                  order #{orderItem.id}
                </Link>
                <p className="text-sm">
                  {orderItem.order?.user?.name || "N/A"}
                </p>
                <p className="text-sm">{orderItem.price || 0} EGP</p>
                <p className="text-sm">
                  {new Date(orderItem.created_at).toLocaleDateString()}
                </p>
                <p
                  className={`text-sm py-1 px-2 ${
                    orderItem.order?.status === "PENDING"
                      ? "bg-yellow-500"
                      : orderItem.order?.status === "APPROVED"
                      ? "bg-green-500"
                      : "bg-secondary"
                  } text-white`}
                >
                  {orderItem.order?.status || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
