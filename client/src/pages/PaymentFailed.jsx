import { Link } from "react-router-dom";
import {
  FaTimesCircle,
  FaRedo,
  FaShoppingCart,
  FaHome,
} from "react-icons/fa";

const PaymentFailed = () => {
  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-7">

          <div className="card border-0 shadow-lg rounded-4">

            <div className="card-body text-center p-5">

              {/* Failed Icon */}

              <div
                className="mx-auto mb-4 d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  width: "120px",
                  height: "120px",
                  background: "#fee2e2",
                }}
              >
                <FaTimesCircle
                  size={70}
                  className="text-danger"
                />
              </div>

              <h1 className="fw-bold text-danger">
                Payment Failed
              </h1>

              <p className="text-muted fs-5 mt-3">
                We couldn't process your payment.
                <br />
                Please verify your payment details and try again.
              </p>

              <div className="alert alert-danger mt-4">

                <strong>Reason :</strong>

                Payment could not be completed.

                <br />

                Please try again or choose another payment method.

              </div>

              <div className="row mt-5">

                <div className="col-md-4 mb-3">

                  <Link
                    to="/checkout"
                    className="btn btn-danger w-100 py-3"
                  >

                    <FaRedo className="me-2" />

                    Retry

                  </Link>

                </div>

                <div className="col-md-4 mb-3">

                  <Link
                    to="/cart"
                    className="btn btn-warning w-100 py-3"
                  >

                    <FaShoppingCart className="me-2" />

                    Cart

                  </Link>

                </div>

                <div className="col-md-4 mb-3">

                  <Link
                    to="/"
                    className="btn btn-outline-primary w-100 py-3"
                  >

                    <FaHome className="me-2" />

                    Home

                  </Link>

                </div>

              </div>

              <hr className="my-4" />

              <p className="text-muted mb-0">

                Need help?

                <Link
                  to="/contact"
                  className="ms-2 text-decoration-none"
                >
                  Contact Support
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PaymentFailed;