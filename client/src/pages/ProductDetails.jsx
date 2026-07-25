import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaUndo,
  FaShieldAlt,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { getProductById } from "../api/productApi";
import { addToCart } from "../api/cartApi";
import { addToWishlist } from "../api/wishlistApi";

import Loader from "../components/Loader";
import ProductCarousel from "../components/ProductCarousel";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const { data } = await getProductById(id);

      setProduct(data.product);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load product");
    } finally {
      setLoading(false);
    }
  };

  const addCartHandler = async () => {
    try {
      await addToCart({
        productId: product._id,
        quantity: qty,
      });

      toast.success("Added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to add cart");
    }
  };

  const wishlistHandler = async () => {
    try {
      await addToWishlist(product._id);

      toast.success("Added to wishlist");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to add wishlist");
    }
  };

  if (loading) return <Loader />;

  if (!product)
    return (
      <div className="container py-5 text-center">
        <h3>Product not found</h3>
      </div>
    );

  const images =
    product.images?.length > 0
      ? product.images
      : [
          {
            url:
              product.thumbnail?.url ||
              "https://via.placeholder.com/600x600?text=No+Image",
          },
        ];

  return (
    <div className="container py-5">

      <div className="row g-5">

        {/* Images */}

        <div className="col-lg-6">
          <ProductCarousel images={images} />
        </div>

        {/* Details */}

        <div className="col-lg-6">

          <span className="badge bg-primary mb-3">
            {product.category?.name || "Category"}
          </span>

          <h2 className="fw-bold">
            {product.title}
          </h2>

          <div className="mb-3">

            {[1,2,3,4,5].map((i)=>(
              <FaStar
                key={i}
                className={
                  i<=Math.round(product.rating)
                    ? "text-warning me-1"
                    : "text-secondary me-1"
                }
              />
            ))}

            <span className="ms-2 text-muted">
              ({product.numReviews} Reviews)
            </span>

          </div>

          <div className="mb-3">

            {product.discountPrice > 0 ? (
              <>
                <h2 className="text-success fw-bold">

                  ₹{product.discountPrice}

                  <small className="text-decoration-line-through text-muted ms-3">

                    ₹{product.price}

                  </small>

                </h2>

                <span className="badge bg-danger">
                  {product.discountPercentage}% OFF
                </span>
              </>
            ) : (
              <h2 className="text-success fw-bold">
                ₹{product.price}
              </h2>
            )}

          </div>

          <p className="text-secondary">
            {product.description}
          </p>

          <table className="table">

            <tbody>

              <tr>
                <th>Brand</th>
                <td>{product.brand?.name}</td>
              </tr>

              <tr>
                <th>SKU</th>
                <td>{product.sku}</td>
              </tr>

              <tr>
                <th>Stock</th>

                <td>

                  {product.stock > 0 ? (
                    <span className="badge bg-success">
                      {product.stock} Available
                    </span>
                  ) : (
                    <span className="badge bg-danger">
                      Out Of Stock
                    </span>
                  )}

                </td>

              </tr>

              <tr>
                <th>Warranty</th>
                <td>{product.warranty || "No Warranty"}</td>
              </tr>

              <tr>
                <th>Shipping</th>

                <td>

                  {product.freeShipping
                    ? "Free Shipping"
                    : `₹${product.shippingCharge}`}

                </td>

              </tr>

            </tbody>

          </table>

          <div className="d-flex align-items-center mb-4">

            <strong className="me-3">
              Quantity
            </strong>

            <button
              className="btn btn-outline-secondary"
              disabled={qty === 1}
              onClick={() => setQty(qty - 1)}
            >
              -
            </button>

            <span className="mx-3 fw-bold">
              {qty}
            </span>

            <button
              className="btn btn-outline-secondary"
              disabled={qty >= product.stock}
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>

          </div>

          <div className="d-flex gap-3 flex-wrap">

            <button
              className="btn btn-primary btn-lg"
              onClick={addCartHandler}
              disabled={product.stock === 0}
            >
              <FaShoppingCart className="me-2"/>
              Add To Cart
            </button>

            <button
              className="btn btn-outline-danger btn-lg"
              onClick={wishlistHandler}
            >
              <FaHeart className="me-2"/>
              Wishlist
            </button>

          </div>

          <hr />

          <div className="row text-center mt-4">

            <div className="col-md-4">

              <FaTruck
                className="text-primary mb-2"
                size={35}
              />

              <h6>Fast Delivery</h6>

            </div>

            <div className="col-md-4">

              <FaUndo
                className="text-success mb-2"
                size={35}
              />

              <h6>Easy Return</h6>

            </div>

            <div className="col-md-4">

              <FaShieldAlt
                className="text-warning mb-2"
                size={35}
              />

              <h6>Secure Payment</h6>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-5">

        <h3 className="fw-bold mb-3">
          Product Specifications
        </h3>

        <div className="card shadow-sm">

          <div className="card-body">

            {product.specifications?.length > 0 ? (
              <table className="table">

                <tbody>

                  {product.specifications.map((item,index)=>(
                    <tr key={index}>
                      <th>{item.key}</th>
                      <td>{item.value}</td>
                    </tr>
                  ))}

                </tbody>

              </table>
            ) : (
              <p className="text-muted">
                No specifications available.
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;