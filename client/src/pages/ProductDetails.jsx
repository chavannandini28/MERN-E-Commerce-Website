import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaTruck,
} from "react-icons/fa";

import { getProductById } from "../api/productApi";
import Loader from "../components/Loader";
import ProductCarousel from "../components/ProductCarousel";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [qty, setQty] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const { data } = await getProductById(id);

      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) return <Loader />;

  return (
    <div className="container py-5">

      <div className="row g-5">

        {/* Product Images */}

        <div className="col-lg-6">

          <ProductCarousel
            images={product.images || []}
          />

        </div>

        {/* Product Details */}

        <div className="col-lg-6">

          <span className="badge bg-primary mb-3">
            {product.category?.name || "Category"}
          </span>

          <h1 className="fw-bold mb-3">
            {product.name}
          </h1>

          <div className="d-flex align-items-center mb-3">

            <FaStar className="text-warning me-1" />
            <FaStar className="text-warning me-1" />
            <FaStar className="text-warning me-1" />
            <FaStar className="text-warning me-1" />
            <FaStar className="text-warning me-3" />

            <span className="text-muted">
              4.8 (120 Reviews)
            </span>

          </div>

          <h2 className="fw-bold text-success mb-4">
            ₹{product.price}
          </h2>

          <p className="text-secondary">
            {product.description}
          </p>

          <div className="mb-2">
            <strong>Brand : </strong>
            {product.brand?.name || "N/A"}
          </div>

          <div className="mb-4">
            <strong>Status : </strong>

            <span className="badge bg-success ms-2">
              In Stock
            </span>
          </div>

          {/* Quantity */}

          <div className="d-flex align-items-center mb-4">

            <strong className="me-3">
              Quantity
            </strong>

            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                qty > 1 && setQty(qty - 1)
              }
            >
              -
            </button>

            <span className="mx-3 fw-bold">
              {qty}
            </span>

            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                setQty(qty + 1)
              }
            >
              +
            </button>

          </div>

          {/* Buttons */}

          <div className="d-flex flex-wrap gap-3 mb-5">

            <button className="btn btn-primary btn-lg">

              <FaShoppingCart className="me-2" />

              Add To Cart

            </button>

            <button className="btn btn-outline-danger btn-lg">

              <FaHeart className="me-2" />

              Wishlist

            </button>

          </div>

          {/* Features */}

          <div className="row g-3">

            <div className="col-md-6">

              <div className="card shadow-sm border-0">

                <div className="card-body text-center">

                  <FaTruck
                    size={40}
                    className="text-primary mb-3"
                  />

                  <h5>Free Delivery</h5>

                  <small className="text-muted">
                    Delivery within 3-5 business days
                  </small>

                </div>

              </div>

            </div>

            <div className="col-md-6">

              <div className="card shadow-sm border-0">

                <div className="card-body text-center">

                  <FaShoppingCart
                    size={40}
                    className="text-success mb-3"
                  />

                  <h5>Easy Returns</h5>

                  <small className="text-muted">
                    7 Days Replacement Policy
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Reviews */}

      <div className="mt-5">

        <h3 className="fw-bold mb-4">
          Customer Reviews
        </h3>

        <div className="card border-0 shadow">

          <div className="card-body">

            <h5>
              ⭐⭐⭐⭐⭐ Amazing Product
            </h5>

            <p className="text-muted mb-0">
              Excellent quality, premium packaging,
              and fast delivery. Highly recommended!
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;