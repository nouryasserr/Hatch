function Category({ subcategory }) {
  return (
    <>
      <div className="grow overflow-hidden">
        <img
          src={
            subcategory.image?.[0] ||
            "https://placehold.co/250x300?text=Category+Image"
          }
          alt="category"
          className="object-cover object-center h-64 w-full rounded"
          onError={(e) => {
            e.target.src = "https://placehold.co/250x300?text=Category+Image";
          }}
        />
        <p className="mt-2">
          {subcategory.id < 10 ? `0${subcategory.id}` : subcategory.id}
        </p>
        <h6>{subcategory.name}</h6>
      </div>
    </>
  );
}

export default Category;
