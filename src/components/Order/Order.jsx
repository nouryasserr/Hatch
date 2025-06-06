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
    <div className="flex items-start gap-4">
      <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded">
        <img
          src={
            displayItem?.images?.[0] ||
            "https://placehold.co/300x350?text=Product+Image"
          }
          alt={displayItem?.name || "Product Image"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/300x350?text=Product+Image";
          }}
        />
      </div>
      <div className="flex-1">
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
