import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  FaShoppingBag,
  FaEye,
  FaTimesCircle,
  FaBox,
} from "react-icons/fa";

import {
  fetchMyOrders,
  cancelMyOrder,
} from "../redux/orderSlice";

import Loader from "../components/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();

  const {
    orders,
    loading,
  } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const cancelHandler = (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    dispatch(
      cancelMyOrder({
        id,
        reason: "Cancelled by customer",
      })
    );
  };

  const statusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "success";

      case "Processing":
        return "primary";

      case "Packed":
        return "info";

      case "Shipped":
        return "warning";

      case "Cancelled":
        return "danger";

      default:
        return "secondary";
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container py-5">

      {/* Page Header */}

      <div className="d-flex justify-content-between align-items-center mb-5">

        <div>

          <h2 className="fw-bold">
            <FaShoppingBag className="me-2" />
            My Orders
          </h2>

          <p className="text-muted mb-0">
            View and manage all your orders
          </p>

        </div>

        <span className="badge bg-dark fs-6">
          {orders.length} Orders
        </span>

      </div>

      {/* Orders UI continues in Part 2 */}

            {orders.length === 0 ? (

        <div className="text-center py-5">

          <FaBox
            size={70}
            className="text-secondary mb-3"
          />

          <h3>No Orders Found</h3>

          <p className="text-muted">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/shop"
            className="btn btn-primary mt-3"
          >
            Continue Shopping
          </Link>

        </div>

      ) : (

        <div className="row">

          {orders.map((order) => (

            <div
              className="col-lg-12 mb-4"
              key={order._id}
            >

              <div
                className="card shadow-sm border-0"
                style={{
                  borderRadius: "15px",
                }}
              >

                <div className="card-body">

                  <div className="row align-items-center">

                    {/* Order Info */}

                    <div className="col-lg-3">

                      <h6 className="text-muted">
                        Order ID
                      </h6>

                      <p
                        className="fw-bold text-truncate"
                        title={order._id}
                      >
                        {order._id}
                      </p>

                    </div>

                    {/* Date */}

                    <div className="col-lg-2">

                      <h6 className="text-muted">
                        Date
                      </h6>

                      <p>
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    {/* Total */}

                    <div className="col-lg-2">

                      <h6 className="text-muted">
                        Total
                      </h6>

                      <h5 className="text-success fw-bold">
                        ₹{order.totalPrice}
                      </h5>

                    </div>

                    {/* Status */}

                    <div className="col-lg-2">

                      <h6 className="text-muted">
                        Status
                      </h6>

                      <span
                        className={`badge bg-${statusBadge(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>

                    </div>

                    {/* Payment */}

                    <div className="col-lg-1">

                      <h6 className="text-muted">
                        Payment
                      </h6>

                      {order.isPaid ? (
                        <span className="badge bg-success">
                          Paid
                        </span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      )}

                    </div>

                    {/* Buttons */}

                    <div className="col-lg-2">

                      <div className="d-grid gap-2">

                        <Link
                          to={`/orders/${order._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          <FaEye className="me-2" />
                          View
                        </Link>

                        {order.orderStatus === "Pending" && (

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              cancelHandler(order._id)
                            }
                          >
                            <FaTimesCircle className="me-2" />
                            Cancel
                          </button>

                        )}

                      </div>

                    </div>

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

export default MyOrders;