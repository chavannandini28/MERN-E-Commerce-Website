import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

import {
  getVendorOrders,
  updateOrderStatus,
} from "../api/orderApi";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const { data } = await getVendorOrders();

      setOrders(data.orders || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);

      toast.success("Order status updated");

      loadOrders();
    } catch (error) {
      console.error(error);
      toast.error("Unable to update status");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container-fluid py-4">

      <h2 className="fw-bold mb-4">
        Vendor Orders
      </h2>

      <div className="card shadow border-0">

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th width="220">Update Status</th>
              </tr>
            </thead>

            <tbody>

              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>

                    <td>{order._id.slice(-8)}</td>

                    <td>
                      <strong>
                        {order.user?.name}
                      </strong>

                      <br />

                      <small className="text-muted">
                        {order.user?.email}
                      </small>
                    </td>

                    <td>
                      {order.products?.map((product) => (
                        <div key={product._id}>
                          {product.name} × {product.quantity}
                        </div>
                      ))}
                    </td>

                    <td className="fw-bold text-success">
                      ₹ {order.totalPrice}
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          order.isPaid
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {order.isPaid
                          ? "Paid"
                          : "Pending"}
                      </span>
                    </td>

                    <td>
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
                    </td>

                    <td>

                      <select
                        className="form-select"
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4"
                  >
                    No Orders Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default VendorOrders;