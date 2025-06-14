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
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const { token } = useContext(StartupContext);
  useEffect(() => {
    const fetchOrdersAndCount = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const [ordersRes, countRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/startup/orders", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
          axios.get("http://127.0.0.1:8000/api/startup/orders/count/new", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);
        setOrders(ordersRes.data.data || []);
        setNewOrdersCount(countRes.data.data?.new_orders_count || 0);
      } catch (error) {
        console.error("Error fetching orders or count:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrdersAndCount();
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
  const historyOrders = orders.filter(
    (order) => order.order?.status !== "PENDING"
  );

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div>
          <h1 className="text-3xl xs:text-4xl mb-0.5">orders</h1>
          <p className="text-lightgray text-sm">
            track and manage your orders easily
          </p>
        </div>
        <div className="mb-4 mt-4 xs:mb-0">
          <div className="flex gap-2 items-center">
            <h2 className="text-3xl mb-0.5">new orders</h2>
            <span className="bg-primary text-sm font-extralight text-white rounded-full py-0.5 px-4">
              {newOrdersCount}
            </span>
          </div>
          <p className="text-lightgray text-sm">
            you have {newOrdersCount} new orders ready to review
          </p>
        </div>
        <div className="mb-4 mt-8 xs:mb-0">
          <h2 className="text-3xl mb-0.5">orders history</h2>
          <p className="text-lightgray text-sm">
            your completed and cancelled orders
          </p>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] grid grid-cols-5 items-center gap-4 border-b space-y-4 py-2">
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
            {pendingOrders.map((orderItem, idx) => (
              <div
                key={orderItem.id}
                className="min-w-[600px] grid grid-cols-5 items-center gap-4 border-b space-y-4 py-2"
              >
                <Link
                  to={`/Startup/OrderDetails/${orderItem.id}`}
                  className="text-sm"
                >
                  {idx + 1}
                </Link>
                <p className="text-sm">
                  {orderItem.order?.user?.name || "N/A"}
                </p>
                <p className="text-sm">{orderItem.price || 0} EGP</p>
                <p className="text-sm">
                  {new Date(orderItem.created_at).toLocaleDateString()}
                </p>
                <p
                  className={`w-fit text-sm py-1 px-2 ${
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
        <div>
          {historyOrders.map((orderItem) => (
            <div
              key={orderItem.id}
              className="min-w-[600px] grid grid-cols-5 items-center gap-4 border-b space-y-4 py-2"
            >
              <Link
                to={`/Startup/OrderDetails/${orderItem.id}`}
                className="text-sm"
              >
                order #{orderItem.id}
              </Link>
              <p className="text-sm">{orderItem.order?.user?.name || "N/A"}</p>
              <p className="text-sm">{orderItem.price || 0} EGP</p>
              <p className="text-sm">
                {new Date(orderItem.created_at).toLocaleDateString()}
              </p>
              <p
                className={`w-fit text-sm py-1 px-2 ${
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
    </>
  );
}

export default Orders;
