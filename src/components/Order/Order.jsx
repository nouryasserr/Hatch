function Order({ orderInfo, orderNumber }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
  };

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
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-lightblack">
          Order #{orderNumber} - {formatDate(orderInfo.created_at)}
        </p>
        <p className="text-sm font-medium">
          Total: {Number(orderInfo.total_price).toFixed(2)} EGP
        </p>
      </div>
      <div className="space-y-4">
        {orderInfo.order_items.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded">
              <img
                src={getImageUrl(item.product)}
                alt={item.product?.name || "Product Image"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = fallbackImage;
                  e.target.className = "w-full h-full object-contain";
                }}
              />
            </div>
            <div className="flex-1 py-2.5">
              <p className="text-xs mb-1 text-lightblack">
                {item.product?.sub_category?.name}
              </p>
              <h5 className="text-lg mb-2">{item.product?.name}</h5>
              <div className="flex justify-between items-center">
                <p className="text-sm">
                  {Number(item.price).toFixed(2)} EGP x {item.quantity}
                </p>
                <p className="text-sm font-medium">
                  {Number(item.price * item.quantity).toFixed(2)} EGP
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
