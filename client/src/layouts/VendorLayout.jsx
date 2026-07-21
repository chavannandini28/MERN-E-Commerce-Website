import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const VendorLayout = () => {
  return (
    <>
      <Navbar />

      <div className="container-fluid">

        <div className="row">

          <div className="col-md-2 bg-primary text-white min-vh-100 p-3">

            <h4>Vendor Panel</h4>

            <hr />

            <ul className="nav flex-column">

              <li>Dashboard</li>

              <li>Products</li>

              <li>Orders</li>

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

export default VendorLayout;