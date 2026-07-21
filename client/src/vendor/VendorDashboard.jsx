import {
  FaShoppingBag,
  FaClipboardList,
  FaRupeeSign,
  FaStar,
  FaArrowUp,
} from "react-icons/fa";

const VendorDashboard = () => {
  const recentProducts = [
    {
      id: 1,
      name: "Apple iPhone 16",
      price: 79999,
      stock: 20,
    },
    {
      id: 2,
      name: "Samsung Galaxy S25",
      price: 69999,
      stock: 15,
    },
    {
      id: 3,
      name: "Sony Headphones",
      price: 9999,
      stock: 45,
    },
  ];

  return (
    <div className="container-fluid">

      <div className="mb-4">

        <h2 className="fw-bold">
          Vendor Dashboard
        </h2>

        <p className="text-muted">
          Welcome back! Here's your business overview.
        </p>

      </div>

      {/* Statistics */}

      <div className="row g-4 mb-5">

        <div className="col-lg-3 col-md-6">

          <div className="card border-0 shadow rounded-4">

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <h6 className="text-muted">
                    Products
                  </h6>

                  <h2 className="fw-bold">
                    125
                  </h2>

                  <span className="text-success">

                    <FaArrowUp /> 12%

                  </span>

                </div>

                <FaShoppingBag
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
                    Orders
                  </h6>

                  <h2 className="fw-bold">
                    430
                  </h2>

                  <span className="text-success">

                    <FaArrowUp /> 18%

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
                    ₹2.5L
                  </h2>

                  <span className="text-success">

                    <FaArrowUp /> 25%

                  </span>

                </div>

                <FaRupeeSign
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
                    Rating
                  </h6>

                  <h2 className="fw-bold">
                    4.8
                  </h2>

                  <span className="text-success">

                    <FaArrowUp /> 5%

                  </span>

                </div>

                <FaStar
                  size={45}
                  className="text-warning"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Recent Products */}

      <div className="card border-0 shadow rounded-4">

        <div className="card-header bg-white">

          <h4 className="fw-bold mb-0">
            Recent Products
          </h4>

        </div>

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">

              <tr>

                <th>Product</th>

                <th>Price</th>

                <th>Stock</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {recentProducts.map((product) => (

                <tr key={product.id}>

                  <td>

                    <strong>
                      {product.name}
                    </strong>

                  </td>

                  <td className="text-success fw-bold">

                    ₹{product.price}

                  </td>

                  <td>

                    {product.stock}

                  </td>

                  <td>

                    <span className="badge bg-success">

                      Active

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default VendorDashboard;