import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { getVendorDashboard } from "../api/dashboardApi";

const VendorDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const { data } = await getVendorDashboard();

      setDashboard(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">Vendor Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h6>Total Products</h6>
              <h2>{dashboard?.totalProducts || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h6>Total Orders</h6>
              <h2>{dashboard?.totalOrders || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h6>Revenue</h6>
              <h2>₹ {dashboard?.totalRevenue || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 text-center">
            <div className="card-body">
              <h6>Pending Orders</h6>
              <h2>{dashboard?.pendingOrders || 0}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow border-0 mt-5">
        <div className="card-body">
          <h4 className="mb-3">Recent Orders</h4>

          {dashboard?.recentOrders?.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.slice(-6)}</td>
                    <td>{order.user?.name}</td>
                    <td>{order.orderStatus}</td>
                    <td>₹ {order.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No recent orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;