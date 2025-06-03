function StartupOrder({ id, customer, amount, date, status }) {
  return (
    <>
      <div className="min-w-[600px] flex justify-between items-center gap-4 px-4 py-2 border-b">
        <span className="text-sm whitespace-nowrap text-lightblack">{id}</span>
        <span className="text-sm whitespace-nowrap text-lightblack">
          {customer}
        </span>
        <span className="text-sm whitespace-nowrap text-lightblack">
          {amount}
        </span>
        <span className="text-sm whitespace-nowrap text-lightblack">
          {date}
        </span>
        <span
          className={`text-sm whitespace-nowrap py-1 px-2 rounded-sm text-white ${
            status === "completed" ? "bg-green-500" : "bg-yellow-500"
          }`}
        >
          {status}
        </span>
      </div>
    </>
  );
}

export default StartupOrder;
