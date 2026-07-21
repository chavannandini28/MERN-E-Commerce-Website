import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems =
    useSelector((state) => state.cart?.cartItems) || [];

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-5">

      <h2 className="fw-bold mb-4">
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">

          <FaShoppingBag
            size={80}
            className="text-secondary mb-4"
          />

          <h3>Your Cart is Empty</h3>

          <p className="text-muted">
            Looks like you haven't added any products.
          </p>

          <Link
            to="/shop"
            className="btn btn-primary px-4"
          >
            Continue Shopping
          </Link>

        </div>
      ) : (
        <div className="row">

          {/* Cart Items */}

          <div className="col-lg-8">

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="card mb-4 border-0 shadow-sm rounded-4"
              >
                <div className="card-body">

                  <div className="row align-items-center">

                    <div className="col-md-2">

                      <img
                        src={
                          item.images?.[0]?.url ||
                          item.image
                        }
                        alt={item.name}
                        className="img-fluid rounded"
                      />

                    </div>

                    <div className="col-md-4">

                      <h5>{item.name}</h5>

                      <small className="text-muted">
                        ₹{item.price}
                      </small>

                    </div>

                    <div className="col-md-3">

                      <div className="d-flex align-items-center">

                        <button className="btn btn-outline-secondary">
                          <FaMinus />
                        </button>

                        <span className="mx-3 fw-bold">
                          {item.quantity}
                        </span>

                        <button className="btn btn-outline-secondary">
                          <FaPlus />
                        </button>

                      </div>

                    </div>

                    <div className="col-md-2 text-end">

                      <h5 className="text-success">
                        ₹
                        {item.price *
                          item.quantity}
                      </h5>

                    </div>

                    <div className="col-md-1 text-end">

                      <button className="btn btn-outline-danger">

                        <FaTrash />

                      </button>

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Order Summary */}

          <div className="col-lg-4">

            <div className="card shadow border-0 rounded-4">

              <div className="card-body">

                <h4 className="fw-bold mb-4">
                  Order Summary
                </h4>

                <div className="d-flex justify-content-between mb-3">

                  <span>
                    Products
                  </span>

                  <span>
                    {cartItems.length}
                  </span>

                </div>

                <div className="d-flex justify-content-between mb-3">

                  <span>Shipping</span>

                  <span className="text-success">
                    FREE
                  </span>

                </div>

                <hr />

                <div className="d-flex justify-content-between">

                  <h5>Total</h5>

                  <h4 className="text-primary">
                    ₹{total}
                  </h4>

                </div>

                <Link
                  to="/checkout"
                  className="btn btn-primary w-100 mt-4"
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