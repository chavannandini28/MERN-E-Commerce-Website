import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCart,
  updateQuantity,
  removeCartItem,
  clearUserCart,
} from "../redux/cartSlice";

import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingCart,
} from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();

  const {
    cart,
    loading,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const increaseQty = (item) => {
    dispatch(
      updateQuantity({
        id: item._id,
        quantity: item.quantity + 1,
      })
    );
  };

  const decreaseQty = (item) => {
    if (item.quantity <= 1) return;

    dispatch(
      updateQuantity({
        id: item._id,
        quantity: item.quantity - 1,
      })
    );
  };

  const removeItem = (id) => {
    dispatch(removeCartItem(id));
  };

  const clearCart = () => {
    dispatch(clearUserCart());
  };

  const total =
    cart?.reduce(
      (sum, item) =>
        sum +
        item.product.price * item.quantity,
      0
    ) || 0;

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading Cart...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>
          <FaShoppingCart className="me-2" />
          Shopping Cart
        </h2>

        {cart.length > 0 && (
          <button
            className="btn btn-danger"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        )}

      </div>

      {cart.length === 0 ? (
        <div className="text-center">

          <h3>Your Cart is Empty</h3>

          <Link
            to="/shop"
            className="btn btn-primary mt-3"
          >
            Continue Shopping
          </Link>

        </div>
      ) : (
        <div className="row">

          <div className="col-lg-8">

            {cart.map((item) => (
              <div
                className="card shadow-sm mb-3"
                key={item._id}
              >
                <div className="card-body">

                  <div className="row align-items-center">

                    <div className="col-md-2">

                      <img
                        src={
                          item.product.images?.[0]
                            ?.url
                        }
                        alt={item.product.name}
                        className="img-fluid rounded"
                      />

                    </div>

                    <div className="col-md-4">

                      <h5>
                        {item.product.name}
                      </h5>

                      <p className="text-muted">
                        ₹{item.product.price}
                      </p>

                    </div>

                    <div className="col-md-3 d-flex align-items-center">

                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          decreaseQty(item)
                        }
                      >
                        <FaMinus />
                      </button>

                      <span className="mx-3">
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          increaseQty(item)
                        }
                      >
                        <FaPlus />
                      </button>

                    </div>

                    <div className="col-md-2">

                      <strong>
                        ₹
                        {item.product.price *
                          item.quantity}
                      </strong>

                    </div>

                    <div className="col-md-1">

                      <button
                        className="btn btn-outline-danger"
                        onClick={() =>
                          removeItem(item._id)
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

          <div className="col-lg-4">

            <div className="card shadow">

              <div className="card-body">

                <h4>Order Summary</h4>

                <hr />

                <div className="d-flex justify-content-between">

                  <span>Total</span>

                  <strong>
                    ₹{total}
                  </strong>

                </div>

                <Link
                  to="/checkout"
                  className="btn btn-success w-100 mt-4"
                >
                  Proceed To Checkout
                </Link>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;