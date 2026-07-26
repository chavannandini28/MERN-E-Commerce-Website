import { Link } from "react-router-dom";
import {
  FaTimesCircle,
  FaRedoAlt,
  FaShoppingBag,
  FaArrowLeft,
} from "react-icons/fa";

const PaymentFailed = () => {
  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#fff5f5,#f8f9fa)",
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
        {/* Failed Icon */}

        <div className="mb-4">
          <FaTimesCircle
            size={90}
            className="text-danger"
          />
        </div>

        {/* Heading */}

        <h1 className="fw-bold text-danger mb-3">
          Payment Failed
        </h1>

        <p className="text-muted fs-5 mb-4">
          Unfortunately, your payment could not be
          completed.
          <br />
          Please try again or choose another payment
          method.
        </p>

        {/* Status */}

        <div className="bg-light rounded p-4 mb-4">

          <h5 className="mb-3">
            Payment Status
          </h5>

          <p className="mb-2">
            ❌ Transaction Failed
          </p>

          <p className="mb-2">
            🔄 Retry Payment
          </p>

          <p className="mb-0">
            📞 Contact Support if the issue continues
          </p>

        </div>

        {/* Buttons */}

        <div className="d-grid gap-3">

          <Link
            to="/checkout"
            className="btn btn-danger btn-lg"
          >
            <FaRedoAlt className="me-2" />
            Retry Payment
          </Link>

          <Link
            to="/cart"
            className="btn btn-outline-secondary btn-lg"
          >
            <FaArrowLeft className="me-2" />
            Back to Cart
          </Link>

          <Link
            to="/shop"
            className="btn btn-outline-primary btn-lg"
          >
            <FaShoppingBag className="me-2" />
            Continue Shopping
          </Link>

        </div>

        <hr className="my-4" />

        <small className="text-muted">
          If money was deducted from your account,
          it will usually be refunded automatically
          according to your bank's processing time.
        </small>
      </div>
    </div>
  );
};

export default PaymentFailed;