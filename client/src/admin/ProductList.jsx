import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaBoxOpen,
} from "react-icons/fa";

import {
  getProducts,
  deleteProduct,
} from "../api/productApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const { data } = await getProducts();

      const list = data.products || data || [];

      setProducts(list);
      setFilteredProducts(list);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value;

    setKeyword(value);

    const result = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(result);
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);

      loadProducts();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            <FaBoxOpen className="me-2 text-primary" />
            Product Management
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

      <div className="card border-0 shadow">

        <div className="card-body">

          <div className="row mb-4">

            <div className="col-md-5">

              <div className="input-group">

                <span className="input-group-text">
                  <FaSearch />
                </span>

                <input
                  className="form-control"
                  placeholder="Search Product..."
                  value={keyword}
                  onChange={searchHandler}
                />

              </div>

            </div>

          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>

                  <th>Image</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th width="170">Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product._id}>

                      <td>

                        <img
                          src={
                            product.images?.[0]?.url ||
                            "https://via.placeholder.com/70"
                          }
                          alt={product.name}
                          width="70"
                          height="70"
                          style={{
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />

                      </td>

                      <td className="fw-semibold">
                        {product.name}
                      </td>

                      <td>
                        {product.brand?.name || "-"}
                      </td>

                      <td>
                        {product.category?.name || "-"}
                      </td>

                      <td className="fw-bold text-success">
                        ₹{product.price}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            product.stock > 0
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {product.stock}
                        </span>

                      </td>

                      <td>

                        <Link
                          to={`/admin/edit-product/${product._id}`}
                          className="btn btn-warning btn-sm me-2"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteHandler(product._id)
                          }
                        >
                          <FaTrash />
                        </button>

                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>

                    <td
                      colSpan="7"
                      className="text-center py-5"
                    >
                      No Products Found
                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductList;