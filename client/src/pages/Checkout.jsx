import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import loadRazorpay from "../utils/loadRazorpay";
import {
  createPaymentOrder,
  verifyPayment,
} from "../api/paymentApi";

const Checkout = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const payNow = async () => {
    const loaded = await loadRazorpay();

    if (!loaded) {
      toast.error("Unable to load Razorpay");
      return;
    }

    try {
      const { data } = await createPaymentOrder(address);

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "MERN Ecommerce",
        description: "Order Payment",
        order_id: data.order.id,

        handler: async function (response) {
          try {
            const verify = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              shippingAddress: address,
            });

            toast.success("Payment Successful");

            navigate("/payment-success", {
              state: verify.data,
            });

          } catch {
            navigate("/payment-failed");
          }
        },

        prefill: {
          name: address.fullName,
          contact: address.phone,
        },

        theme: {
          color: "#0d6efd",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();

    } catch {
      toast.error("Payment initialization failed");
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-7">

          <div className="card shadow p-4">

            <h2 className="mb-4">
              Shipping Address
            </h2>

            <input
              className="form-control mb-3"
              placeholder="Full Name"
              name="fullName"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              placeholder="Phone"
              name="phone"
              onChange={handleChange}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Address"
              name="address"
              rows="3"
              onChange={handleChange}
            />

            <div className="row">

              <div className="col">
                <input
                  className="form-control"
                  placeholder="City"
                  name="city"
                  onChange={handleChange}
                />
              </div>

              <div className="col">
                <input
                  className="form-control"
                  placeholder="State"
                  name="state"
                  onChange={handleChange}
                />
              </div>

            </div>

            <input
              className="form-control mt-3"
              placeholder="Pincode"
              name="pincode"
              onChange={handleChange}
            />

            <button
              className="btn btn-success w-100 mt-4"
              onClick={payNow}
            >
              Pay Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;