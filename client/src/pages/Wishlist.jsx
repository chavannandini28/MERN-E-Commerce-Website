import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const Wishlist = () => {
  const wishlistItems =
    useSelector((state) => state.wishlist?.wishlistItems) || [];

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          ❤️ My Wishlist
        </h2>

        <span className="badge bg-primary fs-6">
          {wishlistItems.length} Items
        </span>

      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-5">

          <FaHeart
            size={90}
            className="text-danger mb-4"
          />

          <h3>Your Wishlist is Empty</h3>

          <p className="text-muted">
            Save your favourite products here.
          </p>

          <Link
            to="/shop"
            className="btn btn-primary px-4 mt-3"
          >
            Continue Shopping
          </Link>

        </div>
      ) : (
        <div className="row g-4">

          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="col-lg-3 col-md-6"
            >
              <div className="card border-0 shadow h-100 rounded-4">

                <div className="position-relative">

                  <img
                    src={
                      item.images?.[0]?.url ||
                      item.image
                    }
                    alt={item.name}
                    className="card-img-top"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />

                  <span className="badge bg-danger position-absolute top-0 end-0 m-3">
                    Wishlist
                  </span>

                </div>

                <div className="card-body">

                  <h5 className="fw-bold">
                    {item.name}
                  </h5>

                  <p className="text-muted small">
                    {item.brand?.name ||
                      item.brand}
                  </p>

                  <h4 className="text-success">
                    ₹{item.price}
                  </h4>

                </div>

                <div className="card-footer bg-white border-0">

                  <div className="d-grid gap-2">

                    <button className="btn btn-primary">

                      <FaShoppingCart className="me-2" />

                      Add To Cart

                    </button>

                    <button className="btn btn-outline-danger">

                      <FaTrashAlt className="me-2" />

                      Remove

                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Wishlist;