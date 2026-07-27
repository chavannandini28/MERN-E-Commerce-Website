import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCreditCard,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

import {
  fetchOrderDetails,
} from "../redux/orderSlice";

import Loader from "../components/Loader";

const OrderDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    order,
    loading,
  } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success";

      case "Shipped":
        return "primary";

      case "Packed":
        return "info";

      case "Processing":
        return "warning";

      case "Cancelled":
        return "danger";

      default:
        return "secondary";
    }
  };

  if (loading || !order) {
    return <Loader />;
  }

  return (
    <div className="container py-5">

      {/* Back Button */}

      <div className="mb-4">

        <Link
          to="/my-orders"
          className="btn btn-outline-secondary"
        >
          <FaArrowLeft className="me-2" />
          Back to Orders
        </Link>

      </div>

      {/* Page Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            Order Details
          </h2>

          <p className="text-muted mb-0">
            Order ID : {order._id}
          </p>

        </div>

        <span
          className={`badge bg-${getStatusColor(
            order.orderStatus
          )} fs-6`}
        >
          {order.orderStatus}
        </span>

      </div>

      {/* Content continues in Part 2 */}

            <div className="row g-4">

        {/* Shipping Information */}

        <div className="col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white">

              <h5 className="mb-0">
                <FaMapMarkerAlt className="text-danger me-2" />
                Shipping Address
              </h5>

            </div>

            <div className="card-body">

              <h6 className="fw-bold">
                {order.shippingAddress?.fullName}
              </h6>

              <p className="mb-1">
                {order.shippingAddress?.address}
              </p>

              <p className="mb-1">
                {order.shippingAddress?.city},
                {" "}
                {order.shippingAddress?.state}
              </p>

              <p className="mb-1">
                {order.shippingAddress?.country}
              </p>

              <p className="mb-1">
                PIN :
                {" "}
                {order.shippingAddress?.pincode}
              </p>

              <p className="mb-0">
                Phone :
                {" "}
                {order.shippingAddress?.phone}
              </p>

            </div>

          </div>

        </div>

        {/* Payment Information */}

        <div className="col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white">

              <h5 className="mb-0">
                <FaCreditCard className="text-primary me-2" />
                Payment Details
              </h5>

            </div>

            <div className="card-body">

              <div className="mb-3">

                <strong>Payment Method</strong>

                <div className="text-muted">
                  {order.paymentMethod || "Online"}
                </div>

              </div>

              <div className="mb-3">

                <strong>Payment Status</strong>

                <div>

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

              </div>

              <div>

                <strong>Paid At</strong>

                <div className="text-muted">

                  {order.paidAt
                    ? new Date(
                        order.paidAt
                      ).toLocaleString()
                    : "Not Paid"}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Order Summary */}

      <div className="row mt-4">

        <div className="col-lg-12">

          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white">

              <h5 className="mb-0">
                <FaTruck className="text-success me-2" />
                Order Summary
              </h5>

            </div>

            <div className="card-body">

              <div className="row text-center">

                <div className="col-md-3">

                  <h6 className="text-muted">
                    Items
                  </h6>

                  <h4>
                    {order.orderItems?.length || 0}
                  </h4>

                </div>

                <div className="col-md-3">

                  <h6 className="text-muted">
                    Total
                  </h6>

                  <h4 className="text-success">
                    ₹{order.totalPrice}
                  </h4>

                </div>

                <div className="col-md-3">

                  <h6 className="text-muted">
                    Ordered On
                  </h6>

                  <h6>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </h6>

                </div>

                <div className="col-md-3">

                  <h6 className="text-muted">
                    Delivery Status
                  </h6>

                  <span
                    className={`badge bg-${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Products continue in Part 3 */}

            {/* Ordered Products */}

      <div className="card border-0 shadow-sm mt-4">

        <div className="card-header bg-white">

          <h5 className="mb-0">
            Ordered Products
          </h5>

        </div>

        <div className="card-body">

          {order.orderItems?.map((item) => (

            <div
              className="row align-items-center border-bottom py-3"
              key={item._id}
            >

              {/* Image */}

              <div className="col-md-2 text-center">

                <img
                  src={
                    item.product?.thumbnail?.url ||
                    item.product?.images?.[0]?.url ||
                    "https://via.placeholder.com/120"
                  }
                  alt={item.name}
                  className="img-fluid rounded"
                  style={{
                    height: "90px",
                    objectFit: "contain",
                  }}
                />

              </div>

              {/* Product */}

              <div className="col-md-4">

                <h6 className="fw-bold mb-1">
                  {item.name}
                </h6>

                <small className="text-muted">

                  Brand :
                  {" "}
                  {item.product?.brand?.name || "-"}

                </small>

              </div>

              {/* Quantity */}

              <div className="col-md-2 text-center">

                <strong>
                  Qty
                </strong>

                <div>
                  {item.quantity}
                </div>

              </div>

              {/* Price */}

              <div className="col-md-2 text-center">

                <strong>
                  Price
                </strong>

                <div>
                  ₹{item.price}
                </div>

              </div>

              {/* Total */}

              <div className="col-md-2 text-end">

                <h6 className="text-success fw-bold">

                  ₹
                  {item.price * item.quantity}

                </h6>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Invoice */}

      <div className="row mt-4">

        <div className="col-lg-5 ms-auto">

          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white">

              <h5 className="mb-0">
                Invoice Summary
              </h5>

            </div>

            <div className="card-body">

              <div className="d-flex justify-content-between mb-2">

                <span>
                  Items Price
                </span>

                <strong>
                  ₹{order.itemsPrice}
                </strong>

              </div>

              <div className="d-flex justify-content-between mb-2">

                <span>
                  Shipping
                </span>

                <strong>
                  ₹{order.shippingPrice}
                </strong>

              </div>

              <div className="d-flex justify-content-between mb-2">

                <span>
                  Tax
                </span>

                <strong>
                  ₹{order.taxPrice}
                </strong>

              </div>

              <hr />

              <div className="d-flex justify-content-between">

                <h5>
                  Grand Total
                </h5>

                <h4 className="text-success">

                  ₹{order.totalPrice}

                </h4>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Order Timeline */}

      <div className="card border-0 shadow-sm mt-4">

        <div className="card-header bg-white">

          <h5 className="mb-0">
            Order Timeline
          </h5>

        </div>

        <div className="card-body">

          <div className="d-flex justify-content-between flex-wrap">

            <div className="text-center">

              <FaCheckCircle
                size={35}
                className="text-success mb-2"
              />

              <h6>
                Ordered
              </h6>

            </div>

            <div className="text-center">

              <FaClock
                size={35}
                className={
                  order.orderStatus === "Processing" ||
                  order.orderStatus === "Packed" ||
                  order.orderStatus === "Shipped" ||
                  order.orderStatus === "Delivered"
                    ? "text-success"
                    : "text-secondary"
                }
              />

              <h6 className="mt-2">
                Processing
              </h6>

            </div>

            <div className="text-center">

              <FaTruck
                size={35}
                className={
                  order.orderStatus === "Shipped" ||
                  order.orderStatus === "Delivered"
                    ? "text-success"
                    : "text-secondary"
                }
              />

              <h6 className="mt-2">
                Shipped
              </h6>

            </div>

            <div className="text-center">

              {order.orderStatus === "Delivered" ? (

                <FaCheckCircle
                  size={35}
                  className="text-success"
                />

              ) : order.orderStatus === "Cancelled" ? (

                <FaTimesCircle
                  size={35}
                  className="text-danger"
                />

              ) : (

                <FaClock
                  size={35}
                  className="text-secondary"
                />

              )}

              <h6 className="mt-2">
                {order.orderStatus}
              </h6>

            </div>

          </div>

        </div>

      </div>

      {/* Action Buttons continue in Part 4 */}

            {/* Action Buttons */}

      <div className="d-flex flex-wrap justify-content-between align-items-center mt-5 gap-3">

        <Link
          to="/shop"
          className="btn btn-outline-primary"
        >
          Continue Shopping
        </Link>

        <div className="d-flex gap-2">

          {order.orderStatus !== "Delivered" &&
            order.orderStatus !== "Cancelled" && (

              <button
                className="btn btn-danger"
                onClick={() => {
                  alert(
                    "Cancel Order feature is connected from My Orders page."
                  );
                }}
              >
                <FaTimesCircle className="me-2" />
                Cancel Order
              </button>

            )}

          <button
            className="btn btn-success"
            onClick={() =>
              window.print()
            }
          >
            Print Invoice
          </button>

        </div>

      </div>

    </div>
  );
};

export default OrderDetails;