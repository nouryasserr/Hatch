import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StartupContext } from "../../../context/Startup.context";
import Loader from "../../../components/Loader/Loader";
import StartupInvoice from "../../../components/StartupInvoice/StartupInvoice";

function OrderDetails() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(StartupContext);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!token || !id) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/startup/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setOrderDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [token, id]);

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
        <div className="text-red-500">Error loading order details: {error}</div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="text-gray-500">No order details found</div>
      </div>
    );
  }

  // Format date to a readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="flex justify-between gap-2 flex-wrap">
          <div>
            <h2 className="text-3xl mb-0.5">
              order #{orderDetails.order_id} - details page
            </h2>
            <p className="text-lightblack text-sm">
              this page shows full details of the selected order
            </p>
          </div>
          <Link className="border border-primary bg-primary text-white p-2 px-4 flex items-center gap-2 h-fit hover:bg-transparent hover:border-black hover:text-black transition duration-300 ease-in-out delay-150">
            <i className="fa-solid fa-download"></i>
            <span>Export</span>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-3xl mb-0.5">customer info</h2>
              <p className="text-lightblack text-sm">
                overview of the customer details and shipping address
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">name</p>
                <p className="text-sm xs:text-base">email</p>
                <p className="text-sm xs:text-base">phone</p>
                <p className="text-sm xs:text-base">second phone</p>
              </div>
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">
                  {orderDetails.order.user.name}
                </p>
                <p className="text-sm xs:text-base">
                  {orderDetails.order.user.email}
                </p>
                <p className="text-sm xs:text-base">
                  {orderDetails.order.user.phone}
                </p>
                <p className="text-sm xs:text-base">
                  {orderDetails.order.second_phone}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="mb-4 xs:mb-0">
              <h2 className="text-3xl mb-0.5">order info</h2>
              <p className="text-lightblack text-sm">
                overview of the order status, timing and payment
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">order id</p>
                <p className="text-sm xs:text-base">created at</p>
                <p className="text-sm xs:text-base">status</p>
                <p className="text-sm xs:text-base">total price</p>
              </div>
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">#{orderDetails.order_id}</p>
                <p className="text-nowrap text-xs xs:text-base">
                  {formatDate(orderDetails.created_at)}
                </p>
                <p className="text-sm xs:text-base">
                  {orderDetails.order.status}
                </p>
                <p className="text-sm xs:text-base">
                  {orderDetails.order.total_price} EGP
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 mt-8 xs:mb-0">
          <h2 className="text-3xl mb-0.5">products</h2>
          <p className="text-lightblack text-sm">
            all items included in this order
          </p>
        </div>
        <div className="overflow-x-auto">
          <div>
            <div className="min-w-[600px] flex justify-between items-center gap-4 px-4 py-2">
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
                unit price
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                subtotal
              </span>
            </div>
            <div className="min-w-[600px] flex justify-between items-center gap-4 px-4 py-2 bg-gray-50">
              <span className="text-sm whitespace-nowrap">
                {orderDetails.product.name}
              </span>
              <span className="text-sm whitespace-nowrap">
                {orderDetails.quantity}
              </span>
              <span className="text-sm whitespace-nowrap">
                {orderDetails.product_size_id}
              </span>
              <span className="text-sm whitespace-nowrap">
                {orderDetails.price} EGP
              </span>
              <span className="text-sm whitespace-nowrap">
                {Number(orderDetails.price) * orderDetails.quantity} EGP
              </span>
            </div>
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
                <p className="text-sm xs:text-base">address</p>
                <p className="text-sm xs:text-base">city</p>
                <p className="text-sm xs:text-base">payment method</p>
              </div>
              <div className="w-1/2 space-y-2">
                <p className="text-sm xs:text-base">
                  {orderDetails.order.user.addresses.find(
                    (addr) => addr.id === orderDetails.order.address_id
                  )?.address || "-"}
                </p>
                <p className="text-sm xs:text-base">
                  {orderDetails.order.user.addresses.find(
                    (addr) => addr.id === orderDetails.order.address_id
                  )?.city || "-"}
                </p>
                <p className="text-sm xs:text-base">
                  {orderDetails.order.payment_method?.toUpperCase() || "COD"}
                </p>
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
              <StartupInvoice orderDetails={orderDetails} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
