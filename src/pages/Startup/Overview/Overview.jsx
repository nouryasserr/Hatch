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
        setLoading(true);
        const [ordersResponse, productsResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/startup/orders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://127.0.0.1:8000/api/startup/products", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setOrders(ordersResponse.data.data);
        setProducts(productsResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  // Get only the first 4 products
  const displayProducts = products.slice(0, 4);
  // Calculate total revenue
  const totalRevenue = orders.reduce(
    (sum, order) => sum + parseFloat(order.price),
    0
  );

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div>
          <h1 className="text-2xl xs:text-4xl">dashboard overview</h1>
          <p className="text-lightblack pt-0.5 text-sm xs:text-base">
            hello, brand name
          </p>
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
        <div className="overflow-x-auto">
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
            {orders.slice(0, 4).map((orderItem) => (
              <StartupOrder
                key={orderItem.id}
                id={`order #${orderItem.id}`}
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

export default Overview;
