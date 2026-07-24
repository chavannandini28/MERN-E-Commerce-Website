import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaTags,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getCouponById,
  updateCoupon,
} from "../api/couponApi";

const EditCoupon = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    expiryDate: "",
    minPurchase: "",
    maxDiscount: "",
    isActive: true,
  });

  useEffect(() => {
    fetchCoupon();
  }, []);

  const fetchCoupon = async () => {
    try {
      setLoading(true);

      const { data } = await getCouponById(id);

      const coupon =
        data.coupon ||
        data.data ||
        {};

      setFormData({
        code: coupon.code || "",
        discount: coupon.discount || "",
        expiryDate: coupon.expiryDate
          ? coupon.expiryDate.slice(0, 10)
          : "",
        minPurchase:
          coupon.minPurchase || "",
        maxDiscount:
          coupon.maxDiscount || "",
        isActive:
          coupon.isActive ?? true,
      });

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
          "Failed to load coupon."
      );

    } finally {

      setLoading(false);

    }
  };

  const changeHandler = (e) => {

    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await updateCoupon(id, formData);

      toast.success(
        "Coupon updated successfully."
      );

      navigate("/admin/coupons");

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
          "Unable to update coupon."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">

            <FaTags className="me-2 text-warning" />

            Edit Coupon

          </h2>

          <p className="text-muted mb-0">
            Update coupon information
          </p>

        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >

          <FaArrowLeft className="me-2" />

          Back

        </button>

      </div>

      <div className="card border-0 shadow">

        <div className="card-body p-4">

          {loading ? (

            <div className="text-center py-5">

              <div className="spinner-border text-warning" />

            </div>

          ) : (

            <form onSubmit={submitHandler}>

              <div className="row">

                              {/* Coupon Code */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Coupon Code
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="code"
                  value={formData.code}
                  onChange={changeHandler}
                  required
                />

              </div>

              {/* Discount */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Discount (%)
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="discount"
                  value={formData.discount}
                  onChange={changeHandler}
                  required
                />

              </div>

              {/* Expiry Date */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Expiry Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={changeHandler}
                  required
                />

              </div>

              {/* Minimum Purchase */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Minimum Purchase
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="minPurchase"
                  value={formData.minPurchase}
                  onChange={changeHandler}
                />

              </div>

              {/* Maximum Discount */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Maximum Discount
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="maxDiscount"
                  value={formData.maxDiscount}
                  onChange={changeHandler}
                />

              </div>

              {/* Active Switch */}

              <div className="col-md-6 mb-3 d-flex align-items-center">

                <div className="form-check form-switch mt-4">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={changeHandler}
                  />

                  <label
                    className="form-check-label ms-2 fw-semibold"
                    htmlFor="isActive"
                  >
                    Active Coupon
                  </label>

                </div>

              </div>

              {/* Buttons */}

              <div className="col-12 mt-4">

                <button
                  type="submit"
                  className="btn btn-warning text-white px-4"
                  disabled={loading}
                >

                  <FaSave className="me-2" />

                  {loading
                    ? "Updating..."
                    : "Update Coupon"}

                </button>

                <button
                  type="button"
                  className="btn btn-secondary ms-3"
                  onClick={() =>
                    navigate("/admin/coupons")
                  }
                >
                  Cancel
                </button>

              </div>

            </div>

          </form>

          )}

        </div>

      </div>

    </div>
  );
};

export default EditCoupon;
              