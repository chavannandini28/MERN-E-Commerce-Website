import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">

        <div className="d-flex justify-content-between">

          <div>

            <h5>Order #{order._id}</h5>

            <p className="text-muted mb-1">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <h6 className="text-success">
              ₹ {order.totalAmount}
            </h6>

          </div>

          <div>

            <span
              className={`badge ${
                order.orderStatus === "Delivered"
                  ? "bg-success"
                  : order.orderStatus === "Cancelled"
                  ? "bg-danger"
                  : "bg-warning text-dark"
              }`}
            >
              {order.orderStatus}
            </span>

          </div>

        </div>

        <hr />

        <Link
          to={`/orders/${order._id}`}
          className="btn btn-primary"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default OrderCard;