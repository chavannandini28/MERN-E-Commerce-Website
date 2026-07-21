import { useEffect, useState } from "react";
import { getAdminDashboard } from "../api/dashboardApi";
import DashboardCard from "../components/DashboardCard";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const { data } = await getAdminDashboard();

      // Backend returns { success, statistics, lowStockProducts, recentOrders }
      setStats(data.statistics);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    }
  };

  if (!stats) {
    return <Loader />;
  }

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

      <div className="row">

        <div className="col-lg-3 col-md-6 mb-4">
          <DashboardCard
            title="Users"
            value={stats.totalUsers || 0}
            color="primary"
          />
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <DashboardCard
            title="Products"
            value={stats.totalProducts || 0}
            color="success"
          />
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <DashboardCard
            title="Orders"
            value={stats.totalOrders || 0}
            color="warning"
          />
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <DashboardCard
            title="Revenue"
            value={`₹ ${stats.totalRevenue || 0}`}
            color="danger"
          />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;