import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import StartupOrder from "../../../components/StartupOrder/StartupOrder";
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
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/startup/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  const pendingOrders = orders.filter(
    (order) => order.order.status === "PENDING"
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
            <div className="min-w-[600px] flex justify-between items-center gap-4 px-4 py-2 ">
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
            {pendingOrders.map((orderItem) => (
              <StartupOrder
                key={orderItem.id}
                id={`order #${orderItem.order_id}`}
                customer={orderItem.order.user.name}
                amount={`${orderItem.price} EGP`}
                date={new Date(orderItem.created_at).toLocaleDateString()}
                status={orderItem.order.status}
              />
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
            <div className="min-w-[600px] flex justify-between items-center gap-4 px-4 py-2 ">
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
              <StartupOrder
                key={orderItem.id}
                id={`order #${orderItem.order_id}`}
                customer={orderItem.order.user.name}
                amount={`${orderItem.price} EGP`}
                date={new Date(orderItem.created_at).toLocaleDateString()}
                status={orderItem.order.status}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
