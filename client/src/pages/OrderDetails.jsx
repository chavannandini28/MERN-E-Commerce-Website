import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import { getOrderById, cancelOrder } from "../api/orderApi";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadOrder = async () => {
    try {
      setLoading(true);

      const { data } = await getOrderById(id);

      setOrder(data.order);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  const handleCancel = async () => {
    try {
      await cancelOrder(id);

      toast.success("Order cancelled successfully");

      loadOrder();
    } catch (error) {
      console.error(error);
      toast.error("Unable to cancel order");
    }
  };

  if (loading) return <Loader />;

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h3>Order not found</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow border-0 rounded-4">
        <div className="card-body p-4">
          <h2 className="mb-4">Order Details</h2>

          <div className="row mb-4">
            <div className="col-md-6">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    order.orderStatus === "Delivered"
                      ? "bg-success"
                      : order.orderStatus === "Cancelled"
                      ? "bg-danger"
                      : order.orderStatus === "Shipped"
                      ? "bg-primary"
                      : "bg-warning text-dark"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </p>

              <p>
                <strong>Total Price:</strong>{" "}
                <span className="text-success fw-bold">
                  ₹ {order.totalPrice}
                </span>
              </p>
            </div>

            <div className="col-md-6">
              {order.shippingAddress && (
                <>
                  <h5>Shipping Address</h5>

                  <p className="mb-1">
                    {order.shippingAddress.address}
                  </p>

                  <p className="mb-1">
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state}
                  </p>

                  <p>{order.shippingAddress.pincode}</p>
                </>
              )}
            </div>
          </div>

          <hr />

          <h4 className="mb-3">Ordered Products</h4>

          {order.products?.length > 0 ? (
            order.products.map((item) => (
              <div
                key={item._id}
                className="d-flex justify-content-between align-items-center border rounded p-3 mb-3"
              >
                <div className="d-flex align-items-center">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      width="70"
                      height="70"
                      className="rounded me-3"
                      style={{ objectFit: "cover" }}
                    />
                  )}

                  <div>
                    <h6 className="mb-1">{item.name}</h6>

                    <small className="text-muted">
                      Quantity : {item.quantity}
                    </small>
                  </div>
                </div>

                <h6 className="text-success">
                  ₹ {item.price}
                </h6>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}

          {order.orderStatus === "Pending" && (
            <button
              className="btn btn-danger mt-3"
              onClick={handleCancel}
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;