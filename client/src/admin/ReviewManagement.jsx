import { useEffect, useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaStar,
  FaComments,
} from "react-icons/fa";

import {
  getReviews,
  deleteReview,
} from "../api/reviewApi";

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);

      const { data } = await getReviews();

      const list = data.reviews || data || [];

      setReviews(list);
      setFilteredReviews(list);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value;

    setKeyword(value);

    const result = reviews.filter((review) =>
      review.product?.name
        ?.toLowerCase()
        .includes(value.toLowerCase()) ||
      review.user?.name
        ?.toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredReviews(result);
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await deleteReview(id);

      loadReviews();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading Reviews...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            <FaComments className="me-2 text-primary" />
            Review Management
          </h2>

          <p className="text-muted">
            Manage customer product reviews
          </p>

        </div>

      </div>

      <div className="card shadow border-0">

        <div className="card-body">

          <div className="row mb-4">

            <div className="col-md-5">

              <div className="input-group">

                <span className="input-group-text">
                  <FaSearch />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Review..."
                  value={keyword}
                  onChange={searchHandler}
                />

              </div>

            </div>

          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>

                  <th>User</th>
                  <th>Product</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Date</th>
                  <th width="90">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredReviews.length > 0 ? (

                  filteredReviews.map((review) => (

                    <tr key={review._id}>

                      <td>
                        {review.user?.name || "User"}
                      </td>

                      <td>
                        {review.product?.name || "Product"}
                      </td>

                      <td>

                        <span className="text-warning">

                          <FaStar className="me-1" />

                          {review.rating}

                        </span>

                      </td>

                      <td style={{ maxWidth: "300px" }}>
                        {review.comment}
                      </td>

                      <td>
                        {new Date(
                          review.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td>

                        <button
                          className="btn btn-danger btn-sm"
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
                      No Reviews Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ReviewManagement;