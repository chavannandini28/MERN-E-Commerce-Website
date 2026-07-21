import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminLayout = () => {
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">

          <div className="col-md-2 bg-dark text-white min-vh-100 p-3">
            <h4>Admin Panel</h4>

            <hr />

            <ul className="nav flex-column">

              <li className="nav-item">
                Dashboard
              </li>

              <li className="nav-item">
                Products
              </li>

              <li className="nav-item">
                Categories
              </li>

              <li className="nav-item">
                Brands
              </li>

              <li className="nav-item">
                Orders
              </li>

            </ul>

          </div>

          <div className="col-md-10 p-4">
            <Outlet />
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminLayout;