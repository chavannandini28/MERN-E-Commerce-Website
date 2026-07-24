import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTags,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { createCoupon } from "../api/couponApi";

const AddCoupon = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    expiryDate: "",
    minPurchase: "",
    maxDiscount: "",
    isActive: true,
  });

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;

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

    if (
      !formData.code ||
      !formData.discount ||
      !formData.expiryDate
    ) {
      return toast.error(
        "Please fill all required fields."
      );
    }

    try {
      setLoading(true);

      await createCoupon(formData);

      toast.success(
        "Coupon created successfully."
      );

      navigate("/admin/coupons");

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Unable to create coupon."
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

            <FaTags className="me-2 text-success" />

            Add Coupon

          </h2>

          <p className="text-muted mb-0">
            Create a new discount coupon
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
                  placeholder="e.g. SAVE20"
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
                  placeholder="Enter discount"
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
                  placeholder="0"
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
                  placeholder="0"
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
                    htmlFor="isActive"
                    className="form-check-label ms-2 fw-semibold"
                  >
                    Active Coupon
                  </label>

                </div>

              </div>

              {/* Buttons */}

              <div className="col-12 mt-4">

                <button
                  type="submit"
                  className="btn btn-success px-4"
                  disabled={loading}
                >

                  <FaSave className="me-2" />

                  {loading
                    ? "Creating..."
                    : "Create Coupon"}

                </button>

                <button
                  type="button"
                  className="btn btn-secondary ms-3"
                  onClick={() => navigate("/admin/coupons")}
                >
                  Cancel
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddCoupon;
            