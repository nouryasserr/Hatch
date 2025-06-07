import { NavLink } from "react-router-dom";

function StartupOrder({ id, customer, amount, date, status }) {
  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return "bg-yellow-500";
      case "APPROVED":
        return "bg-green-500";
      case "CANCELLED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  const orderId = id.split("#")[1];

  return (
    <>
      <NavLink
        to={`/Startup/OrderDetails/${orderId}`}
        className={({ isActive }) =>
          `min-w-[600px] flex justify-between items-center gap-4 px-4 py-2 border-b hover:bg-gray-50 transition-colors duration-200 ${
            isActive ? "bg-gray-50" : ""
          }`
        }
      >
        <span className="text-sm whitespace-nowrap hover:underline">{id}</span>
        <span className="text-sm whitespace-nowrap">{customer}</span>
        <span className="text-sm whitespace-nowrap">{amount}</span>
        <span className="text-sm whitespace-nowrap">{date}</span>
        <span
          className={`text-sm whitespace-nowrap py-1 px-2 rounded-sm text-white ${getStatusStyle(
            status
          )}`}
        >
          {status}
        </span>
      </NavLink>
    </>
  );
}

export default StartupOrder;
