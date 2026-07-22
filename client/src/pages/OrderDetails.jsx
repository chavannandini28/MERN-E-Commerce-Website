import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../redux/orderSlice";
import {
  FaBox,
  FaTruck,
  FaMapMarkerAlt,
  FaCreditCard,
  FaArrowLeft,
} from "react-icons/fa";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, loading } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  if (loading || !order) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading Order...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <Link
        to="/my-orders"
        className="btn btn-outline-primary mb-4"
      >
        <FaArrowLeft className="me-2" />
        Back to Orders
      </Link>

      <div className="card shadow border-0">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h3>
              <FaBox className="me-2 text-primary" />
              Order Details
            </h3>

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

          <hr />

          <div className="row">

            <div className="col-md-6">

              <h5>
                <FaMapMarkerAlt className="me-2 text-danger" />
                Shipping Information
              </h5>

              <p>
                <strong>Name:</strong>{" "}
                {order.shippingInfo?.fullName}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {order.shippingInfo?.phone}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {order.shippingInfo?.address}
              </p>

              <p>
                {order.shippingInfo?.city},{" "}
                {order.shippingInfo?.state} -
                {order.shippingInfo?.pincode}
              </p>

            </div>

            <div className="col-md-6">

              <h5>
                <FaCreditCard className="me-2 text-success" />
                Payment
              </h5>

              <p>
                <strong>Total:</strong> ₹
                {order.totalPrice}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {order.paymentStatus ||
                  "Pending"}
              </p>

              <p>
                <strong>Order ID:</strong>{" "}
                {order._id}
              </p>

            </div>

          </div>

          <hr />

          <h4 className="mb-3">
            <FaTruck className="me-2 text-primary" />
            Ordered Products
          </h4>

          {order.orderItems?.map((item) => (

            <div
              key={item._id}
              className="card mb-3 border-0 shadow-sm"
            >

              <div className="card-body">

                <div className="row align-items-center">

                  <div className="col-md-2">

                    <img
                      src={
                        item.product?.images?.[0]?.url
                      }
                      alt={item.product?.name}
                      className="img-fluid rounded"
                    />

                  </div>

                  <div className="col-md-6">

                    <h5>
                      {item.product?.name}
                    </h5>

                    <p className="text-muted">
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <div className="col-md-4 text-end">

                    <h5 className="text-success">
                      ₹{item.price}
                    </h5>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default OrderDetails;