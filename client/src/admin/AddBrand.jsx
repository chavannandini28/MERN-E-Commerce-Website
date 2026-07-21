import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaTags,
  FaSave,
} from "react-icons/fa";

import { createBrand } from "../api/brandApi";

const AddBrand = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "slug"
          ? value.toLowerCase().replace(/\s+/g, "-")
          : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createBrand(formData);

      navigate("/admin/brands");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            <FaTags className="me-2 text-primary" />
            Add Brand
          </h2>

          <p className="text-muted">
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

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card border-0 shadow">

            <div className="card-body p-5">

              <form onSubmit={submitHandler}>

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Brand Name
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

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Slug
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="slug"
                    placeholder="brand-slug"
                    value={formData.slug}
                    onChange={changeHandler}
                    required
                  />

                  <small className="text-muted">
                    Example: apple, samsung, sony
                  </small>

                </div>

                <div className="d-flex gap-3">

                  <button
                    type="submit"
                    className="btn btn-primary px-5"
                    disabled={loading}
                  >
                    <FaSave className="me-2" />

                    {loading
                      ? "Saving..."
                      : "Save Brand"}

                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/brands")}
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddBrand;