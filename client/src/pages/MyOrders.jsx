import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaEye,
} from "react-icons/fa";

const MyOrders = () => {
  // Replace this with your API/Redux data later
  const orders = [
    {
      _id: "ORD1001",
      date: "20 July 2026",
      total: 2499,
      payment: "Paid",
      status: "Delivered",
    },
    {
      _id: "ORD1002",
      date: "18 July 2026",
      total: 1599,
      payment: "Paid",
      status: "Shipped",
    },
    {
      _id: "ORD1003",
      date: "15 July 2026",
      total: 799,
      payment: "Pending",
      status: "Processing",
    },
  ];

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          📦 My Orders
        </h2>

        <span className="badge bg-primary fs-6">
          {orders.length} Orders
        </span>

      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5">

          <FaBoxOpen
            size={80}
            className="text-secondary mb-3"
          />

          <h3>No Orders Found</h3>

          <p className="text-muted">
            Start shopping to place your first order.
          </p>

          <Link
            to="/shop"
            className="btn btn-primary"
          >
            Shop Now
          </Link>

        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card border-0 shadow rounded-4 mb-4"
          >
            <div className="card-body">

              <div className="row align-items-center">

                <div className="col-lg-2 text-center">

                  <FaBoxOpen
                    size={55}
                    className="text-primary"
                  />

                </div>

                <div className="col-lg-3">

                  <h5 className="fw-bold">
                    #{order._id}
                  </h5>

                  <small className="text-muted">
                    {order.date}
                  </small>

                </div>

                <div className="col-lg-2">

                  <h5 className="text-success">
                    ₹{order.total}
                  </h5>

                </div>

                <div className="col-lg-2">

                  <span
                    className={`badge ${
                      order.payment === "Paid"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {order.payment}
                  </span>

                </div>

                <div className="col-lg-2">

                  <span
                    className={`badge ${
                      order.status === "Delivered"
                        ? "bg-success"
                        : order.status === "Shipped"
                        ? "bg-info"
                        : "bg-secondary"
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

                <div className="col-lg-1 text-end">

                  <Link
                    to={`/orders/${order._id}`}
                    className="btn btn-outline-primary"
                  >
                    <FaEye />
                  </Link>

                </div>

              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <FaTruck className="text-primary me-2" />

                  <span className="text-muted">
                    Estimated Delivery: 3-5 Days
                  </span>

                </div>

                {order.status === "Delivered" && (
                  <div>

                    <FaCheckCircle className="text-success me-2" />

                    Delivered Successfully

                  </div>
                )}

              </div>

            </div>

          </div>
        ))
      )}

    </div>
  );
};

export default MyOrders;