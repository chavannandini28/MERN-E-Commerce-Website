import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaClipboardList,
} from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#e8fff4,#f7f9fc)",
      }}
    >
      <div
        className="card border-0 shadow-lg text-center p-5"
        style={{
          maxWidth: "650px",
          width: "100%",
          borderRadius: "25px",
        }}
      >
        {/* Success Icon */}

        <div className="mb-4">

          <FaCheckCircle
            size={90}
            className="text-success"
          />

        </div>

        {/* Heading */}

        <h1 className="fw-bold text-success mb-3">
          Payment Successful
        </h1>

        <p className="text-muted fs-5 mb-4">
          Thank you for shopping with us.
          <br />
          Your order has been placed successfully.
        </p>

        {/* Order Information */}

        <div className="bg-light rounded p-4 mb-4">

          <h5 className="mb-3">
            Order Status
          </h5>

          <p className="mb-2">
            ✅ Payment Received
          </p>

          <p className="mb-2">
            📦 Order Confirmed
          </p>

          <p className="mb-0">
            🚚 Processing for Shipment
          </p>

        </div>

        {/* Buttons */}

        <div className="d-grid gap-3">

          <Link
            to="/my-orders"
            className="btn btn-primary btn-lg"
          >
            <FaClipboardList className="me-2" />
            View My Orders
          </Link>

          <Link
            to="/shop"
            className="btn btn-outline-success btn-lg"
          >
            <FaShoppingBag className="me-2" />
            Continue Shopping
          </Link>

        </div>

        <hr className="my-4" />

        <small className="text-muted">
          A confirmation email will be sent to your
          registered email address shortly.
        </small>
      </div>
    </div>
  );
};

export default PaymentSuccess;