import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getMyCart,
  removeCartItem,
  updateQuantity,
  clearCart,
} from "../api/cartApi";

import CartItem from "../components/CartItem";
import Loader from "../components/Loader";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      setLoading(true);

      const { data } = await getMyCart();

      setCart(data.cart || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const increase = async (item) => {
    try {
      await updateQuantity(item._id, item.quantity + 1);
      loadCart();
    } catch {
      toast.error("Unable to update quantity");
    }
  };

  const decrease = async (item) => {
    if (item.quantity <= 1) return;

    try {
      await updateQuantity(item._id, item.quantity - 1);
      loadCart();
    } catch {
      toast.error("Unable to update quantity");
    }
  };

  const remove = async (id) => {
    try {
      await removeCartItem(id);
      toast.success("Item removed from cart");
      loadCart();
    } catch {
      toast.error("Unable to remove item");
    }
  };

  const clear = async () => {
    try {
      await clearCart();
      toast.success("Cart cleared");
      loadCart();
    } catch {
      toast.error("Unable to clear cart");
    }
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + (item.product?.price || 0) * item.quantity,
    0
  );

  if (loading) return <Loader />;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">🛒 My Cart</h2>

        {cart.length > 0 && (
          <button
            className="btn btn-outline-danger"
            onClick={clear}
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <h3>Your Cart is Empty</h3>

          <p className="text-muted">
            Looks like you haven't added anything yet.
          </p>

          <Link
            to="/shop"
            className="btn btn-primary"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                increase={increase}
                decrease={decrease}
                remove={remove}
              />
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card shadow border-0 rounded-4">
              <div className="card-body">
                <h4 className="fw-bold mb-3">
                  Order Summary
                </h4>

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>Total Items</span>
                  <strong>{cart.length}</strong>
                </div>

                <div className="d-flex justify-content-between mb-4">
                  <span>Total Price</span>
                  <strong className="text-success">
                    ₹ {total.toFixed(2)}
                  </strong>
                </div>

                <Link
                  to="/checkout"
                  className="btn btn-success w-100"
                >
                  Proceed To Checkout
                </Link>

                <Link
                  to="/shop"
                  className="btn btn-outline-dark w-100 mt-2"
                >
                  Continue Shopping
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