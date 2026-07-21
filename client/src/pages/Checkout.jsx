import { Link } from "react-router-dom";
import {
  FaCreditCard,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from "react-icons/fa";

const Checkout = () => {
  return (
    <div className="container py-5">

      <h2 className="fw-bold mb-4">
        Checkout
      </h2>

      <div className="row">

        {/* Billing */}

        <div className="col-lg-8">

          <div className="card border-0 shadow rounded-4">

            <div className="card-body">

              <h4 className="mb-4">
                Billing Details
              </h4>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Full Name
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaUser />
                    </span>

                    <input
                      className="form-control"
                      placeholder="John Doe"
                    />

                  </div>

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Mobile Number
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaPhone />
                    </span>

                    <input
                      className="form-control"
                      placeholder="+91 XXXXX XXXXX"
                    />

                  </div>

                </div>

                <div className="col-12 mb-3">

                  <label className="form-label">
                    Delivery Address
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaMapMarkerAlt />
                    </span>

                    <textarea
                      rows="4"
                      className="form-control"
                      placeholder="Enter delivery address..."
                    ></textarea>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Order Summary */}

        <div className="col-lg-4">

          <div className="card shadow border-0 rounded-4">

            <div className="card-body">

              <h4 className="fw-bold mb-4">
                Order Summary
              </h4>

              <div className="d-flex justify-content-between mb-3">

                <span>Subtotal</span>

                <span>₹2500</span>

              </div>

              <div className="d-flex justify-content-between mb-3">

                <span>Shipping</span>

                <span className="text-success">
                  FREE
                </span>

              </div>

              <div className="d-flex justify-content-between mb-3">

                <span>Tax</span>

                <span>₹150</span>

              </div>

              <hr />

              <div className="d-flex justify-content-between">

                <h5>Total</h5>

                <h4 className="text-primary">
                  ₹2650
                </h4>

              </div>

              <button className="btn btn-success w-100 mt-4">

                <FaCreditCard className="me-2" />

                Place Order

              </button>

              <Link
                to="/cart"
                className="btn btn-outline-secondary w-100 mt-3"
              >
                Back To Cart
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;