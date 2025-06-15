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

  if (!orderDetails || !orderDetails.order) {
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-6">
        <div className="text-gray-500">No order details found</div>
      </div>
    );
  }

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
        <div>
          <h2 className="text-3xl mb-0.5">
            order #{orderDetails.order_id || id} - details page
          </h2>
          <p className="text-lightblack text-sm">
            this page shows full details of the selected order
          </p>
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
                  {orderDetails.order?.user?.name || "N/A"}
                </p>
                <p className="text-sm xs:text-base">
                  {orderDetails.order?.user?.email || "N/A"}
                </p>
                <p className="text-sm xs:text-base">
                  {orderDetails.order?.user?.phone || "N/A"}
                </p>
                <p className="text-sm xs:text-base">
                  {orderDetails.order?.second_phone || "N/A"}
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
                <p className="text-sm xs:text-base">
                  #{orderDetails.order_id || id}
                </p>
                <p className="text-nowrap text-xs xs:text-base">
                  {orderDetails.created_at
                    ? formatDate(orderDetails.created_at)
                    : "N/A"}
                </p>
                <p className="text-sm xs:text-base">
                  {orderDetails.order?.status || "N/A"}
                </p>
                <p className="text-sm xs:text-base">
                  {orderDetails.order?.total_price
                    ? `${orderDetails.order.total_price} EGP`
                    : "N/A"}
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
            <div className="min-w-[600px] grid grid-cols-5 items-center gap-4 border-b space-y-4 py-2">
              <span className="text-sm whitespace-nowrap text-lightblack">
                product
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                quantity
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                status
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                unit price
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                subtotal
              </span>
            </div>
            <div className="min-w-[600px] grid grid-cols-5 items-center gap-4 border-b space-y-4 py-2">
              <span className="text-sm whitespace-nowrap">
                {orderDetails?.product?.name || "N/A"}
              </span>
              <span className="text-sm whitespace-nowrap">
                {orderDetails?.quantity
                  ? `${orderDetails.quantity} item`
                  : "N/A"}
              </span>
              <span className="text-sm whitespace-nowrap">
                {orderDetails?.order?.status || "N/A"}
              </span>
              <span className="text-sm whitespace-nowrap">
                {orderDetails?.price ? `${orderDetails.price} EGP` : "N/A"}
              </span>
              <span className="text-sm whitespace-nowrap">
                {orderDetails?.price && orderDetails?.quantity
                  ? `${Number(orderDetails.price) * orderDetails.quantity} EGP`
                  : "N/A"}
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
                  {(() => {
                    const addresses = orderDetails.order?.user?.addresses || [];
                    const selectedAddress = addresses.find(
                      (addr) => addr?.id === orderDetails.order?.address_id
                    );
                    return selectedAddress?.address || "N/A";
                  })()}
                </p>
                <p className="text-sm xs:text-base">
                  {(() => {
                    const addresses = orderDetails.order?.user?.addresses || [];
                    const selectedAddress = addresses.find(
                      (addr) => addr?.id === orderDetails.order?.address_id
                    );
                    return selectedAddress?.city || "N/A";
                  })()}
                </p>
                <p className="text-sm xs:text-base">
                  {orderDetails.order?.payment_method?.toUpperCase() || "COD"}
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
