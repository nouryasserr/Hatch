function Category({ subcategory, index }) {
  const subcategoryImageUrl = subcategory.image
    ? `http://127.0.0.1:8000/${subcategory.image}`
    : null;
  const categoryImageUrl = subcategory.category?.image
    ? `http://127.0.0.1:8000/${subcategory.category.image}`
    : null;

  const imageUrl =
    subcategoryImageUrl ||
    categoryImageUrl ||
    "https://placehold.co/250x300?text=Category+Image";

  return (
    <>
      <div className="grow overflow-hidden min-w-64">
        <img
          src={imageUrl}
          alt={`${subcategory.name} category`}
          className="object-cover object-center h-64 w-full rounded"
          onError={(e) => {
            e.target.src = "https://placehold.co/250x300?text=Category+Image";
          }}
        />
        <p className="mt-2">{(index + 1).toString().padStart(2, "0")}</p>
        <h6>{subcategory.name}</h6>
      </div>
    </>
  );
}

export default Category;
