import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaBoxOpen,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getProducts,
  deleteProduct,
} from "../api/productApi";

const ProductList = () => {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  // ============================
  // Fetch Products
  // ============================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await getProducts();

      setProducts(
        data.products ||
        data.data ||
        []
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Delete Product
  // ============================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      toast.success(
        "Product deleted successfully"
      );

      fetchProducts();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Unable to delete product"
      );
    }
  };

  // ============================
  // Search
  // ============================

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const keyword = search.toLowerCase();

      return (
        product.title
          ?.toLowerCase()
          .includes(keyword) ||

        product.brand?.name
          ?.toLowerCase()
          .includes(keyword) ||

        product.category?.name
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [products, search]);

  // ============================
  // Pagination
  // ============================

  const totalPages = Math.ceil(
    filteredProducts.length /
    productsPerPage
  );

  const indexOfLastProduct =
    currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct -
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

      return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            <FaBoxOpen className="me-2 text-primary" />
            Product Management
          </h2>

          <p className="text-muted mb-0">
            Manage all products
          </p>

        </div>

        <Link
          to="/admin/products/add"
          className="btn btn-primary"
        >
          <FaPlus className="me-2" />
          Add Product
        </Link>

      </div>

      {/* Search */}

      <div className="card shadow border-0 mb-4">

        <div className="card-body">

          <div className="input-group">

            <span className="input-group-text bg-white">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search product..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            <button
              className="btn btn-outline-primary"
              onClick={fetchProducts}
            >
              <FaSyncAlt />
            </button>

          </div>

        </div>

      </div>

      {/* Product Table */}

      <div className="card shadow border-0">

        <div className="card-body p-0">

          {loading ? (

            <div className="text-center py-5">

              <div className="spinner-border text-primary"></div>

            </div>

          ) : currentProducts.length === 0 ? (

            <div className="text-center py-5">

              <FaBoxOpen
                size={60}
                className="text-secondary mb-3"
              />

              <h5>No Products Found</h5>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead className="table-dark">

                  <tr>

                    <th>#</th>

                    <th>Image</th>

                    <th>Product</th>

                    <th>Category</th>

                    <th>Brand</th>

                    <th>Price</th>

                    <th>Stock</th>

                    <th>Rating</th>

                    <th className="text-center">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {currentProducts.map(
                    (product, index) => (

                      <tr key={product._id}>

                        <td>
                          {indexOfFirstProduct + index + 1}
                        </td>

                        <td>

                          <img
                            src={
                              product.images?.[0]?.url ||
                              "https://via.placeholder.com/70"
                            }
                            alt={product.title}
                            width="70"
                            height="70"
                            className="rounded border"
                            style={{
                              objectFit: "cover",
                            }}
                          />

                        </td>

                        <td>

                          <h6 className="mb-1">
                            {product.title}
                          </h6>

                          <small className="text-muted">
                            {product.slug}
                          </small>

                        </td>

                        <td>
                          {product.category?.name || "-"}
                        </td>

                        <td>
                          {product.brand?.name || "-"}
                        </td>

                        <td>
                          ₹
                          {Number(
                            product.price || 0
                          ).toLocaleString()}
                        </td>

                        <td>

                          <span
                            className={`badge ${
                              product.stock <= 5
                                ? "bg-danger"
                                : "bg-success"
                            }`}
                          >
                            {product.stock}
                          </span>

                        </td>

                        <td>

                          ⭐{" "}
                          {product.rating || 0}

                        </td>

                        <td className="text-center">

                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            <FaEdit />
                          </Link>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleDelete(product._id)
                            }
                          >
                            <FaTrash />
                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

            {/* Pagination */}

      {!loading && totalPages > 1 && (
        <div className="card border-0 mt-4">
          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center flex-wrap">

              <p className="mb-2 mb-md-0 text-muted">
                Showing{" "}
                <strong>
                  {filteredProducts.length === 0
                    ? 0
                    : indexOfFirstProduct + 1}
                </strong>{" "}
                to{" "}
                <strong>
                  {Math.min(
                    indexOfLastProduct,
                    filteredProducts.length
                  )}
                </strong>{" "}
                of{" "}
                <strong>{filteredProducts.length}</strong>{" "}
                products
              </p>

              <nav>
                <ul className="pagination mb-0">

                  {/* Previous */}

                  <li
                    className={`page-item ${
                      currentPage === 1
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage(currentPage - 1)
                      }
                    >
                      Previous
                    </button>
                  </li>

                  {/* Page Numbers */}

                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1
                          ? "active"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() =>
                          setCurrentPage(index + 1)
                        }
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}

                  {/* Next */}

                  <li
                    className={`page-item ${
                      currentPage === totalPages
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage(currentPage + 1)
                      }
                    >
                      Next
                    </button>
                  </li>

                </ul>
              </nav>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProductList;