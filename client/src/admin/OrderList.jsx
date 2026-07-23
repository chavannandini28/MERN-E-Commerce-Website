import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaSyncAlt,
  FaEye,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../api/orderApi";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 10;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const { data } = await getOrders();

      setOrders(data?.orders || []);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Unable to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, { status });

      toast.success("Order Updated Successfully");
      loadOrders();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Status update failed"
      );
    }
  };

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOrder(id);

      toast.success("Order Deleted Successfully");
      loadOrders();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customer =
        order?.user?.name?.toLowerCase() || "";

      const orderId =
        order?._id?.toLowerCase() || "";

      const matchesKeyword =
        customer.includes(keyword.toLowerCase()) ||
        orderId.includes(keyword.toLowerCase());

      const currentStatus =
        order?.orderStatus ||
        order?.status ||
        "Pending";

      const matchesStatus =
        statusFilter === "All"
          ? true
          : currentStatus === statusFilter;

      return (
        matchesKeyword &&
        matchesStatus
      );
    });
  }, [orders, keyword, statusFilter]);

  const totalPages = Math.ceil(
    filteredOrders.length / ordersPerPage
  );

  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const badgeColor = (status) => {
    switch (status) {
      case "Delivered":
        return "success";

      case "Processing":
        return "warning";

      case "Shipped":
        return "info";

      case "Cancelled":
        return "danger";

      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading Orders...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          Order Management
        </h2>

        <button
          className="btn btn-outline-primary"
          onClick={loadOrders}
        >
          <FaSyncAlt className="me-2" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-lg-8 mb-2">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search by customer or order ID..."
              value={keyword}
              onChange={(e) =>
                setKeyword(e.target.value)
              }
            />
          </div>
        </div>

        <div className="col-lg-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">All</option>
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
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
                <th width="260">Actions</th>
              </tr>
            </thead>

            <tbody>
              {displayedOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-5"
                  >
                    No Orders Found
                  </td>
                </tr>
              ) : (
                displayedOrders.map(
                  (order, index) => {
                    const status =
                      order?.orderStatus ||
                      order?.status ||
                      "Pending";

                    return (
                      <tr key={order._id}>
                        <td>
                          {(currentPage - 1) *
                            ordersPerPage +
                            index +
                            1}
                        </td>

                        <td>
                          <div className="fw-semibold">
                            {order?.user?.name ||
                              "Customer"}
                          </div>

                          <small className="text-muted">
                            {order?.user?.email ||
                              "No Email"}
                          </small>
                        </td>

                        <td>
                          <span className="fw-bold text-success">
                            ₹
                            {order?.totalPrice ||
                              order?.totalAmount ||
                              order?.total ||
                              0}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`badge bg-${
                              order?.isPaid
                                ? "success"
                                : "danger"
                            }`}
                          >
                            {order?.isPaid
                              ? "Paid"
                              : "Pending"}
                          </span>

                          <br />

                          <small className="text-muted">
                            {order?.paymentMethod ||
                              "COD"}
                          </small>
                        </td>

                        <td>
                          <span
                            className={`badge bg-${badgeColor(
                              status
                            )}`}
                          >
                            {status}
                          </span>
                        </td>

                        <td>
                          {order?.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                        <td>
                          <div className="d-flex gap-2 align-items-center">
                            <Link
                              to={`/admin/orders/${order._id}`}
                              className="btn btn-primary btn-sm"
                            >
                              <FaEye />
                            </Link>

                            <select
                              className="form-select form-select-sm"
                              style={{
                                width: "140px",
                              }}
                              value={status}
                              onChange={(e) =>
                                changeStatus(
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

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deleteHandler(
                                  order._id
                                )
                              }
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button
            className="btn btn-outline-secondary"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            Previous
          </button>

          <div className="d-flex gap-2 flex-wrap">
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                className={`btn ${
                  currentPage === page
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() =>
                  setCurrentPage(page)
                }
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="btn btn-outline-secondary"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderList;