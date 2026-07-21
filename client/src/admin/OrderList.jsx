import { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaPrint,
  FaTruck,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

const OrderList = () => {
  const [search, setSearch] = useState("");

  // Replace with your backend data
  const orders = [
    {
      _id: "ORD1001",
      customer: "John Doe",
      amount: 2499,
      payment: "Paid",
      status: "Delivered",
      date: "20 Jul 2026",
    },
    {
      _id: "ORD1002",
      customer: "Rahul Sharma",
      amount: 7999,
      payment: "Pending",
      status: "Processing",
      date: "19 Jul 2026",
    },
    {
      _id: "ORD1003",
      customer: "Priya Patel",
      amount: 1599,
      payment: "Paid",
      status: "Shipped",
      date: "18 Jul 2026",
    },
  ];

  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            Order Management
          </h2>

          <p className="text-muted">
            Manage all customer orders
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="card border-0 shadow mb-4">

        <div className="card-body">

          <div className="input-group">

            <span className="input-group-text">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search Order ID or Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="card border-0 shadow rounded-4">

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-dark">

              <tr>

                <th>Order ID</th>

                <th>Customer</th>

                <th>Date</th>

                <th>Total</th>

                <th>Payment</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredOrders.map((order) => (

                <tr key={order._id}>

                  <td>

                    <strong>
                      #{order._id}
                    </strong>

                  </td>

                  <td>
                    {order.customer}
                  </td>

                  <td>
                    {order.date}
                  </td>

                  <td className="fw-bold text-success">
                    ₹{order.amount}
                  </td>

                  <td>

                    <span
                      className={`badge ${
                        order.payment === "Paid"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.payment}
                    </span>

                  </td>

                  <td>

                    {order.status === "Delivered" && (
                      <span className="badge bg-success">
                        <FaCheckCircle className="me-1" />
                        Delivered
                      </span>
                    )}

                    {order.status === "Shipped" && (
                      <span className="badge bg-info">
                        <FaTruck className="me-1" />
                        Shipped
                      </span>
                    )}

                    {order.status === "Processing" && (
                      <span className="badge bg-warning text-dark">
                        <FaClock className="me-1" />
                        Processing
                      </span>
                    )}

                  </td>

                  <td>

                    <div className="btn-group">

                      <button
                        className="btn btn-primary btn-sm"
                        title="View"
                      >
                        <FaEye />
                      </button>

                      <button
                        className="btn btn-success btn-sm"
                        title="Invoice"
                      >
                        <FaPrint />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default OrderList;