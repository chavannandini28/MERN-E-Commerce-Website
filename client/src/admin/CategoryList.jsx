import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaLayerGroup,
} from "react-icons/fa";

const CategoryList = () => {
  // Replace with your API data later
  const categories = [
    {
      _id: "1",
      name: "Mobiles",
      slug: "mobiles",
      products: 120,
    },
    {
      _id: "2",
      name: "Laptops",
      slug: "laptops",
      products: 85,
    },
    {
      _id: "3",
      name: "Accessories",
      slug: "accessories",
      products: 230,
    },
  ];

  return (
    <div className="container-fluid">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            Categories
          </h2>

          <p className="text-muted">
            Manage Product Categories
          </p>

        </div>

        <Link
          to="/admin/add-category"
          className="btn btn-primary"
        >
          <FaPlus className="me-2" />
          Add Category
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
              placeholder="Search Category..."
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

                <th>Icon</th>

                <th>Name</th>

                <th>Slug</th>

                <th>Total Products</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {categories.map((category) => (

                <tr key={category._id}>

                  <td>

                    <FaLayerGroup
                      size={35}
                      className="text-primary"
                    />

                  </td>

                  <td>

                    <strong>
                      {category.name}
                    </strong>

                  </td>

                  <td>

                    <span className="badge bg-secondary">
                      {category.slug}
                    </span>

                  </td>

                  <td>

                    <span className="badge bg-success">
                      {category.products}
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

export default CategoryList;