import Category from "../../../components/Category/Category";
import { useState, useEffect } from "react";
import axios from "axios";
function Categories() {
  // fetch-categories
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    try {
      const options = {
        url: "http://127.0.0.1:8000/api/general/subcategory",
        method: "GET",
      };
      const response = await axios.request(options);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  // end-fetch-categories
  return (
    <>
      <div className="px-6 lg:px-12 my-2 sm:my-6">
        <h3 className="text-2xl md:text-4xl mb-2">Categories</h3>
        <p>{categories.length} categories</p>
        <div className="flex flex-wrap gap-6 mt-8 text-black">
          {categories.map((subcategory, index) => (
            <Category
              key={subcategory.id}
              subcategory={subcategory}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
