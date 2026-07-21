import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaEye,
} from "react-icons/fa";

const ProductList = () => {
  // Replace with API data later
  const products = [
    {
      _id: "1",
      name: "Apple iPhone 16",
      category: "Mobiles",
      brand: "Apple",
      price: 79999,
      stock: 20,
      image: "https://via.placeholder.com/80",
    },
    {
      _id: "2",
      name: "Samsung Galaxy S25",
      category: "Mobiles",
      brand: "Samsung",
      price: 69999,
      stock: 12,
      image: "https://via.placeholder.com/80",
    },
    {
      _id: "3",
      name: "Sony Headphones",
      category: "Accessories",
      brand: "Sony",
      price: 9999,
      stock: 45,
      image: "https://via.placeholder.com/80",
    },
  ];

  return (
    <div className="container-fluid">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            Products
          </h2>

          <p className="text-muted">
            Manage all products
          </p>

        </div>

        <Link
          to="/admin/add-product"
          className="btn btn-primary"
        >
          <FaPlus className="me-2" />
          Add Product
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
              placeholder="Search Product..."
            />

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="card border-0 shadow">

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-dark">

              <tr>

                <th>Image</th>

                <th>Name</th>

                <th>Category</th>

                <th>Brand</th>

                <th>Price</th>

                <th>Stock</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr key={product._id}>

                  <td>

                    <img
                      src={product.image}
                      alt={product.name}
                      width="70"
                      height="70"
                      className="rounded"
                    />

                  </td>

                  <td>

                    <strong>
                      {product.name}
                    </strong>

                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>
                    {product.brand}
                  </td>

                  <td className="fw-bold text-success">
                    ₹{product.price}
                  </td>

                  <td>

                    <span
                      className={`badge ${
                        product.stock > 10
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {product.stock}
                    </span>

                  </td>

                  <td>

                    <div className="btn-group">

                      <button className="btn btn-info text-white">
                        <FaEye />
                      </button>

                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="btn btn-warning"
                      >
                        <FaEdit />
                      </Link>

                      <button className="btn btn-danger">
                        <FaTrash />
                      </button>

                    </div>

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

export default ProductList;