import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaTruck,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBoxOpen,
} from "react-icons/fa";

const OrderDetails = () => {

  // Replace with your backend data later
  const order = {
    _id: "ORD1001",
    status: "Delivered",
    payment: "Paid",
    total: 54999,
    date: "20 July 2026",
    address:
      "Hinjewadi Phase-1, Pune, Maharashtra",
    items: [
      {
        _id: 1,
        name: "Apple iPhone 16",
        qty: 1,
        price: 49999,
        image: "https://via.placeholder.com/100",
      },
      {
        _id: 2,
        name: "Apple Charger",
        qty: 1,
        price: 5000,
        image: "https://via.placeholder.com/100",
      },
    ],
  };

  return (
    <div className="container py-5">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">

            Order Details

          </h2>

          <p className="text-muted">

            Order ID :
            <strong> #{order._id}</strong>

          </p>

        </div>

        <Link
          to="/my-orders"
          className="btn btn-outline-primary"
        >
          Back
        </Link>

      </div>

      {/* Status */}

      <div className="row g-4 mb-4">

        <div className="col-md-4">

          <div className="card shadow border-0">

            <div className="card-body text-center">

              <FaTruck
                size={45}
                className="text-primary mb-3"
              />

              <h5>Order Status</h5>

              <span className="badge bg-success">

                {order.status}

              </span>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow border-0">

            <div className="card-body text-center">

              <FaCreditCard
                size={45}
                className="text-success mb-3"
              />

              <h5>Payment</h5>

              <span className="badge bg-success">

                {order.payment}

              </span>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow border-0">

            <div className="card-body text-center">

              <FaMapMarkerAlt
                size={45}
                className="text-danger mb-3"
              />

              <h5>Delivery Address</h5>

              <small>

                {order.address}

              </small>

            </div>

          </div>

        </div>

      </div>

      {/* Products */}

      <div className="card border-0 shadow">

        <div className="card-header bg-white">

          <h4 className="fw-bold mb-0">

            Ordered Products

          </h4>

        </div>

        <div className="card-body">

          {order.items.map((item) => (

            <div
              key={item._id}
              className="row align-items-center mb-4"
            >

              <div className="col-md-2">

                <img
                  src={item.image}
                  alt={item.name}
                  className="img-fluid rounded"
                />

              </div>

              <div className="col-md-5">

                <h5>{item.name}</h5>

              </div>

              <div className="col-md-2">

                Qty : {item.qty}

              </div>

              <div className="col-md-3 text-end">

                <strong>

                  ₹{item.price}

                </strong>

              </div>

            </div>

          ))}

          <hr />

          <div className="text-end">

            <h3 className="text-success">

              Total : ₹{order.total}

            </h3>

          </div>

        </div>

      </div>

      {/* Timeline */}

      <div className="card border-0 shadow mt-4">

        <div className="card-header bg-white">

          <h4 className="fw-bold">

            Order Timeline

          </h4>

        </div>

        <div className="card-body">

          <div className="mb-3">

            <FaCheckCircle className="text-success me-2" />

            Order Placed

          </div>

          <div className="mb-3">

            <FaCheckCircle className="text-success me-2" />

            Payment Confirmed

          </div>

          <div className="mb-3">

            <FaTruck className="text-primary me-2" />

            Shipped

          </div>

          <div>

            <FaBoxOpen className="text-success me-2" />

            Delivered Successfully

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderDetails;