import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaStar,
  FaEdit,
  FaTrash,
  FaPaperPlane,
} from "react-icons/fa";

import {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../api/reviewApi";

const Review = () => {
  const { id: productId } = useParams();

  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    comment: "",
  });

  useEffect(() => {
    if (productId) {
      loadReviews();
    }
  }, [productId]);

  const loadReviews = async () => {
    try {
      setLoading(true);

      const { data } = await getProductReviews(productId);

      setReviews(data?.reviews || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!rating) {
      return toast.error("Please select rating");
    }

    if (!formData.comment.trim()) {
      return toast.error("Comment is required");
    }

    try {
      let response;

      if (editId) {
        response = await updateReview(editId, {
          rating,
          comment: formData.comment,
        });
      } else {
        response = await createReview({
          productId,
          rating,
          comment: formData.comment,
        });
      }

      toast.success(
        response?.data?.message || "Success"
      );

      setRating(0);
      setEditId(null);
      setFormData({
        comment: "",
      });

      loadReviews();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const editHandler = (review) => {
    setEditId(review._id);

    setRating(review.rating);

    setFormData({
      comment: review.comment,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      const { data } = await deleteReview(id);

      toast.success(data?.message || "Deleted");

      loadReviews();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, item) => sum + item.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="card shadow border-0 rounded-4 mb-5">
            <div className="card-body p-4">

              <h2 className="fw-bold mb-2">
                Product Reviews
              </h2>

              <h5 className="text-warning mb-4">
                ⭐ {averageRating} / 5
              </h5>

              <form onSubmit={submitHandler}>

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Rating
                  </label>

                  <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={28}
                        style={{
                          cursor: "pointer",
                          marginRight: 8,
                        }}
                        color={
                          star <= rating
                            ? "#ffc107"
                            : "#ced4da"
                        }
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Your Review
                  </label>

                  <textarea
                    rows={4}
                    className="form-control"
                    name="comment"
                    placeholder="Write your review..."
                    value={formData.comment}
                    onChange={changeHandler}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <FaPaperPlane className="me-2" />
                  {editId
                    ? "Update Review"
                    : "Submit Review"}
                </button>

              </form>

            </div>
          </div>

          <h3 className="fw-bold mb-4">
            Customer Reviews
          </h3>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="alert alert-info">
              No reviews available.
            </div>
          ) : (
            reviews.map((review) => (
              <div
                className="card shadow-sm mb-3"
                key={review._id}
              >
                <div className="card-body">

                  <div className="d-flex justify-content-between">

                    <div>

                      <h5 className="mb-1">
                        {review.user?.name ||
                          review.name ||
                          "Customer"}
                      </h5>

                      <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            color={
                              star <= review.rating
                                ? "#ffc107"
                                : "#ced4da"
                            }
                          />
                        ))}
                      </div>

                    </div>

                    <small className="text-muted">
                      {review.createdAt
                        ? new Date(
                            review.createdAt
                          ).toLocaleDateString()
                        : ""}
                    </small>

                  </div>

                  <p className="mt-3">
                    {review.comment}
                  </p>

                  <div className="d-flex gap-2">

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        editHandler(review)
                      }
                    >
                      <FaEdit className="me-1" />
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteHandler(review._id)
                      }
                    >
                      <FaTrash className="me-1" />
                      Delete
                    </button>

                  </div>

                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default Review;