import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../context/User.context";

export default function WriteReview({ onClose, productId, onReviewAdded }) {
  const { token } = useContext(UserContext);

  const validationSchema = Yup.object({
    rating: Yup.number()
      .required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    comments: Yup.string()
      .required("Review comment is required")
      .min(3, "Comment must be at least 3 characters")
      .max(500, "Comment must be at most 500 characters"),
  });

  const formik = useFormik({
    initialValues: {
      rating: 5,
      comments: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/user/reviews",
          {
            product_id: productId,
            rating: values.rating,
            comments: values.comments,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          toast.success("Review submitted successfully!");
          onReviewAdded && onReviewAdded(response.data.data);
          onClose();
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        toast.error(error.response?.data?.message || "Failed to submit review");
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Write a Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => formik.setFieldValue("rating", star)}
                  className={`text-2xl ${
                    star <= formik.values.rating
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  <i className="fa-solid fa-star"></i>
                </button>
              ))}
            </div>
            {formik.touched.rating && formik.errors.rating && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.rating}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2">Your Review</label>
            <textarea
              name="comments"
              rows="4"
              className="w-full border rounded-lg p-2"
              placeholder="Write your review here..."
              {...formik.getFieldProps("comments")}
            ></textarea>
            {formik.touched.comments && formik.errors.comments && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.comments}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50"
            >
              {formik.isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
