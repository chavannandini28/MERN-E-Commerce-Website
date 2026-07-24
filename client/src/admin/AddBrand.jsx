import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlusCircle,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { createBrand } from "../api/brandApi";

const AddBrand = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    featured: false,
  });

  const changeHandler = (e) => {
    const { name, value, checked, type } =
      e.target;

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

    if (!formData.name.trim()) {
      return toast.error(
        "Brand name is required."
      );
    }

    try {
      setLoading(true);

      await createBrand(formData);

      toast.success(
        "Brand created successfully."
      );

      navigate("/admin/brands");

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Unable to create brand."
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
            <FaPlusCircle className="me-2 text-primary" />
            Add Brand
          </h2>

          <p className="text-muted mb-0">
            Create a new product brand
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

      <div className="card shadow border-0">

        <div className="card-body p-4">

          <form onSubmit={submitHandler}>

            <div className="row">

                            {/* Brand Name */}

              <div className="col-12 mb-3">

                <label className="form-label fw-semibold">
                  Brand Name <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter brand name"
                  value={formData.name}
                  onChange={changeHandler}
                  required
                />

              </div>

              {/* Description */}

              <div className="col-12 mb-3">

                <label className="form-label fw-semibold">
                  Description
                </label>

                <textarea
                  className="form-control"
                  rows="5"
                  name="description"
                  placeholder="Enter brand description"
                  value={formData.description}
                  onChange={changeHandler}
                />

              </div>

              {/* Featured */}

              <div className="col-12 mb-4">

                <div className="form-check form-switch">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={changeHandler}
                  />

                  <label
                    className="form-check-label fw-semibold"
                    htmlFor="featured"
                  >
                    Featured Brand
                  </label>

                </div>

              </div>

              {/* Buttons */}

              <div className="col-12">

                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={loading}
                >
                  <FaSave className="me-2" />

                  {loading
                    ? "Creating..."
                    : "Create Brand"}

                </button>

                <button
                  type="button"
                  className="btn btn-secondary ms-3"
                  onClick={() => navigate("/admin/brands")}
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

export default AddBrand;
            