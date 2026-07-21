import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import OrderCard from "../components/OrderCard";

import { getMyOrders } from "../api/orderApi";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const { data } = await getMyOrders();

      setOrders(data.orders || []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container py-5">

      <h2 className="mb-4 fw-bold">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center">

          <h4>No Orders Found</h4>

          <p className="text-muted">
            Start shopping to place your first order.
          </p>

        </div>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
          />
        ))
      )}

    </div>
  );
};

export default MyOrders;