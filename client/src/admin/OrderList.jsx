import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaShoppingBag,
} from "react-icons/fa";

import { getOrders } from "../api/orderApi";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const { data } = await getOrders();

      const list = data.orders || data || [];

      setOrders(list);
      setFilteredOrders(list);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value;

    setKeyword(value);

    const result = orders.filter((order) =>
      order._id.toLowerCase().includes(value.toLowerCase()) ||
      order.user?.name
        ?.toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredOrders(result);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading Orders...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            <FaShoppingBag className="me-2 text-primary" />
            Orders
          </h2>

          <p className="text-muted">
            Manage customer orders
          </p>

        </div>

      </div>

      <div className="card shadow border-0">

        <div className="card-body">

          <div className="row mb-4">

            <div className="col-md-5">

              <div className="input-group">

                <span className="input-group-text">
                  <FaSearch />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Order..."
                  value={keyword}
                  onChange={searchHandler}
                />

              </div>

            </div>

          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>

                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th width="100">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredOrders.length > 0 ? (

                  filteredOrders.map((order) => (

                    <tr key={order._id}>

                      <td>
                        <small>{order._id}</small>
                      </td>

                      <td>
                        {order.user?.name || "Customer"}
                      </td>

                      <td className="fw-bold text-success">
                        ₹{order.totalPrice || order.totalAmount || 0}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            order.isPaid
                              ? "bg-success"
                              : "bg-warning text-dark"
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
                            order.status === "Delivered"
                              ? "bg-success"
                              : order.status === "Shipped"
                              ? "bg-info"
                              : "bg-secondary"
                          }`}
                        >
                          {order.status || "Processing"}
                        </span>

                      </td>

                      <td>
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td>

                        <Link
                          to={`/orders/${order._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          <FaEye />
                        </Link>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center py-5"
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

    </div>
  );
};

export default OrderList;