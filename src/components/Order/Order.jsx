function Order({ orderInfo }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
  };

  const displayItem = orderInfo.order_items[0]?.product;

  return (
    <div className="flex items-center h-fit">
      <div>
        <p className="text-xs mb-1 text-lightblack">
          {displayItem?.sub_category?.name}
        </p>
        <h5 className="text-lg mb-2">{displayItem?.name}</h5>
        <h5 className="text-lg mb-2">
          {Number(orderInfo.total_price).toFixed(2)} EGP
        </h5>
        <p className="text-xs text-lightblack">
          delivered {formatDate(orderInfo.created_at)}
        </p>
      </div>
    </div>
  );
}

export default Order;
