import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import Loader from "../components/Loader";

import {
  getAllOrders,
  deleteOrder,
} from "../api/orderApi";

const OrderList = () => {

  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {

      setLoading(true);

      const { data } = await getAllOrders();

      setOrders(data.orders || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load orders"
      );

    } finally {

      setLoading(false);

    }

  };

  const deleteHandler = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {

      await deleteOrder(id);

      toast.success("Order deleted successfully");

      loadOrders();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );

    }

  };

  const filteredOrders = orders.filter((order) => {

    return (
      order._id
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      order.user?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  });

  if (loading) {
    return <Loader />;
  }

  return (

    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">

          Order Management

        </h2>

      </div>

      <div className="card border-0 shadow-sm">

        <div className="card-body">

          <div className="row mb-4">

            <div className="col-md-6">

              <div className="input-group">

                <span className="input-group-text">

                  <FaSearch />

                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Order ID or Customer..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>

          </div>

                    <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>Order ID</th>

                  <th>Customer</th>

                  <th>Date</th>

                  <th>Items</th>

                  <th>Total</th>

                  <th>Payment</th>

                  <th>Status</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredOrders.length > 0 ? (

                  filteredOrders.map((order) => (

                    <tr key={order._id}>

                      <td>

                        <code>

                          {order._id.slice(-8)}

                        </code>

                      </td>

                      <td>

                        <div>

                          <h6 className="mb-0">

                            {order.user?.name || "Guest"}

                          </h6>

                          <small className="text-muted">

                            {order.user?.email}

                          </small>

                        </div>

                      </td>

                      <td>

                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}

                      </td>

                      <td>

                        <span className="badge bg-info">

                          {order.orderItems?.length || 0}

                        </span>

                      </td>

                      <td className="fw-bold text-success">

                        ₹{order.totalPrice}

                      </td>

                      <td>

                        {order.isPaid ? (

                          <span className="badge bg-success">

                            Paid

                          </span>

                        ) : (

                          <span className="badge bg-danger">

                            Unpaid

                          </span>

                        )}

                      </td>

                      <td>

                        <span
                          className={`badge ${
                            order.orderStatus === "Delivered"
                              ? "bg-success"
                              : order.orderStatus === "Processing"
                              ? "bg-warning text-dark"
                              : order.orderStatus === "Cancelled"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >

                          {order.orderStatus}

                        </span>

                      </td>

                      <td>

                        <div className="btn-group">

                          <Link
                            to={`/admin/orders/${order._id}`}
                            className="btn btn-sm btn-outline-primary"
                          >

                            <FaEye />

                          </Link>

                          <Link
                            to={`/admin/orders/edit/${order._id}`}
                            className="btn btn-sm btn-outline-warning"
                          >

                            <FaEdit />

                          </Link>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              deleteHandler(order._id)
                            }
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >

                      <h5 className="text-muted">

                        No Orders Found

                      </h5>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>