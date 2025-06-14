import { NavLink } from "react-router-dom";
import StartupProduct from "../../../components/StartupProduct/StartupProduct";
import StartupOrder from "../../../components/StartupOrder/StartupOrder";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StartupContext } from "../../../context/Startup.context";
import Loader from "../../../components/Loader/Loader";

function Overview() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(StartupContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/startup/products", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://127.0.0.1:8000/api/startup/orders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (productsRes.data.success) {
          setProducts(productsRes.data.data);
        }
        if (ordersRes.data.success) {
          const uniqueOrders = ordersRes.data.data.reduce((acc, item) => {
            if (!acc.find((order) => order.id === item.order_id)) {
              acc.push({
                id: item.order_id,
                user: item.order.user,
                total_price: item.order.total_price,
                status: item.order.status,
                created_at: item.order.created_at,
              });
            }
            return acc;
          }, []);
          setOrders(uniqueOrders);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-center text-secondary">Error: {error}</div>;
  const displayProducts = products.slice(0, 4);
  const totalRevenue = orders.reduce(
    (sum, order) => sum + parseFloat(order.total_price || 0),
    0
  );

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl xs:text-4xl">dashboard overview</h1>
            <p className="text-lightblack pt-0.5 text-sm xs:text-base">
              hello, {products[0]?.startup?.name || "Startup"}
            </p>
          </div>
        </div>
        <div className="flex gap-8 md:gap-4 items-center flex-wrap mt-6">
          <div className="grow space-y-2 md:space-y-6">
            <p className="space-x-3">
              <i className="fa-solid fa-circle text-green-500 text-xs"></i>
              <span>total product sold</span>
            </p>
            <h2 className="text-3xl">{orders.length} product</h2>
          </div>
          <div className="grow space-y-2 md:space-y-6">
            <p className="space-x-3">
              <i className="fa-solid fa-circle text-green-500 text-xs"></i>
              <span>total revenues</span>
            </p>
            <h2 className="text-3xl">{totalRevenue.toFixed(2)} EGP</h2>
          </div>
          <div className="grow space-y-2 md:space-y-6">
            <p className="space-x-3">
              <i className="fa-solid fa-circle text-green-500 text-xs"></i>
              <span>total orders</span>
            </p>
            <h2 className="text-3xl">{orders.length} order</h2>
          </div>
          <div className="grow space-y-2 md:space-y-6">
            <p className="space-x-3">
              <i className="fa-solid fa-circle text-secondary text-xs"></i>
              <span>available for sale</span>
            </p>
            <h2 className="text-3xl">{products.length} products</h2>
          </div>
        </div>
        <div className="mt-8 mb-4 flex flex-col xs:flex-row justify-between xs:items-center">
          <div className="mb-4 xs:mb-0">
            <h2 className="text-3xl mb-0.5">products</h2>
            <NavLink
              to="/Startup/Products"
              className={
                "text-lightblack text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
              }
            >
              view all products
            </NavLink>
          </div>
          <NavLink
            to={"/Startup/AddProduct"}
            className={
              "self-end xs:self-auto bg-primary rounded-full py-1.5 px-6 text-white border border-primary hover:border-black hover:bg-transparent hover:text-black transition duration-300 ease-in-out delay-150"
            }
          >
            add new product
          </NavLink>
        </div>
        <div className="flex gap-4 flex-wrap">
          {displayProducts.map((product) => (
            <StartupProduct key={product.id} product={product} />
          ))}
        </div>
        <div className="mb-4 mt-8 xs:mb-0">
          <h2 className="text-3xl mb-0.5">orders</h2>
          <NavLink
            to="/Startup/Orders"
            className={
              "text-lightblack text-sm underline hover:no-underline transition duration-300 ease-in-out delay-150"
            }
          >
            view order history
          </NavLink>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] grid grid-cols-5 items-center gap-4">
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
            {orders.slice(0, 4).map((order, index) => (
              <StartupOrder
                key={order.id}
                id={`order #${index + 1}`}
                customer={order.user?.name || "N/A"}
                amount={`${order.total_price || 0} EGP`}
                date={new Date(order.created_at).toLocaleDateString()}
                status={order.status || "N/A"}
                orderId={order.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
