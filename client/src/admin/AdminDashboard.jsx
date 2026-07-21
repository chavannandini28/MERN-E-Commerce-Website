import {
  FaUsers,
  FaShoppingBag,
  FaClipboardList,
  FaRupeeSign,
  FaArrowUp,
} from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">Admin Dashboard</h2>
          <p className="text-muted">
            Welcome back, Admin 👋
          </p>
        </div>

      </div>

      {/* Statistics */}

      <div className="row g-4">

        <div className="col-lg-3 col-md-6">

          <div className="card border-0 shadow rounded-4">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h6 className="text-muted">
                    Total Users
                  </h6>

                  <h2 className="fw-bold">
                    1,250
                  </h2>

                  <span className="text-success">
                    <FaArrowUp /> 12%
                  </span>

                </div>

                <FaUsers
                  size={45}
                  className="text-primary"
                />

              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="card border-0 shadow rounded-4">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h6 className="text-muted">
                    Products
                  </h6>

                  <h2 className="fw-bold">
                    450
                  </h2>

                  <span className="text-success">
                    <FaArrowUp /> 8%
                  </span>

                </div>

                <FaShoppingBag
                  size={45}
                  className="text-success"
                />

              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="card border-0 shadow rounded-4">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h6 className="text-muted">
                    Orders
                  </h6>

                  <h2 className="fw-bold">
                    892
                  </h2>

                  <span className="text-success">
                    <FaArrowUp /> 15%
                  </span>

                </div>

                <FaClipboardList
                  size={45}
                  className="text-warning"
                />

              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="card border-0 shadow rounded-4">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h6 className="text-muted">
                    Revenue
                  </h6>

                  <h2 className="fw-bold">
                    ₹5.6L
                  </h2>

                  <span className="text-success">
                    <FaArrowUp /> 20%
                  </span>

                </div>

                <FaRupeeSign
                  size={45}
                  className="text-danger"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Recent Orders */}

      <div className="card border-0 shadow rounded-4 mt-5">

        <div className="card-body">

          <h4 className="fw-bold mb-4">
            Recent Orders
          </h4>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>Order ID</th>

                  <th>Customer</th>

                  <th>Amount</th>

                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td>#1001</td>

                  <td>John Doe</td>

                  <td>₹2,499</td>

                  <td>
                    <span className="badge bg-success">
                      Delivered
                    </span>
                  </td>

                </tr>

                <tr>

                  <td>#1002</td>

                  <td>Priya Sharma</td>

                  <td>₹4,999</td>

                  <td>
                    <span className="badge bg-warning text-dark">
                      Processing
                    </span>
                  </td>

                </tr>

                <tr>

                  <td>#1003</td>

                  <td>Rahul Patil</td>

                  <td>₹1,299</td>

                  <td>
                    <span className="badge bg-info">
                      Shipped
                    </span>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;