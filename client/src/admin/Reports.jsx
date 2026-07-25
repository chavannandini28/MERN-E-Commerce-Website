import { useEffect, useState } from "react";
import {
  FaChartBar,
  FaDownload,
  FaRupeeSign,
  FaShoppingCart,
  FaUsers,
  FaBoxOpen,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { getDashboardStats } from "../api/dashboardApi";

const Reports = () => {
  const [loading, setLoading] = useState(true);

  const [report, setReport] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const { data } = await getDashboardStats();

      setReport({
        totalRevenue: data.totalRevenue || 0,
        totalOrders: data.totalOrders || 0,
        totalUsers: data.totalUsers || 0,
        totalProducts: data.totalProducts || 0,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load reports."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    window.print();
  };

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            Reports
          </h2>

          <p className="text-muted mb-0">
            Business summary report
          </p>

        </div>

        <button
          className="btn btn-success"
          onClick={downloadReport}
        >
          <FaDownload className="me-2" />
          Download Report
        </button>

      </div>

      {loading ? (

        <div className="text-center py-5">

          <div className="spinner-border text-primary" />

        </div>

      ) : (

        <div className="row">

                      {/* Revenue */}

          <div className="col-lg-3 col-md-6 mb-4">

            <div className="card border-0 shadow h-100">

              <div className="card-body text-center">

                <FaRupeeSign
                  size={40}
                  className="text-success mb-3"
                />

                <h6 className="text-muted">
                  Total Revenue
                </h6>

                <h3 className="fw-bold text-success">
                  ₹
                  {Number(
                    report.totalRevenue
                  ).toLocaleString()}
                </h3>

              </div>

            </div>

          </div>

          {/* Orders */}

          <div className="col-lg-3 col-md-6 mb-4">

            <div className="card border-0 shadow h-100">

              <div className="card-body text-center">

                <FaShoppingCart
                  size={40}
                  className="text-warning mb-3"
                />

                <h6 className="text-muted">
                  Total Orders
                </h6>

                <h3 className="fw-bold">
                  {report.totalOrders}
                </h3>

              </div>

            </div>

          </div>

          {/* Users */}

          <div className="col-lg-3 col-md-6 mb-4">

            <div className="card border-0 shadow h-100">

              <div className="card-body text-center">

                <FaUsers
                  size={40}
                  className="text-primary mb-3"
                />

                <h6 className="text-muted">
                  Total Users
                </h6>

                <h3 className="fw-bold">
                  {report.totalUsers}
                </h3>

              </div>

            </div>

          </div>

          {/* Products */}

          <div className="col-lg-3 col-md-6 mb-4">

            <div className="card border-0 shadow h-100">

              <div className="card-body text-center">

                <FaBoxOpen
                  size={40}
                  className="text-info mb-3"
                />

                <h6 className="text-muted">
                  Total Products
                </h6>

                <h3 className="fw-bold">
                  {report.totalProducts}
                </h3>

              </div>

            </div>

          </div>

                    {/* Summary Table */}

          <div className="col-12">

            <div className="card border-0 shadow">

              <div className="card-header bg-white">

                <h5 className="fw-bold mb-0">
                  Business Summary
                </h5>

              </div>

              <div className="card-body">

                <div className="table-responsive">

                  <table className="table table-bordered table-hover">

                    <thead className="table-light">

                      <tr>

                        <th>Metric</th>

                        <th>Value</th>

                      </tr>

                    </thead>

                    <tbody>

                      <tr>

                        <td>Total Revenue</td>

                        <td>
                          ₹
                          {Number(
                            report.totalRevenue
                          ).toLocaleString()}
                        </td>

                      </tr>

                      <tr>

                        <td>Total Orders</td>

                        <td>
                          {report.totalOrders}
                        </td>

                      </tr>

                      <tr>

                        <td>Total Users</td>

                        <td>
                          {report.totalUsers}
                        </td>

                      </tr>

                      <tr>

                        <td>Total Products</td>

                        <td>
                          {report.totalProducts}
                        </td>

                      </tr>

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );
};

export default Reports;