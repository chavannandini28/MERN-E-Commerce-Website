import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import { toast } from "react-toastify";

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
      const { data } = await getProducts();

      const list = data.products || data || [];

      setProducts(list);
      setFilteredProducts(list);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value;

    setKeyword(value);

    const result = products.filter((product) =>
      product.name
        ?.toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredProducts(result);
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);

      toast.success("Product deleted");

      loadProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h3>Loading Products...</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Products</h2>

        <Link
          to="/admin/products/add"
          className="btn btn-primary"
        >
          <FaPlus className="me-2" />
          Add Product
        </Link>

      </div>

      <div className="input-group mb-4">

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

      <div className="card shadow">

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>

                <th>Image</th>

                <th>Name</th>

                <th>Price</th>

                <th>Stock</th>

                <th>Category</th>

                <th>Brand</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.map((product) => (

                <tr key={product._id}>

                  <td>

                    <img
                      src={
                        product.thumbnail?.url ||
                        product.images?.[0]?.url
                      }
                      alt={product.name}
                      width="60"
                      height="60"
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />

                  </td>

                  <td>{product.name}</td>

                  <td>₹{product.price}</td>

                  <td>{product.stock}</td>

                  <td>
                    {product.category?.name}
                  </td>

                  <td>
                    {product.brand?.name}
                  </td>

                  <td>

                    <Link
                      to={`/admin/products/edit/${product._id}`}
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

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ProductList;