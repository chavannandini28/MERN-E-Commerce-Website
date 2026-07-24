import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBalanceScale,
  FaShoppingCart,
  FaHeart,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { getProducts } from "../api/productApi";
import { addToCart } from "../api/cartApi";
import { addToWishlist } from "../api/wishlistApi";

const CompareProducts = () => {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);

  const [compareProducts, setCompareProducts] =
    useState([]);

  useEffect(() => {
    loadProducts();

    const saved =
      JSON.parse(
        localStorage.getItem("compareProducts")
      ) || [];

    setCompareProducts(saved);
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const { data } = await getProducts();

      setProducts(data.products || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  const removeCompare = (id) => {
    const updated = compareProducts.filter(
      (item) => item._id !== id
    );

    setCompareProducts(updated);

    localStorage.setItem(
      "compareProducts",
      JSON.stringify(updated)
    );

    toast.success(
      "Product removed from comparison"
    );
  };

  const addCartHandler = async (id) => {
    try {
      await addToCart({
        productId: id,
        quantity: 1,
      });

      toast.success("Added to cart");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to add to cart"
      );
    }
  };

  const wishlistHandler = async (id) => {
    try {
      await addToWishlist({
        productId: id,
      });

      toast.success("Added to wishlist");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to add to wishlist"
      );
    }
  };

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">

          <FaBalanceScale className="me-2 text-primary" />

          Compare Products

        </h2>

        <span className="badge bg-primary fs-6">

          {compareProducts.length} Selected

        </span>

      </div>

            {loading ? (

        <div className="text-center py-5">

          <div className="spinner-border text-primary" />

        </div>

      ) : compareProducts.length === 0 ? (

        <div className="card shadow border-0">

          <div className="card-body text-center py-5">

            <FaBalanceScale
              size={70}
              className="text-secondary mb-3"
            />

            <h3>No Products Selected</h3>

            <p className="text-muted">
              Add products to compare from the
              product page.
            </p>

            <Link
              to="/shop"
              className="btn btn-primary mt-2"
            >
              Browse Products
            </Link>

          </div>

        </div>

      ) : (

        <div className="table-responsive shadow rounded">

          <table className="table table-bordered align-middle">

            <tbody>

              {/* Product Image */}

              <tr>

                <th width="220">
                  Product
                </th>

                {compareProducts.map((product) => (

                  <td
                    key={product._id}
                    className="text-center"
                  >

                    <img
                      src={
                        product.thumbnail?.url ||
                        product.images?.[0]?.url ||
                        "https://via.placeholder.com/220"
                      }
                      alt={product.title}
                      className="img-fluid rounded mb-3"
                      style={{
                        height: 180,
                        objectFit: "contain",
                      }}
                    />

                    <h5 className="fw-bold">

                      {product.title}

                    </h5>

                  </td>

                ))}

              </tr>

              {/* Price */}

              <tr>

                <th>Price</th>

                {compareProducts.map((product) => (

                  <td
                    key={product._id}
                    className="text-center fw-bold text-success fs-5"
                  >
                    ₹{product.price}
                  </td>

                ))}

              </tr>

              {/* Brand */}

              <tr>

                <th>Brand</th>

                {compareProducts.map((product) => (

                  <td
                    key={product._id}
                    className="text-center"
                  >
                    {product.brand?.name || "-"}
                  </td>

                ))}

              </tr>

              {/* Category */}

              <tr>

                <th>Category</th>

                {compareProducts.map((product) => (

                  <td
                    key={product._id}
                    className="text-center"
                  >
                    {product.category?.name || "-"}
                  </td>

                ))}

              </tr>

              {/* Rating */}

              <tr>

                <th>Rating</th>

                {compareProducts.map((product) => (

                  <td
                    key={product._id}
                    className="text-center"
                  >

                    ⭐ {product.rating || 0}

                  </td>

                ))}

              </tr>

              {/* Stock */}

              <tr>

                <th>Stock</th>

                {compareProducts.map((product) => (

                  <td
                    key={product._id}
                    className="text-center"
                  >

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

                ))}

              </tr>

              {/* Description */}

              <tr>

                <th>Description</th>

                {compareProducts.map((product) => (

                  <td
                    key={product._id}
                  >

                    {product.description ||
                      "No description available."}

                  </td>

                ))}

              </tr>

              {/* Actions */}

              <tr>

                <th>Actions</th>

                {compareProducts.map((product) => (

                  <td
                    key={product._id}
                    className="text-center"
                  >

                    <div className="d-grid gap-2">

                      <button
                        className="btn btn-success"
                        onClick={() =>
                          addCartHandler(product._id)
                        }
                      >
                        <FaShoppingCart className="me-2" />

                        Add To Cart

                      </button>

                      <button
                        className="btn btn-outline-danger"
                        onClick={() =>
                          wishlistHandler(product._id)
                        }
                      >
                        <FaHeart className="me-2" />

                        Wishlist

                      </button>

                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          removeCompare(product._id)
                        }
                      >
                        <FaTrash className="me-2" />

                        Remove

                      </button>

                    </div>

                  </td>

                ))}

              </tr>

            </tbody>

          </table>

        </div>

      )}

          </div>
  );
};

export default CompareProducts;