import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaFolderOpen,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getCategoryById,
  updateCategory,
} from "../api/categoryApi";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    featured: false,
  });

  useEffect(() => {
    fetchCategory();
  }, [id]);

  // ===========================
  // Fetch Category
  // ===========================

  const fetchCategory = async () => {
    try {
      setLoading(true);

      const { data } =
        await getCategoryById(id);

      const category =
        data.category || data.data;

      setFormData({
        name: category.name || "",
        description:
          category.description || "",
        featured:
          category.featured || false,
      });

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Unable to load category."
      );

    } finally {

      setLoading(false);

    }
  };

  // ===========================
  // Input Change
  // ===========================

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

  return (
    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold">
            <FaFolderOpen className="me-2" />
            Edit Category
          </h2>

          <p className="text-muted mb-0">
            Update category information
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

          <form>
            <div className="row">

                              {/* Category Name */}

              <div className="col-12 mb-3">

                <label className="form-label fw-semibold">
                  Category Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter category name"
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
                  placeholder="Enter category description"
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
                    htmlFor="featured"
                    className="form-check-label"
                  >
                    Featured Category
                  </label>

                </div>

              </div>

              {/* Buttons */}

              <div className="col-12">

                <button
                  type="button"
                  className="btn btn-primary px-4"
                  disabled={loading}
                  onClick={async () => {

                    if (!formData.name.trim()) {
                      return toast.error(
                        "Category name is required."
                      );
                    }

                    try {

                      setLoading(true);

                      await updateCategory(id, formData);

                      toast.success(
                        "Category updated successfully."
                      );

                      navigate("/admin/categories");

                    } catch (error) {

                      toast.error(
                        error?.response?.data?.message ||
                        "Unable to update category."
                      );

                    } finally {

                      setLoading(false);

                    }

                  }}
                >

                  <FaSave className="me-2" />

                  {loading
                    ? "Updating..."
                    : "Update Category"}

                </button>

                <button
                  type="button"
                  className="btn btn-secondary ms-3"
                  onClick={() => navigate(-1)}
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

export default EditCategory;
            