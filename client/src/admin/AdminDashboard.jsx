import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";

import Loader from "../components/Loader";
import DashboardCharts from "./DashboardCharts";

import { getDashboardStats } from "../api/dashboardApi";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    lowStockProducts: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const { data } = await getDashboardStats();

      setStats({
        totalUsers: data.totalUsers || 0,
        totalProducts: data.totalProducts || 0,
        totalOrders: data.totalOrders || 0,
        totalRevenue: data.totalRevenue || 0,
        recentOrders: data.recentOrders || [],
        lowStockProducts: data.lowStockProducts || [],
      });
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

      <div className="mb-4">

        <h2 className="fw-bold">
          Admin Dashboard
        </h2>

        <p className="text-muted">
          Welcome back! Here is your store overview.
        </p>

      </div>

      <div className="row g-4">

        {/* Users */}

        <div className="col-lg-3 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body d-flex align-items-center">

              <div className="bg-primary rounded-circle text-white p-3 me-3">

                <FaUsers size={28} />

              </div>

              <div>

                <small className="text-muted">
                  Total Users
                </small>

                <h3 className="fw-bold mb-0">
                  {stats.totalUsers}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Products */}

        <div className="col-lg-3 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body d-flex align-items-center">

              <div className="bg-success rounded-circle text-white p-3 me-3">

                <FaBoxOpen size={28} />

              </div>

              <div>

                <small className="text-muted">
                  Products
                </small>

                <h3 className="fw-bold mb-0">
                  {stats.totalProducts}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Orders */}

        <div className="col-lg-3 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body d-flex align-items-center">

              <div className="bg-warning rounded-circle text-white p-3 me-3">

                <FaShoppingCart size={28} />

              </div>

              <div>

                <small className="text-muted">
                  Orders
                </small>

                <h3 className="fw-bold mb-0">
                  {stats.totalOrders}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Revenue */}

        <div className="col-lg-3 col-md-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-body d-flex align-items-center">

              <div className="bg-danger rounded-circle text-white p-3 me-3">

                <FaRupeeSign size={28} />

              </div>

              <div>

                <small className="text-muted">
                  Revenue
                </small>

                <h3 className="fw-bold mb-0">
                  ₹{stats.totalRevenue}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Part 2 Starts Here */}

            {/* Dashboard Charts */}

      <div className="row mt-5">

        <div className="col-lg-8">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white">

              <h5 className="fw-bold mb-0">
                Sales Analytics
              </h5>

            </div>

            <div className="card-body">

              <DashboardCharts />

            </div>

          </div>

        </div>

        <div className="col-lg-4">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white">

              <h5 className="fw-bold mb-0">
                Store Summary
              </h5>

            </div>

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <span className="text-muted">
                  Total Users
                </span>

                <span className="fw-bold">
                  {stats.totalUsers}
                </span>

              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">

                <span className="text-muted">
                  Products
                </span>

                <span className="fw-bold">
                  {stats.totalProducts}
                </span>

              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">

                <span className="text-muted">
                  Orders
                </span>

                <span className="fw-bold">
                  {stats.totalOrders}
                </span>

              </div>

              <div className="d-flex justify-content-between align-items-center">

                <span className="text-muted">
                  Revenue
                </span>

                <span className="fw-bold text-success">
                  ₹{stats.totalRevenue}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Part 3 Starts Here */}

            {/* Recent Orders */}

      <div className="row mt-5">

        <div className="col-lg-8">

          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white d-flex justify-content-between align-items-center">

              <h5 className="fw-bold mb-0">
                Recent Orders
              </h5>

              <span className="badge bg-primary">
                {stats.recentOrders.length} Orders
              </span>

            </div>

            <div className="card-body p-0">

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-light">

                    <tr>

                      <th>#</th>

                      <th>Customer</th>

                      <th>Items</th>

                      <th>Total</th>

                      <th>Status</th>

                    </tr>

                  </thead>

                  <tbody>

                    {stats.recentOrders.length > 0 ? (

                      stats.recentOrders.map((order, index) => (

                        <tr key={order._id}>

                          <td>{index + 1}</td>

                          <td>
                            {order.user?.name || "Guest"}
                          </td>

                          <td>
                            {order.orderItems?.length || 0}
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

                        </tr>

                      ))

                    ) : (

                      <tr>

                        <td
                          colSpan="5"
                          className="text-center py-5 text-muted"
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

        </div>

                {/* Low Stock Products */}

        <div className="col-lg-4">

          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white d-flex justify-content-between align-items-center">

              <h5 className="fw-bold mb-0">
                Low Stock Products
              </h5>

              <span className="badge bg-danger">
                {stats.lowStockProducts.length}
              </span>

            </div>

            <div className="card-body">

              {stats.lowStockProducts.length > 0 ? (

                stats.lowStockProducts.map((product) => (

                  <div
                    key={product._id}
                    className="d-flex justify-content-between align-items-center border-bottom py-3"
                  >

                    <div>

                      <h6 className="mb-1">
                        {product.title}
                      </h6>

                      <small className="text-muted">
                        SKU : {product.sku}
                      </small>

                    </div>

                    <div className="text-end">

                      <span className="badge bg-warning text-dark">

                        {product.stock} Left

                      </span>

                    </div>

                  </div>

                ))

              ) : (

                <div className="text-center py-5">

                  <h6 className="text-success">
                    Inventory looks good 🎉
                  </h6>

                  <small className="text-muted">
                    No products are running low on stock.
                  </small>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="row mt-5">

        <div className="col-12">

          <div className="card border-0 shadow-sm">

            <div className="card-header bg-white">

              <h5 className="fw-bold mb-0">

                Quick Actions

              </h5>

            </div>

            <div className="card-body">

              <div className="row g-3">

                <div className="col-lg-3 col-md-6">

                  <button className="btn btn-primary w-100 py-3">

                    Add Product

                  </button>

                </div>

                <div className="col-lg-3 col-md-6">

                  <button className="btn btn-success w-100 py-3">

                    Manage Orders

                  </button>

                </div>

                <div className="col-lg-3 col-md-6">

                  <button className="btn btn-warning w-100 py-3">

                    Manage Users

                  </button>

                </div>

                <div className="col-lg-3 col-md-6">

                  <button className="btn btn-dark w-100 py-3">

                    Reports

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

            {/* Footer */}

      <div className="row mt-5">

        <div className="col-12">

          <div className="card border-0 shadow-sm">

            <div className="card-body d-flex flex-column flex-lg-row justify-content-between align-items-center">

              <div>

                <h5 className="fw-bold mb-1">

                  Store Performance

                </h5>

                <p className="text-muted mb-0">

                  Monitor your products, orders, users and revenue from one place.

                </p>

              </div>

              <button
                className="btn btn-primary mt-3 mt-lg-0"
                onClick={loadDashboard}
              >

                Refresh Dashboard

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;