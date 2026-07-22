import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../redux/orderSlice";

import {
  FaBox,
  FaEye,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTruck,
} from "react-icons/fa";

const MyOrders = () => {
  const dispatch = useDispatch();

  const {
    orders,
    loading,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading Orders...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="d-flex align-items-center mb-4">

        <FaBox
          className="text-primary me-2"
          size={28}
        />

        <h2 className="mb-0">
          My Orders
        </h2>

      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5">

          <h3>No Orders Found</h3>

          <Link
            to="/shop"
            className="btn btn-primary mt-3"
          >
            Start Shopping
          </Link>

        </div>
      ) : (
        <div className="row">

          {orders.map((order) => (

            <div
              key={order._id}
              className="col-lg-6 mb-4"
            >

              <div className="card shadow border-0 h-100">

                <div className="card-body">

                  <div className="d-flex justify-content-between">

                    <h5>
                      Order #{order._id.slice(-6)}
                    </h5>

                    <span
                      className={`badge ${
                        order.orderStatus === "Delivered"
                          ? "bg-success"
                          : order.orderStatus === "Cancelled"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.orderStatus}
                    </span>

                  </div>

                  <hr />

                  <p>
                    <FaCalendarAlt className="me-2" />
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    <FaMoneyBillWave className="me-2 text-success" />
                    ₹{order.totalPrice}
                  </p>

                  <p>
                    <FaTruck className="me-2 text-primary" />
                    {order.orderItems?.length} Item(s)
                  </p>

                  <Link
                    to={`/order/${order._id}`}
                    className="btn btn-primary w-100"
                  >
                    <FaEye className="me-2" />
                    View Details
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default MyOrders;