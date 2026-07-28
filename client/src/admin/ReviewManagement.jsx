import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  FaSearch,
  FaTrash,
  FaStar,
} from "react-icons/fa";

import Loader from "../components/Loader";

import {
  getAllReviews,
  deleteReview,
} from "../api/reviewApi";

const ReviewManagement = () => {

  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {

    try {

      setLoading(true);

      const { data } = await getAllReviews();

      setReviews(data.reviews || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load reviews"
      );

    } finally {

      setLoading(false);

    }

  };

  const deleteHandler = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this review?"
    );

    if (!confirmDelete) return;

    try {

      await deleteReview(id);

      toast.success(
        "Review deleted successfully"
      );

      loadReviews();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );

    }

  };

  const filteredReviews = reviews.filter((review) => {

    return (
      review.product?.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      review.user?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  });

  if (loading) {
    return <Loader />;
  }

  return (

    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">

          Review Management

        </h2>

      </div>

      <div className="card border-0 shadow-sm">

        <div className="card-body">

          <div className="row mb-4">

            <div className="col-md-6">

              <div className="input-group">

                <span className="input-group-text">

                  <FaSearch />

                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by product or user..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>

          </div>

                    <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>Product</th>

                  <th>User</th>

                  <th>Rating</th>

                  <th>Review</th>

                  <th>Date</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredReviews.length > 0 ? (

                  filteredReviews.map((review) => (

                    <tr key={review._id}>

                      <td>

                        <div className="fw-bold">

                          {review.product?.title || "Product"}

                        </div>

                      </td>

                      <td>

                        <div>

                          <strong>

                            {review.user?.name || "User"}

                          </strong>

                          <br />

                          <small className="text-muted">

                            {review.user?.email}

                          </small>

                        </div>

                      </td>

                      <td>

                        <div className="text-warning">

                          {[1,2,3,4,5].map((star) => (

                            <FaStar
                              key={star}
                              className={
                                star <= review.rating
                                  ? "text-warning"
                                  : "text-secondary"
                              }
                            />

                          ))}

                        </div>

                        <small>

                          ({review.rating}/5)

                        </small>

                      </td>

                      <td style={{ maxWidth: "300px" }}>

                        <p className="mb-0">

                          {review.comment}

                        </p>

                      </td>

                      <td>

                        {new Date(
                          review.createdAt
                        ).toLocaleDateString()}

                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            deleteHandler(review._id)
                          }
                        >

                          <FaTrash />

                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-5"
                    >

                      <h5 className="text-muted">

                        No Reviews Found

                      </h5>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

                    <hr />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">

            <div>

              <strong>
                Total Reviews :
              </strong>

              <span className="badge bg-primary ms-2">

                {filteredReviews.length}

              </span>

            </div>

            <div className="mt-3 mt-md-0 d-flex gap-2">

              <button
                className="btn btn-outline-secondary"
                onClick={loadReviews}
              >

                Refresh List

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default ReviewManagement;