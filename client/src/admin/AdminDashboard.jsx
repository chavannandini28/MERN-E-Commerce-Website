import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
  FaArrowUp,
} from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">

      {/* Heading */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">
            Dashboard
          </h2>

          <p className="text-muted mb-0">
            Welcome back, Admin 👋
          </p>
        </div>

        <button className="btn btn-primary">
          Generate Report
        </button>

      </div>

      {/* Statistics */}

      <div className="row g-4">

        <div className="col-lg-3 col-md-6">

          <div className="card border-0 shadow h-100">

            <div className="card-body d-flex justify-content-between align-items-center">

              <div>

                <small className="text-muted">
                  Total Users
                </small>

                <h2 className="fw-bold">
                  1,250
                </h2>

                <span className="text-success">
                  <FaArrowUp /> 12%
                </span>

              </div>

              <div
                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                style={{
                  width: "70px",
                  height: "70px",
                }}
              >
                <FaUsers size={30} />
              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="card border-0 shadow h-100">

            <div className="card-body d-flex justify-content-between align-items-center">

              <div>

                <small className="text-muted">
                  Products
                </small>

                <h2 className="fw-bold">
                  520
                </h2>

                <span className="text-success">
                  <FaArrowUp /> 8%
                </span>

              </div>

              <div
                className="rounded-circle bg-success text-white d-flex justify-content-center align-items-center"
                style={{
                  width: "70px",
                  height: "70px",
                }}
              >
                <FaBoxOpen size={30} />
              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="card border-0 shadow h-100">

            <div className="card-body d-flex justify-content-between align-items-center">

              <div>

                <small className="text-muted">
                  Orders
                </small>

                <h2 className="fw-bold">
                  385
                </h2>

                <span className="text-success">
                  <FaArrowUp /> 15%
                </span>

              </div>

              <div
                className="rounded-circle bg-warning text-white d-flex justify-content-center align-items-center"
                style={{
                  width: "70px",
                  height: "70px",
                }}
              >
                <FaShoppingCart size={30} />
              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-3 col-md-6">

          <div className="card border-0 shadow h-100">

            <div className="card-body d-flex justify-content-between align-items-center">

              <div>

                <small className="text-muted">
                  Revenue
                </small>

                <h2 className="fw-bold">
                  ₹2.5L
                </h2>

                <span className="text-success">
                  <FaArrowUp /> 20%
                </span>

              </div>

              <div
                className="rounded-circle bg-danger text-white d-flex justify-content-center align-items-center"
                style={{
                  width: "70px",
                  height: "70px",
                }}
              >
                <FaRupeeSign size={30} />
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Recent Orders */}

      <div className="card border-0 shadow mt-5">

        <div className="card-header bg-white">
          <h4 className="fw-bold mb-0">
            Recent Orders
          </h4>
        </div>

        <div className="table-responsive">

          <table className="table align-middle mb-0">

            <thead>

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

                <td>Rahul Sharma</td>

                <td>₹24,999</td>

                <td>
                  <span className="badge bg-success">
                    Delivered
                  </span>
                </td>

              </tr>

              <tr>

                <td>#1002</td>

                <td>Priya Patil</td>

                <td>₹12,500</td>

                <td>
                  <span className="badge bg-warning text-dark">
                    Pending
                  </span>
                </td>

              </tr>

              <tr>

                <td>#1003</td>

                <td>Amit Kumar</td>

                <td>₹9,999</td>

                <td>
                  <span className="badge bg-primary">
                    Shipped
                  </span>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;