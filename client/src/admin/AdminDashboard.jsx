import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
  FaSyncAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { getAllUsers } from "../api/userApi";
import { getProducts } from "../api/productApi";
import { getOrders } from "../api/orderApi";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        getUsers(), getProducts(), getOrders()
      ]);
      setUsers(usersRes.data.users || []);
      setProducts(productsRes.data.products || []);
      setOrders(ordersRes.data.orders || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Unable to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = orders.reduce((s,o)=>s+(o.totalPrice||0),0);

  if (loading) return <div className="container py-5 text-center"><h3>Loading Dashboard...</h3></div>;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <button className="btn btn-outline-primary" onClick={loadDashboard}>
          <FaSyncAlt className="me-2"/>Refresh
        </button>
      </div>

      <div className="row g-4">
        {[
          ["primary","Total Users",users.length,<FaUsers size={45}/>],
          ["success","Total Products",products.length,<FaBoxOpen size={45}/>],
          ["warning","Total Orders",orders.length,<FaShoppingCart size={45}/>],
          ["danger","Total Revenue","₹"+totalRevenue.toLocaleString(),<FaRupeeSign size={45}/>],
        ].map(([bg,title,val,icon],i)=>(
          <div className="col-lg-3 col-md-6" key={i}>
            <div className={`card bg-${bg} text-white shadow border-0`}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div><h6>{title}</h6><h2>{val}</h2></div>{icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-5">
        <div className="col-lg-8">
          <div className="card shadow border-0">
            <div className="card-header bg-dark text-white"><h5 className="mb-0">Recent Orders</h5></div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {orders.length===0 ? (
                    <tr><td colSpan={4} className="text-center py-4">No Orders Found</td></tr>
                  ) : orders.slice(0,8).map(order=>(
                    <tr key={order._id}>
                      <td>{order._id.slice(-8)}</td>
                      <td>{order.user?.name || "Customer"}</td>
                      <td>₹{Number(order.totalPrice||0).toLocaleString()}</td>
                      <td><span className={`badge ${order.orderStatus==="Delivered"?"bg-success":order.orderStatus==="Cancelled"?"bg-danger":order.orderStatus==="Processing"?"bg-warning text-dark":"bg-info"}`}>{order.orderStatus}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white"><h5 className="mb-0">Latest Users</h5></div>
            <div className="list-group list-group-flush">
              {users.length===0 ? (
                <div className="p-4 text-center">No Users Found</div>
              ) : users.slice(0,6).map(user=>(
                <div key={user._id} className="list-group-item">
                  <div className="fw-bold">{user.name}</div>
                  <small className="text-muted">{user.email}</small>
                  <div className="mt-2">
                    <span className={`badge ${user.role==="Admin"?"bg-danger":user.role==="Vendor"?"bg-warning text-dark":"bg-success"}`}>{user.role}</span>
                    {user.isBlocked && <span className="badge bg-dark ms-2">Blocked</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
