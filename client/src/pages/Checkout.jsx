import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaTruck,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { fetchCart } from "../redux/cartSlice";
import {
  createOrder,
  verifyPayment,
  cashOnDelivery,
} from "../api/paymentApi";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, loading } = useSelector(
    (state) => state.cart
  );

  // Shipping Address
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [placingOrder, setPlacingOrder] = useState(false);

  // Load Cart
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Handle Input
  const changeHandler = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  // Price Details
  const subtotal = cart?.subtotal || 0;
  const shipping = cart?.shippingCharge || 0;
  const tax = cart?.tax || 0;
  const discount = cart?.discount || 0;
  const total = cart?.totalAmount || 0;

  // Place Order
  const placeOrderHandler = async () => {
    try {
      if (
        !shippingAddress.fullName ||
        !shippingAddress.phone ||
        !shippingAddress.address ||
        !shippingAddress.city ||
        !shippingAddress.state ||
        !shippingAddress.pincode
      ) {
        alert("Please fill all shipping details.");
        return;
      }

      setPlacingOrder(true);

      // Cash On Delivery
      if (paymentMethod === "COD") {
        const { data } = await cashOnDelivery({
          shippingAddress,
        });

        if (data.success) {
          alert("Order Placed Successfully");
          navigate("/payment-success");
        }

        return;
      }

      // Razorpay Order
      const { data } = await createOrder();

      if (!data.success) {
        alert("Unable to create payment.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Nandini Shop",
        description: "Order Payment",
        order_id: data.order.id,

        handler: async function (response) {
          const verify = await verifyPayment({
            razorpay_order_id:
              response.razorpay_order_id,
            razorpay_payment_id:
              response.razorpay_payment_id,
            razorpay_signature:
              response.razorpay_signature,
            shippingAddress,
          });

          if (verify.data.success) {
            alert("Payment Successful");
            navigate("/payment-success");
          } else {
            navigate("/payment-failed");
          }
        },

        theme: {
          color: "#0d6efd",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading Checkout...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">

        {/* Shipping Address */}
        <div className="col-lg-8">
          <div className="card shadow border-0 mb-4">
            <div className="card-body">

              <h3 className="mb-4">
                <FaMapMarkerAlt className="me-2 text-primary" />
                Shipping Address
              </h3>

              <div className="row">

                                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    value={shippingAddress.fullName}
                    onChange={changeHandler}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Mobile Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={shippingAddress.phone}
                    onChange={changeHandler}
                  />
                </div>

                <div className="col-12 mb-3">
                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    rows="3"
                    name="address"
                    className="form-control"
                    value={shippingAddress.address}
                    onChange={changeHandler}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={shippingAddress.city}
                    onChange={changeHandler}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    value={shippingAddress.state}
                    onChange={changeHandler}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    className="form-control"
                    value={shippingAddress.pincode}
                    onChange={changeHandler}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ===============================
            Order Summary
        ================================ */}

        <div className="col-lg-4">

          <div
            className="card shadow border-0 sticky-top"
            style={{ top: "100px" }}
          >

            <div className="card-body">

              <h3 className="mb-4">
                Order Summary
              </h3>

              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >

                {cart?.items?.length > 0 ? (

                  cart.items.map((item) => (

                    <div
                      key={item._id}
                      className="d-flex justify-content-between align-items-center mb-3"
                    >

                      <div>
                        <h6 className="mb-1">
                          {item.product?.title}
                        </h6>

                        <small className="text-muted">
                          Qty : {item.quantity}
                        </small>
                      </div>

                      <strong>
                        ₹
                        {(item.price * item.quantity).toFixed(2)}
                      </strong>

                    </div>

                  ))

                ) : (

                  <p className="text-center text-muted">
                    Cart is Empty
                  </p>

                )}

              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <strong>₹{subtotal.toFixed(2)}</strong>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>Shipping</span>
                <strong>₹{shipping.toFixed(2)}</strong>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>GST</span>
                <strong>₹{tax.toFixed(2)}</strong>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>Discount</span>
                <strong className="text-success">
                  - ₹{discount.toFixed(2)}
                </strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <h5>Total</h5>
                <h4 className="text-success">
                  ₹{total.toFixed(2)}
                </h4>
              </div>

              <hr />
              
                            {/* Payment Method */}

              <h5 className="mb-3">
                <FaMoneyBillWave className="me-2" />
                Payment Method
              </h5>

              <div className="form-check mb-2">
                <input
                  type="radio"
                  className="form-check-input"
                  name="paymentMethod"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />

                <label className="form-check-label">
                  Cash On Delivery
                </label>
              </div>

              <div className="form-check mb-4">
                <input
                  type="radio"
                  className="form-check-input"
                  name="paymentMethod"
                  checked={paymentMethod === "Razorpay"}
                  onChange={() => setPaymentMethod("Razorpay")}
                />

                <label className="form-check-label">
                  <FaCreditCard className="me-2" />
                  Razorpay
                </label>
              </div>

              <button
                className="btn btn-primary w-100 py-3"
                onClick={placeOrderHandler}
                disabled={
                  placingOrder ||
                  cart?.items?.length === 0
                }
              >
                <FaTruck className="me-2" />

                {placingOrder
                  ? "Processing..."
                  : "Place Order"}
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;