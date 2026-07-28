import { useEffect, useState } from "react";

import {
  FaUsers,
  FaShoppingCart,
  FaBoxes,
  FaRupeeSign,
  FaStar,
} from "react-icons/fa";

import Loader from "../components/Loader";

import { getDashboardStats } from "../api/dashboardApi";

const Analytics = () => {

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
    reviews: 0,
    recentOrders: [],
    monthlySales: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      setLoading(true);

      const { data } =
        await getDashboardStats();

      setStats(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return <Loader />;
  }

  return (

    <div className="container-fluid py-4">

      <h2 className="fw-bold mb-4">

        Dashboard Analytics

      </h2>

      <div className="row g-4">

        <div className="col-lg-3 col-md-6">

          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h6 className="text-muted">

                    Total Users

                  </h6>

                  <h2>

                    {stats.users}

                  </h2>

                </div>

                <FaUsers
                  size={40}
                  className="text-primary"
                />

              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h6 className="text-muted">

                    Products

                  </h6>

                  <h2>

                    {stats.products}

                  </h2>

                </div>

                <FaBoxes
                  size={40}
                  className="text-success"
                />

              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h6 className="text-muted">

                    Orders

                  </h6>

                  <h2>

                    {stats.orders}

                  </h2>

                </div>

                <FaShoppingCart
                  size={40}
                  className="text-warning"
                />

              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h6 className="text-muted">

                    Revenue

                  </h6>

                  <h2>

                    ₹{stats.revenue}

                  </h2>

                </div>

                <FaRupeeSign
                  size={40}
                  className="text-danger"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

            <div className="row mt-4">

        {/* Reviews Card */}

        <div className="col-lg-3 col-md-6 mb-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6 className="text-muted">

                    Reviews

                  </h6>

                  <h2>

                    {stats.reviews}

                  </h2>

                </div>

                <FaStar
                  size={40}
                  className="text-warning"
                />

              </div>

            </div>

          </div>

        </div>

        {/* Monthly Sales */}

        <div className="col-lg-9 mb-4">

          <div className="card shadow border-0">

            <div className="card-header bg-white">

              <h5 className="fw-bold mb-0">

                Monthly Sales

              </h5>

            </div>

            <div className="card-body">

              <div className="table-responsive">

                <table className="table table-bordered align-middle">

                  <thead>

                    <tr>

                      <th>Month</th>

                      <th>Orders</th>

                      <th>Revenue</th>

                    </tr>

                  </thead>

                  <tbody>

                    {stats.monthlySales?.length > 0 ? (

                      stats.monthlySales.map((item, index) => (

                        <tr key={index}>

                          <td>

                            {item.month}

                          </td>

                          <td>

                            {item.orders}

                          </td>

                          <td className="fw-bold text-success">

                            ₹{item.revenue}

                          </td>

                        </tr>

                      ))

                    ) : (

                      <tr>

                        <td
                          colSpan="3"
                          className="text-center text-muted"
                        >

                          No Sales Data

                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Recent Orders */}

      <div className="card shadow border-0 mt-3">

        <div className="card-header bg-white">

          <h5 className="fw-bold mb-0">

            Recent Orders

          </h5>

        </div>

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>

                <tr>

                  <th>Order ID</th>

                  <th>Customer</th>

                  <th>Total</th>

                  <th>Status</th>

                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {stats.recentOrders?.length > 0 ? (

                  stats.recentOrders.map((order) => (

                    <tr key={order._id}>

                      <td>

                        {order._id.slice(-8)}

                      </td>

                      <td>

                        {order.user?.name}

                      </td>

                      <td className="fw-bold text-success">

                        ₹{order.totalPrice}

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

                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center text-muted"
                    >

                      No Recent Orders

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">

        <div>

          <small className="text-muted">

            Last Updated :
            {" "}
            {new Date().toLocaleString()}

          </small>

        </div>

        <div className="mt-3 mt-md-0">

          <button
            className="btn btn-primary"
            onClick={loadDashboard}
          >

            Refresh Dashboard

          </button>

        </div>

      </div>

    </div>

  );

};

export default Analytics;