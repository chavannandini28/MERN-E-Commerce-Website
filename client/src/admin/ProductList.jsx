import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import Loader from "../components/Loader";

import {
  getProducts,
  deleteProduct,
} from "../api/productApi";

const ProductList = () => {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const { data } = await getProducts();

      setProducts(data.products || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load products"
      );

    } finally {

      setLoading(false);

    }
  };

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      toast.success("Product deleted successfully");

      loadProducts();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to delete product"
      );

    }
  };

  const filteredProducts = products.filter((product) =>
    product.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          Product Management
        </h2>

        <Link
          to="/admin/products/add"
          className="btn btn-primary"
        >
          <FaPlus className="me-2" />
          Add Product
        </Link>

      </div>

      <div className="card border-0 shadow-sm">

        <div className="card-body">

          <div className="row mb-4">

            <div className="col-md-6">

              <div className="input-group">

                <span className="input-group-text">
                  <FaSearch />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>

          </div>

                    <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>Image</th>

                  <th>Product</th>

                  <th>Category</th>

                  <th>Brand</th>

                  <th>Price</th>

                  <th>Stock</th>

                  <th>Status</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.length > 0 ? (

                  filteredProducts.map((product) => (

                    <tr key={product._id}>

                      <td>

                        <img
                          src={
                            product.thumbnail?.url ||
                            "https://via.placeholder.com/60"
                          }
                          alt={product.title}
                          width="60"
                          height="60"
                          className="rounded border"
                          style={{
                            objectFit: "cover",
                          }}
                        />

                      </td>

                      <td>

                        <div>

                          <h6 className="mb-1 fw-bold">

                            {product.title}

                          </h6>

                          <small className="text-muted">

                            SKU : {product.sku}

                          </small>

                        </div>

                      </td>

                      <td>

                        {product.category?.name ||
                          product.category}

                      </td>

                      <td>

                        {product.brand?.name ||
                          product.brand}

                      </td>

                      <td className="fw-bold text-success">

                        ₹{product.price}

                      </td>

                      <td>

                        {product.stock}

                      </td>

                      <td>

                        {product.stock > 10 ? (

                          <span className="badge bg-success">

                            In Stock

                          </span>

                        ) : product.stock > 0 ? (

                          <span className="badge bg-warning text-dark">

                            Low Stock

                          </span>

                        ) : (

                          <span className="badge bg-danger">

                            Out of Stock

                          </span>

                        )}

                      </td>

                      <td>

                        <div className="btn-group">

                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="btn btn-sm btn-outline-primary"
                          >

                            <FaEdit />

                          </Link>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              deleteHandler(product._id)
                            }
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >

                      <h5 className="text-muted">

                        No Products Found

                      </h5>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

                    <hr />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">

            <div>

              <strong>
                Total Products :
              </strong>

              <span className="ms-2 badge bg-primary">

                {filteredProducts.length}

              </span>

            </div>

            <div className="mt-3 mt-md-0">

              <button
                className="btn btn-outline-secondary"
                onClick={loadProducts}
              >

                Refresh List

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductList;