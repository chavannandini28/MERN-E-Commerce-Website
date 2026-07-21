import {
  FaHeart,
  FaShoppingCart,
  FaTimes,
  FaStar,
} from "react-icons/fa";

const ProductQuickView = ({
  show,
  product,
  onClose,
}) => {
  if (!show || !product) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        background: "rgba(0,0,0,.6)",
      }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">

        <div className="modal-content border-0 rounded-4">

          <div className="modal-header border-0">

            <h4 className="fw-bold">
              Quick View
            </h4>

            <button
              className="btn btn-light rounded-circle"
              onClick={onClose}
            >
              <FaTimes />
            </button>

          </div>

          <div className="modal-body">

            <div className="row">

              <div className="col-lg-6">

                <img
                  src={
                    product.images?.[0]?.url ||
                    "https://via.placeholder.com/600"
                  }
                  className="img-fluid rounded shadow"
                  style={{
                    height: "450px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  alt={product.name}
                />

              </div>

              <div className="col-lg-6">

                <span className="badge bg-primary mb-3">
                  {product.category?.name || "Category"}
                </span>

                <h2 className="fw-bold">
                  {product.name}
                </h2>

                <div className="mb-3">

                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning me-2" />

                  <span className="text-muted">
                    4.8 Rating
                  </span>

                </div>

                <h2 className="text-success fw-bold">
                  ₹{product.price}
                </h2>

                <p className="text-secondary mt-3">
                  {product.description}
                </p>

                <div className="mb-3">

                  <strong>Brand :</strong>{" "}
                  {product.brand?.name || "N/A"}

                </div>

                <div className="mb-4">

                  <strong>Status :</strong>

                  <span className="badge bg-success ms-2">
                    In Stock
                  </span>

                </div>

                <div className="d-flex gap-3">

                  <button className="btn btn-primary btn-lg">

                    <FaShoppingCart className="me-2" />

                    Add To Cart

                  </button>

                  <button className="btn btn-outline-danger btn-lg">

                    <FaHeart className="me-2" />

                    Wishlist

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductQuickView;