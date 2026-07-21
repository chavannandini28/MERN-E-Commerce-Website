import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="container py-5 text-center">

      <div className="card shadow p-5">

        <h1 className="text-danger">
          Payment Failed
        </h1>

        <p>
          Something went wrong while processing your payment.
        </p>

        <Link
          to="/checkout"
          className="btn btn-danger"
        >
          Try Again
        </Link>

      </div>

    </div>
  );
};

export default PaymentFailed;