import { useLocation, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const { state } = useLocation();

  return (
    <div className="container py-5 text-center">

      <div className="card shadow p-5">

        <h1 className="text-success">
          Payment Successful
        </h1>

        <hr />

        <h5>
          Your order has been placed successfully.
        </h5>

        {state?.order && (
          <>
            <p className="mt-3">
              Order ID: {state.order._id}
            </p>

            <p>
              Amount: ₹{state.order.totalAmount}
            </p>
          </>
        )}

        <Link
          to="/my-orders"
          className="btn btn-primary mt-3"
        >
          View My Orders
        </Link>

      </div>

    </div>
  );
};

export default PaymentSuccess;