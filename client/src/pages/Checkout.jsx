import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../redux/cartSlice";
import { placeOrder } from "../redux/orderSlice";
import { toast } from "react-toastify";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.orders);

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const changeHandler = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  const total =
    cart?.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    ) || 0;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        shippingInfo: shipping,
        orderItems: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalPrice: total,
      };

      await dispatch(placeOrder(orderData)).unwrap();

      toast.success("Order Placed Successfully");

      navigate("/payment-success");
    } catch (error) {
      toast.error(error || "Order Failed");
      navigate("/payment-failed");
    }
  };

  return (
    <div className="container py-5">

      <div className="row">

        {/* Shipping Form */}
        <div className="col-lg-7">

          <div className="card shadow border-0">

            <div className="card-body p-4">

              <h3 className="mb-4">
                Shipping Address
              </h3>

              <form onSubmit={submitHandler}>

                <input
                  className="form-control mb-3"
                  placeholder="Full Name"
                  name="fullName"
                  value={shipping.fullName}
                  onChange={changeHandler}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="Phone Number"
                  name="phone"
                  value={shipping.phone}
                  onChange={changeHandler}
                  required
                />

                <textarea
                  className="form-control mb-3"
                  placeholder="Address"
                  rows="3"
                  name="address"
                  value={shipping.address}
                  onChange={changeHandler}
                  required
                />

                <div className="row">

                  <div className="col-md-4">

                    <input
                      className="form-control mb-3"
                      placeholder="City"
                      name="city"
                      value={shipping.city}
                      onChange={changeHandler}
                      required
                    />

                  </div>

                  <div className="col-md-4">

                    <input
                      className="form-control mb-3"
                      placeholder="State"
                      name="state"
                      value={shipping.state}
                      onChange={changeHandler}
                      required
                    />

                  </div>

                  <div className="col-md-4">

                    <input
                      className="form-control mb-3"
                      placeholder="Pincode"
                      name="pincode"
                      value={shipping.pincode}
                      onChange={changeHandler}
                      required
                    />

                  </div>

                </div>

                <button
                  className="btn btn-success w-100 mt-3"
                  disabled={loading}
                >
                  {loading
                    ? "Placing Order..."
                    : "Place Order"}
                </button>

              </form>

            </div>

          </div>

        </div>

        {/* Order Summary */}
        <div className="col-lg-5">

          <div className="card shadow border-0">

            <div className="card-body">

              <h3 className="mb-4">
                Order Summary
              </h3>

              {cart.map((item) => (

                <div
                  key={item._id}
                  className="d-flex justify-content-between mb-3"
                >

                  <span>
                    {item.product.name} × {item.quantity}
                  </span>

                  <strong>
                    ₹{item.product.price * item.quantity}
                  </strong>

                </div>

              ))}

              <hr />

              <div className="d-flex justify-content-between">

                <h4>Total</h4>

                <h4 className="text-success">
                  ₹{total}
                </h4>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;