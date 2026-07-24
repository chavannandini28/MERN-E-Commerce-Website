import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
  FaStar,
  FaExclamationTriangle,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { getDashboardStats } from "../api/dashboardApi";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalReviews: 0,
    recentOrders: [],
    latestUsers: [],
    lowStockProducts: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const { data } = await getDashboardStats();

      setStats({
        totalUsers: data?.totalUsers || 0,
        totalProducts: data?.totalProducts || 0,
        totalOrders: data?.totalOrders || 0,
        totalRevenue: data?.totalRevenue || 0,
        totalReviews: data?.totalReviews || 0,
        recentOrders: data?.recentOrders || [],
        latestUsers: data?.latestUsers || [],
        lowStockProducts: data?.lowStockProducts || [],
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">Admin Dashboard</h2>
          <p className="text-muted mb-0">
            Welcome to your admin panel
          </p>
        </div>

      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (

        <>
          {/* Statistics */}

          <div className="row">

            {/* Users */}

            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center">

                    <div>
                      <h6 className="text-muted">
                        Total Users
                      </h6>

                      <h2 className="fw-bold">
                        {stats.totalUsers}
                      </h2>
                    </div>

                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: 65,
                        height: 65,
                      }}
                    >
                      <FaUsers size={28} />
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* Products */}

            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center">

                    <div>
                      <h6 className="text-muted">
                        Total Products
                      </h6>

                      <h2 className="fw-bold">
                        {stats.totalProducts}
                      </h2>
                    </div>

                    <div
                      className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: 65,
                        height: 65,
                      }}
                    >
                      <FaBoxOpen size={28} />
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* Orders */}

            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center">

                    <div>
                      <h6 className="text-muted">
                        Total Orders
                      </h6>

                      <h2 className="fw-bold">
                        {stats.totalOrders}
                      </h2>
                    </div>

                    <div
                      className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: 65,
                        height: 65,
                      }}
                    >
                      <FaShoppingCart size={28} />
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* Revenue */}

            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center">

                    <div>
                      <h6 className="text-muted">
                        Total Revenue
                      </h6>

                      <h2 className="fw-bold text-success">
                        ₹
                        {Number(
                          stats.totalRevenue
                        ).toLocaleString()}
                      </h2>
                    </div>

                    <div
                      className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: 65,
                        height: 65,
                      }}
                    >
                      <FaRupeeSign size={28} />
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* Reviews */}

            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center">

                    <div>
                      <h6 className="text-muted">
                        Total Reviews
                      </h6>

                      <h2 className="fw-bold">
                        {stats.totalReviews}
                      </h2>
                    </div>

                    <div
                      className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: 65,
                        height: 65,
                      }}
                    >
                      <FaStar size={28} />
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* Low Stock */}

            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center">

                    <div>
                      <h6 className="text-muted">
                        Low Stock Products
                      </h6>

                      <h2 className="fw-bold text-danger">
                        {stats.lowStockProducts.length}
                      </h2>
                    </div>

                    <div
                      className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: 65,
                        height: 65,
                      }}
                    >
                      <FaExclamationTriangle size={28} />
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Part B starts here */}

                    {/* Recent Orders & Latest Users */}

          <div className="row">

            {/* Recent Orders */}

            <div className="col-lg-8 mb-4">

              <div className="card border-0 shadow h-100">

                <div className="card-header bg-white">
                  <h5 className="mb-0 fw-bold">
                    Recent Orders
                  </h5>
                </div>

                <div className="card-body p-0">

                  {stats.recentOrders.length === 0 ? (

                    <div className="text-center p-4">
                      No recent orders found.
                    </div>

                  ) : (

                    <div className="table-responsive">

                      <table className="table table-hover mb-0">

                        <thead className="table-light">

                          <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                          </tr>

                        </thead>

                        <tbody>

                          {stats.recentOrders.map((order) => (

                            <tr key={order._id}>

                              <td>
                                {order._id?.slice(-8)}
                              </td>

                              <td>
                                {order.user?.name || "Customer"}
                              </td>

                              <td>
                                ₹
                                {order.totalPrice ||
                                  order.totalAmount ||
                                  0}
                              </td>

                              <td>

                                <span
                                  className={`badge ${
                                    order.orderStatus === "Delivered"
                                      ? "bg-success"
                                      : order.orderStatus === "Cancelled"
                                      ? "bg-danger"
                                      : "bg-warning"
                                  }`}
                                >
                                  {order.orderStatus}
                                </span>

                              </td>

                            </tr>

                          ))}

                        </tbody>

                      </table>

                    </div>

                  )}

                </div>

              </div>

            </div>

            {/* Latest Users */}

            <div className="col-lg-4 mb-4">

              <div className="card border-0 shadow h-100">

                <div className="card-header bg-white">

                  <h5 className="mb-0 fw-bold">
                    Latest Users
                  </h5>

                </div>

                <div className="card-body">

                  {stats.latestUsers.length === 0 ? (

                    <div className="text-center">
                      No users found.
                    </div>

                  ) : (

                    stats.latestUsers.map((user) => (

                      <div
                        key={user._id}
                        className="d-flex align-items-center mb-3"
                      >

                        <img
                          src={
                            user.avatar?.url ||
                            "https://via.placeholder.com/50"
                          }
                          alt={user.name}
                          width="50"
                          height="50"
                          className="rounded-circle me-3"
                        />

                        <div>

                          <h6 className="mb-0">
                            {user.name}
                          </h6>

                          <small className="text-muted">
                            {user.email}
                          </small>

                        </div>

                      </div>

                    ))

                  )}

                </div>

              </div>

            </div>

          </div>

          {/* Part C starts here */}

                    {/* Low Stock Products */}

          <div className="row">

            <div className="col-12">

              <div className="card border-0 shadow">

                <div className="card-header bg-white">

                  <h5 className="fw-bold mb-0">
                    Low Stock Products
                  </h5>

                </div>

                <div className="card-body p-0">

                  {stats.lowStockProducts.length === 0 ? (

                    <div className="text-center p-4">
                      No low stock products found.
                    </div>

                  ) : (

                    <div className="table-responsive">

                      <table className="table table-striped table-hover mb-0">

                        <thead className="table-light">

                          <tr>

                            <th>Product</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Stock</th>

                          </tr>

                        </thead>

                        <tbody>

                          {stats.lowStockProducts.map((product) => (

                            <tr key={product._id}>

                              <td>{product.title}</td>

                              <td>
                                {product.brand?.name || "-"}
                              </td>

                              <td>
                                ₹{product.price}
                              </td>

                              <td>

                                <span
                                  className={`badge ${
                                    product.stock <= 5
                                      ? "bg-danger"
                                      : "bg-warning"
                                  }`}
                                >
                                  {product.stock}
                                </span>

                              </td>

                            </tr>

                          ))}

                        </tbody>

                      </table>

                    </div>

                  )}

                </div>

              </div>

            </div>

          </div>

        </>

      )}

    </div>

  );
};

export default AdminDashboard;