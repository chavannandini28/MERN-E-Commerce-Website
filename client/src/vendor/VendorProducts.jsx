import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import {
  getVendorProducts,
  deleteProduct,
} from "../api/productApi";

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const { data } = await getVendorProducts();

      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      toast.success("Product deleted successfully");

      loadProducts();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete product");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Products</h2>

        <Link
          to="/vendor/add-product"
          className="btn btn-primary"
        >
          + Add Product
        </Link>
      </div>

      <div className="card shadow border-0">
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
                <th>Status</th>
                <th width="180">Action</th>
              </tr>
            </thead>

            <tbody>

              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>

                    <td>
                      <img
                        src={
                          product.images?.[0]?.url ||
                          product.image ||
                          "https://via.placeholder.com/60"
                        }
                        alt={product.name}
                        width="60"
                        height="60"
                        className="rounded"
                        style={{ objectFit: "cover" }}
                      />
                    </td>

                    <td>{product.name}</td>

                    <td>
                      {product.category?.name || "-"}
                    </td>

                    <td>
                      {product.brand?.name || "-"}
                    </td>

                    <td className="fw-bold text-success">
                      ₹ {product.price}
                    </td>

                    <td>{product.stock}</td>

                    <td>
                      {product.stock > 0 ? (
                        <span className="badge bg-success">
                          In Stock
                        </span>
                      ) : (
                        <span className="badge bg-danger">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    <td>

                      <Link
                        to={`/vendor/edit-product/${product._id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(product._id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No Products Found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default VendorProducts;