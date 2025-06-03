import { Link } from "react-router-dom";
import StartupOrder from "../../../components/StartupOrder/StartupOrder";
import { useEffect, useState } from "react";
import axios from "axios";
import Invoice from "../../../components/Invoice/Invoice";
function OrderDetails() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/startup/orders"
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);
  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="flex justify-between gap-2 flex-wrap">
          <div>
            <h2 className="text-3xl mb-0.5">order #7 - details page</h2>
            <p className="text-lightblack text-sm">
              this page shows full details of the selected order
            </p>
          </div>
          <Link className="border border-primary bg-primary text-white p-2 px-4 flex items-center gap-2 h-fit hover:bg-transparent hover:border-black hover:text-black transition duration-300 ease-in-out delay-150">
            <i className="fa-solid fa-download"></i>
            <span>Export</span>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="lg:w-1/2">
            <div className="mb-4 mt-8 xs:mb-0">
              <h2 className="text-3xl mb-0.5">customer info</h2>
              <p className="text-lightblack text-sm">
                basic details about the user who placed this order
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">name</p>
                <p className="text-sm xs:text-base">email</p>
                <p className="text-sm xs:text-base">phone</p>
                <p className="text-sm xs:text-base">email verified</p>
              </div>
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">ziad amr</p>
                <p className="text-sm xs:text-base">zi*******@gmail.com</p>
                <p className="text-sm xs:text-base">01060816***</p>
                <p className="text-sm xs:text-base">no</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 mt-8 xs:mb-0">
              <h2 className="text-3xl mb-0.5">order info</h2>
              <p className="text-lightblack text-sm">
                overview of the order status. timing and payment
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">order id</p>
                <p className="text-sm xs:text-base">created at</p>
                <p className="text-nowrap text-xs xs:text-base">
                  discount percentage
                </p>
                <p className="text-sm xs:text-base">total price</p>
              </div>
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">7</p>
                <p className="text-nowrap text-xs xs:text-base">
                  26 may 2025 - 2:22 pm
                </p>
                <p className="text-sm xs:text-base">-</p>
                <p className="text-sm xs:text-base">883 EGP</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 mt-8 xs:mb-0">
          <h2 className="text-3xl mb-0.5">products</h2>
          <p className="text-lightblack text-sm">
            all items included in this oreder.
          </p>
        </div>
        <div className="overflow-x-auto">
          <div>
            <div className="min-w-[600px] flex justify-between items-center gap-4 px-4 py-2 ">
              <span className="text-sm whitespace-nowrap text-lightblack">
                product
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                quantity
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                size
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                color
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                unit price
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                subtotal
              </span>
            </div>
            {orders.map((order) => (
              <StartupOrder
                key={order.id}
                id={`#${order.id}`}
                customer={order.customer_name}
                amount={`${order.amount} EGP`}
                date={order.order_date}
                status={order.status}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="lg:w-1/2">
            <div className="mb-4 mt-8 xs:mb-0">
              <h2 className="text-3xl mb-0.5">delivery</h2>
              <p className="text-lightblack text-sm">
                this section will show shipping information
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-2">
                <p>address</p>
                <p>payment method</p>
                <p>additional information</p>
              </div>
              <div className="w-1/2 space-y-2">
                <p>2**b - hadayek el ahram</p>
                <p>COD</p>
                <p>-</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 mt-8 xs:mb-0">
              <h2 className="text-3xl mb-0.5">invoice</h2>
              <p className="text-lightblack text-sm">
                break down of the payment details for this order
              </p>
            </div>
            <div className="mt-4 xs:w-3/4">
              <Invoice />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
