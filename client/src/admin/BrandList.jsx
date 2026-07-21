import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTags,
} from "react-icons/fa";

const BrandList = () => {

  // Replace with API data later
  const brands = [
    {
      _id: "1",
      name: "Apple",
      slug: "apple",
      products: 45,
    },
    {
      _id: "2",
      name: "Samsung",
      slug: "samsung",
      products: 38,
    },
    {
      _id: "3",
      name: "Sony",
      slug: "sony",
      products: 26,
    },
    {
      _id: "4",
      name: "HP",
      slug: "hp",
      products: 19,
    },
  ];

  return (
    <div className="container-fluid">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            Brand Management
          </h2>

          <p className="text-muted">
            Manage Product Brands
          </p>

        </div>

        <Link
          to="/admin/add-brand"
          className="btn btn-primary"
        >
          <FaPlus className="me-2" />
          Add Brand
        </Link>

      </div>

      {/* Search */}

      <div className="card border-0 shadow mb-4">

        <div className="card-body">

          <div className="input-group">

            <span className="input-group-text">

              <FaSearch />

            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search Brand..."
            />

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="card border-0 shadow rounded-4">

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-dark">

              <tr>

                <th>Logo</th>

                <th>Brand</th>

                <th>Slug</th>

                <th>Total Products</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {brands.map((brand) => (

                <tr key={brand._id}>

                  <td>

                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                      style={{
                        width: "50px",
                        height: "50px",
                      }}
                    >

                      <FaTags />

                    </div>

                  </td>

                  <td>

                    <strong>

                      {brand.name}

                    </strong>

                  </td>

                  <td>

                    <span className="badge bg-secondary">

                      {brand.slug}

                    </span>

                  </td>

                  <td>

                    <span className="badge bg-success">

                      {brand.products}

                    </span>

                  </td>

                  <td>

                    <button className="btn btn-warning btn-sm me-2">

                      <FaEdit />

                    </button>

                    <button className="btn btn-danger btn-sm">

                      <FaTrash />

                    </button>

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

export default BrandList;