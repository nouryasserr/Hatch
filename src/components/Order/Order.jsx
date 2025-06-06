function Order({ orderInfo }) {
  const { id, total_price, created_at } = orderInfo;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
  };
  return (
    <>
      <div className="flex items-center h-fit">
        <div className="p-4">
          <p className="text-xs mb-1 text-zinc-400">Order #{id}</p>
          <h5 className="text-lg mb-2">Order #{id}</h5>
          <h5 className="text-lg mb-2">{total_price} EGP</h5>
          <p className="text-xs text-zinc-400">
            delivered {formatDate(created_at)}
          </p>
        </div>
      </div>
    </>
  );
}

export default Order;
