function Order({ orderInfo }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
  };

  const displayItem = orderInfo.order_items[0]?.product;
  const fallbackImage = "https://placehold.co/300x350?text=Product+Image";

  const getImageUrl = (product) => {
    if (
      !product?.images ||
      !Array.isArray(product.images) ||
      product.images.length === 0
    ) {
      return fallbackImage;
    }

    const mainImage =
      product.images.find((img) => img.is_main)?.url || product.images[0].url;

    if (!mainImage) {
      return fallbackImage;
    }
    return mainImage.startsWith("http")
      ? mainImage
      : `http://127.0.0.1:8000/${mainImage}`;
  };

  return (
    <div className="flex items-start gap-4">
      <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded">
        <img
          src={getImageUrl(displayItem)}
          alt={displayItem?.name || "Product Image"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = fallbackImage;
            e.target.className = "w-full h-full object-contain";
          }}
        />
      </div>
      <div className="flex-1 py-2.5">
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
