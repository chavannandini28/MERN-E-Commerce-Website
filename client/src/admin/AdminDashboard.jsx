import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
  FaStar,
} from "react-icons/fa";
import { getDashboardStats } from "../api/dashboardApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
    reviews: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const { data } = await getDashboardStats();

      setStats({
        users: data.users || 0,
        products: data.products || 0,
        orders: data.orders || 0,
        revenue: data.revenue || 0,
        reviews: data.reviews || 0,
        recentOrders: data.recentOrders || [],
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Users",
      value: stats.users,
      color: "primary",
      icon: <FaUsers size={28} />,
    },
    {
      title: "Products",
      value: stats.products,
      color: "success",
      icon: <FaBoxOpen size={28} />,
    },
    {
      title: "Orders",
      value: stats.orders,
      color: "warning",
      icon: <FaShoppingCart size={28} />,
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      color: "danger",
      icon: <FaRupeeSign size={28} />,
    },
    {
      title: "Reviews",
      value: stats.reviews,
      color: "info",
      icon: <FaStar size={28} />,
    },
  ];

  if (loading) {
    return (
      <div className="text-center py-5">
        <h3>Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <h2 className="fw-bold mb-4">
        Admin Dashboard
      </h2>

      <div className="row g-4 mb-5">

        {cards.map((card) => (

          <div
            className="col-lg col-md-4 col-sm-6"
            key={card.title}
          >

            <div
              className={`card border-0 shadow bg-${card.color} text-white`}
            >
              <div className="card-body">

                <div className="d-flex justify-content-between">

                  <div>
                    <h6>{card.title}</h6>

                    <h3>{card.value}</h3>
                  </div>

                  {card.icon}

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="card shadow border-0">

        <div className="card-body">

          <h4 className="mb-4">
            Recent Orders
          </h4>

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>

                <tr>

                  <th>Order ID</th>

                  <th>Customer</th>

                  <th>Total</th>

                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {stats.recentOrders.length > 0 ? (
                  stats.recentOrders.map((order) => (

                    <tr key={order._id}>

                      <td>
                        {order._id.slice(-6)}
                      </td>

                      <td>
                        {order.user?.name}
                      </td>

                      <td>
                        ₹{order.totalPrice}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            order.orderStatus === "Delivered"
                              ? "bg-success"
                              : "bg-warning text-dark"
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
                      colSpan="4"
                      className="text-center"
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
  );
};

export default AdminDashboard;