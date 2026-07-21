import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaBoxOpen,
} from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-7">

          <div className="card border-0 shadow-lg rounded-4">

            <div className="card-body text-center p-5">

              {/* Success Icon */}

              <div
                className="mx-auto mb-4 d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  width: "120px",
                  height: "120px",
                  background: "#d1fae5",
                }}
              >
                <FaCheckCircle
                  size={70}
                  className="text-success"
                />
              </div>

              <h1 className="fw-bold text-success">
                Payment Successful!
              </h1>

              <p className="text-muted fs-5 mt-3">
                Thank you for your purchase.
                <br />
                Your order has been placed successfully.
              </p>

              <div className="alert alert-success mt-4">

                <strong>Order ID :</strong> #ORD1001

                <br />

                Estimated Delivery :
                <strong> 3 - 5 Business Days</strong>

              </div>

              <div className="row mt-5">

                <div className="col-md-6 mb-3">

                  <Link
                    to="/my-orders"
                    className="btn btn-success w-100 py-3"
                  >

                    <FaBoxOpen className="me-2" />

                    View My Orders

                  </Link>

                </div>

                <div className="col-md-6 mb-3">

                  <Link
                    to="/shop"
                    className="btn btn-outline-primary w-100 py-3"
                  >

                    <FaShoppingBag className="me-2" />

                    Continue Shopping

                  </Link>

                </div>

              </div>

              <hr className="my-4" />

              <p className="text-muted mb-0">

                Thank you for shopping with
                <strong> MERN SHOP</strong> ❤️

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PaymentSuccess;