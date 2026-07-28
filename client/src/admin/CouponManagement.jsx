import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import Loader from "../components/Loader";

import {
  getCoupons,
  deleteCoupon,
} from "../api/couponApi";

const CouponManagement = () => {

  const [loading, setLoading] = useState(true);

  const [coupons, setCoupons] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {

    try {

      setLoading(true);

      const { data } = await getCoupons();

      setCoupons(data.coupons || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load coupons"
      );

    } finally {

      setLoading(false);

    }

  };

  const deleteHandler = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this coupon?"
    );

    if (!confirmDelete) return;

    try {

      await deleteCoupon(id);

      toast.success(
        "Coupon deleted successfully"
      );

      loadCoupons();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );

    }

  };

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  return (

    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">

          Coupon Management

        </h2>

        <Link
          to="/admin/coupons/add"
          className="btn btn-primary"
        >

          <FaPlus className="me-2" />

          Add Coupon

        </Link>

      </div>

      <div className="card border-0 shadow-sm">

        <div className="card-body">

          <div className="row mb-4">

            <div className="col-md-6">

              <div className="input-group">

                <span className="input-group-text">

                  <FaSearch />

                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Coupon Code..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>

          </div>

                    <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>Coupon Code</th>

                  <th>Discount</th>

                  <th>Minimum Order</th>

                  <th>Expiry Date</th>

                  <th>Usage Limit</th>

                  <th>Status</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredCoupons.length > 0 ? (

                  filteredCoupons.map((coupon) => (

                    <tr key={coupon._id}>

                      <td>

                        <span className="fw-bold">

                          {coupon.code}

                        </span>

                      </td>

                      <td>

                        {coupon.discountType === "percentage"
                          ? `${coupon.discount}%`
                          : `₹${coupon.discount}`}

                      </td>

                      <td>

                        ₹{coupon.minimumOrderAmount || 0}

                      </td>

                      <td>

                        {new Date(
                          coupon.expiryDate
                        ).toLocaleDateString()}

                      </td>

                      <td>

                        {coupon.usageLimit || "Unlimited"}

                      </td>

                      <td>

                        {coupon.isActive ? (

                          <span className="badge bg-success">

                            Active

                          </span>

                        ) : (

                          <span className="badge bg-secondary">

                            Inactive

                          </span>

                        )}

                      </td>

                      <td>

                        <div className="btn-group">

                          <Link
                            to={`/admin/coupons/edit/${coupon._id}`}
                            className="btn btn-sm btn-outline-primary"
                          >

                            <FaEdit />

                          </Link>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              deleteHandler(coupon._id)
                            }
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center py-5"
                    >

                      <h5 className="text-muted">

                        No Coupons Found

                      </h5>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

                    <hr />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">

            <div>

              <strong>
                Total Coupons :
              </strong>

              <span className="badge bg-primary ms-2">

                {filteredCoupons.length}

              </span>

            </div>

            <div className="mt-3 mt-md-0 d-flex gap-2">

              <button
                className="btn btn-outline-secondary"
                onClick={loadCoupons}
              >

                Refresh List

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default CouponManagement;