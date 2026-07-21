import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaStar,
} from "react-icons/fa";

import ProductQuickView from "./ProductQuickView";

const ProductCard = ({ product }) => {
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <>
      <div
        className="card h-100 border-0 shadow-sm"
        style={{
          borderRadius: "18px",
          overflow: "hidden",
          transition: "0.3s",
        }}
      >
        {/* Product Image */}

        <div
          className="position-relative"
          style={{
            background: "#f8f9fa",
          }}
        >
          <img
            src={
              product.images?.[0]?.url ||
              "https://via.placeholder.com/400x400?text=No+Image"
            }
            alt={product.name}
            className="card-img-top"
            style={{
              height: "260px",
              objectFit: "contain",
              padding: "20px",
            }}
          />

          <span
            className="badge bg-danger position-absolute"
            style={{
              top: "15px",
              left: "15px",
            }}
          >
            New
          </span>

          <button
            className="btn btn-light rounded-circle position-absolute"
            style={{
              top: "15px",
              right: "15px",
              width: "42px",
              height: "42px",
            }}
          >
            <FaHeart className="text-danger" />
          </button>
        </div>

        {/* Card Body */}

        <div className="card-body d-flex flex-column">

          <small className="text-muted">
            {product.category?.name || "Category"}
          </small>

          <h5 className="fw-bold mt-2">
            {product.name}
          </h5>

          <div className="mb-2">

            <FaStar className="text-warning" />
            <FaStar className="text-warning" />
            <FaStar className="text-warning" />
            <FaStar className="text-warning" />
            <FaStar className="text-warning me-2" />

            <small className="text-muted">
              (4.8)
            </small>

          </div>

          <h4 className="text-success fw-bold mb-3">
            ₹{product.price}
          </h4>

          <div className="mt-auto">

            <Link
              to={`/product/${product._id}`}
              className="btn btn-primary w-100 mb-2"
            >
              View Details
            </Link>

            <button
              className="btn btn-outline-dark w-100 mb-2"
              onClick={() => setShowQuickView(true)}
            >
              <FaEye className="me-2" />
              Quick View
            </button>

            <button
              className="btn btn-success w-100"
            >
              <FaShoppingCart className="me-2" />
              Add To Cart
            </button>

          </div>

        </div>
      </div>

      <ProductQuickView
        show={showQuickView}
        product={product}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
};

export default ProductCard;