import { useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaEye,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";

const ReviewManagement = () => {
  const [search, setSearch] = useState("");

  // Replace this with your backend API data
  const reviews = [
    {
      _id: "1",
      user: "John Doe",
      product: "Apple iPhone 16",
      rating: 5,
      review: "Amazing phone with excellent camera quality.",
      date: "20 Jul 2026",
    },
    {
      _id: "2",
      user: "Priya Sharma",
      product: "Samsung Galaxy S25",
      rating: 4,
      review: "Very good performance and battery backup.",
      date: "19 Jul 2026",
    },
    {
      _id: "3",
      user: "Rahul Patil",
      product: "Sony Headphones",
      rating: 3,
      review: "Sound quality is good but little expensive.",
      date: "18 Jul 2026",
    },
  ];

  const filteredReviews = reviews.filter(
    (item) =>
      item.user.toLowerCase().includes(search.toLowerCase()) ||
      item.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            Review Management
          </h2>

          <p className="text-muted">
            Manage customer product reviews
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="card border-0 shadow mb-4">

        <div className="card-body">

          <div className="input-group">

            <span className="input-group-text">

              <FaSearch />

            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search User or Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

      </div>

      {/* Reviews Table */}

      <div className="card border-0 shadow rounded-4">

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-dark">

              <tr>

                <th>User</th>

                <th>Product</th>

                <th>Rating</th>

                <th>Review</th>

                <th>Date</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredReviews.map((review) => (

                <tr key={review._id}>

                  <td>

                    <div className="d-flex align-items-center">

                      <FaUserCircle
                        className="text-primary me-2"
                        size={35}
                      />

                      <strong>
                        {review.user}
                      </strong>

                    </div>

                  </td>

                  <td>{review.product}</td>

                  <td>

                    {[...Array(review.rating)].map((_, index) => (

                      <FaStar
                        key={index}
                        className="text-warning"
                      />

                    ))}

                  </td>

                  <td
                    style={{
                      maxWidth: "350px",
                    }}
                  >
                    {review.review}
                  </td>

                  <td>{review.date}</td>

                  <td>

                    <div className="btn-group">

                      <button
                        className="btn btn-primary btn-sm"
                        title="View Review"
                      >

                        <FaEye />

                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        title="Delete Review"
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ReviewManagement;