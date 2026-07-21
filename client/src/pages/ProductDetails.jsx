import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaStar, FaTruck } from "react-icons/fa";
import { getProductById } from "../api/productApi";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [qty, setQty] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const { data } = await getProductById(id);

      setProduct(data.product);

      setSelectedImage(
        data.product.images?.[0]?.url || ""
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) return <Loader />;

  return (
    <div className="container py-5">

      <div className="row g-5">

        {/* Images */}

        <div className="col-lg-6">

          <div className="card shadow border-0 rounded-4">

            <img
              src={selectedImage}
              alt={product.name}
              className="img-fluid rounded-4"
              style={{
                height: "500px",
                objectFit: "cover",
              }}
            />

          </div>

          <div className="d-flex mt-3 gap-2 flex-wrap">

            {product.images?.map((img) => (
              <img
                key={img.url}
                src={img.url}
                alt=""
                onClick={() => setSelectedImage(img.url)}
                style={{
                  width: 90,
                  height: 90,
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: 12,
                  border:
                    selectedImage === img.url
                      ? "3px solid #0d6efd"
                      : "2px solid #ddd",
                }}
              />
            ))}

          </div>

        </div>

        {/* Details */}

        <div className="col-lg-6">

          <span className="badge bg-primary mb-3">
            {product.category?.name || "Category"}
          </span>

          <h1 className="fw-bold">
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

          <h2 className="text-success fw-bold mb-4">
            ₹{product.price}
          </h2>

          <p className="text-secondary fs-5">
            {product.description}
          </p>

          <div className="mb-3">

            <strong>Brand :</strong>{" "}
            {product.brand?.name || "Brand"}

          </div>

          <div className="mb-4">

            <strong>Status :</strong>

            <span className="text-success ms-2">
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

            <span className="mx-3 fs-5">
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

          <div className="d-flex gap-3 flex-wrap">

            <button className="btn btn-primary btn-lg">

              <FaShoppingCart className="me-2" />

              Add To Cart

            </button>

            <button className="btn btn-outline-danger btn-lg">

              <FaHeart className="me-2" />

              Wishlist

            </button>

          </div>

          <hr className="my-5" />

          <div className="row">

            <div className="col-md-6">

              <div className="card border-0 shadow-sm">

                <div className="card-body">

                  <FaTruck
                    size={35}
                    className="text-primary mb-3"
                  />

                  <h5>Free Shipping</h5>

                  <small>
                    Delivery within 3-5 days
                  </small>

                </div>

              </div>

            </div>

            <div className="col-md-6">

              <div className="card border-0 shadow-sm">

                <div className="card-body">

                  <FaShoppingCart
                    size={35}
                    className="text-success mb-3"
                  />

                  <h5>Easy Returns</h5>

                  <small>
                    7 Days Replacement
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

        <div className="card shadow-sm border-0">

          <div className="card-body">

            <h5>⭐⭐⭐⭐⭐ Amazing Product</h5>

            <p className="text-muted">
              Excellent quality, premium packaging and
              fast delivery.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;