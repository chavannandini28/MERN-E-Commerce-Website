import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeWishlistItem,
} from "../redux/wishlistSlice";
import { addItemToCart } from "../redux/cartSlice";

import {
  FaHeart,
  FaTrash,
  FaShoppingCart,
} from "react-icons/fa";

const Wishlist = () => {
  const dispatch = useDispatch();

  const {
    wishlist,
    loading,
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const removeItem = (id) => {
    dispatch(removeWishlistItem(id));
  };

  const moveToCart = (item) => {
    dispatch(
      addItemToCart({
        productId: item.product._id,
        quantity: 1,
      })
    );

    dispatch(removeWishlistItem(item._id));
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading Wishlist...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="d-flex align-items-center mb-4">

        <FaHeart
          className="text-danger me-2"
          size={28}
        />

        <h2 className="mb-0">
          My Wishlist
        </h2>

      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-5">

          <h3>No Products In Wishlist</h3>

          <Link
            to="/shop"
            className="btn btn-primary mt-3"
          >
            Continue Shopping
          </Link>

        </div>
      ) : (
        <div className="row">

          {wishlist.map((item) => (

            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
              key={item._id}
            >

              <div className="card shadow border-0 h-100">

                <img
                  src={
                    item.product.images?.[0]?.url
                  }
                  className="card-img-top"
                  alt={item.product.name}
                  style={{
                    height: 240,
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">

                  <h5>
                    {item.product.name}
                  </h5>

                  <p className="text-muted">
                    {item.product.brand?.name}
                  </p>

                  <h4 className="text-success">
                    ₹{item.product.price}
                  </h4>

                </div>

                <div className="card-footer bg-white border-0">

                  <Link
                    to={`/product/${item.product._id}`}
                    className="btn btn-outline-primary w-100 mb-2"
                  >
                    View Product
                  </Link>

                  <button
                    className="btn btn-success w-100 mb-2"
                    onClick={() =>
                      moveToCart(item)
                    }
                  >
                    <FaShoppingCart className="me-2" />

                    Add To Cart

                  </button>

                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() =>
                      removeItem(item._id)
                    }
                  >
                    <FaTrash className="me-2" />

                    Remove

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default Wishlist;