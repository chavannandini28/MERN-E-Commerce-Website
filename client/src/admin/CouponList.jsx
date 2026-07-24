import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTags,
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getCoupons,
  deleteCoupon,
} from "../api/couponApi";

const CouponList = () => {
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      setLoading(true);

      const { data } = await getCoupons();

      setCoupons(
        data.coupons ||
        data.data ||
        []
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to load coupons."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;

    try {
      await deleteCoupon(id);

      toast.success("Coupon deleted.");

      fetchCoupons();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Unable to delete coupon."
      );
    }
  };

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">

            <FaTags className="me-2 text-success" />

            Coupon Management

          </h2>

          <p className="text-muted mb-0">
            Manage all discount coupons
          </p>

        </div>

        <Link
          to="/admin/coupons/add"
          className="btn btn-success"
        >

          <FaPlus className="me-2" />

          Add Coupon

        </Link>

      </div>

      <div className="card shadow border-0">

        <div className="card-body">

          <div className="input-group mb-4">

            <span className="input-group-text">

              <FaSearch />

            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search coupon code..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {loading ? (

            <div className="text-center py-5">

              <div className="spinner-border text-success" />

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-dark">

                  <tr>

                    <th>#</th>

                    <th>Coupon Code</th>

                    <th>Discount</th>

                    <th>Expiry</th>

                    <th>Status</th>

                    <th className="text-center">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                                      {filteredCoupons.length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center py-5 text-muted"
                      >
                        No coupons found.
                      </td>

                    </tr>

                  ) : (

                    filteredCoupons.map((coupon, index) => (

                      <tr key={coupon._id}>

                        <td>{index + 1}</td>

                        <td>

                          <span className="fw-bold">
                            {coupon.code}
                          </span>

                        </td>

                        <td>

                          <span className="badge bg-success">
                            {coupon.discount}%
                          </span>

                        </td>

                        <td>

                          {coupon.expiryDate
                            ? new Date(
                                coupon.expiryDate
                              ).toLocaleDateString()
                            : "-"}

                        </td>

                        <td>

                          <span
                            className={`badge ${
                              coupon.isActive
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {coupon.isActive
                              ? "Active"
                              : "Inactive"}
                          </span>

                        </td>

                        <td className="text-center">

                          <Link
                            to={`/admin/coupons/edit/${coupon._id}`}
                            className="btn btn-sm btn-warning me-2"
                          >
                            <FaEdit />
                          </Link>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              deleteHandler(coupon._id)
                            }
                          >
                            <FaTrash />
                          </button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default CouponList;
                