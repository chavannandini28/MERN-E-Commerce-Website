import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaUserEdit,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getUserById,
  updateUser,
} from "../api/userApi";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Customer",
    isBlocked: false,
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const { data } = await getUserById(id);

      const user =
        data.user ||
        data.data ||
        {};

      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "Customer",
        isBlocked: user.isBlocked || false,
      });

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Failed to load user."
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

    if (
      !formData.name.trim() ||
      !formData.email.trim()
    ) {
      return toast.error(
        "Name and Email are required."
      );
    }

    try {

      setLoading(true);

      await updateUser(id, formData);

      toast.success(
        "User updated successfully."
      );

      navigate("/admin/users");

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Unable to update user."
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

            <FaUserEdit className="me-2 text-warning" />

            Edit User

          </h2>

          <p className="text-muted mb-0">
            Update user information
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

              <div className="spinner-border text-primary" />

            </div>

          ) : (

            <form onSubmit={submitHandler}>

              <div className="row">

                              {/* Name */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
                  placeholder="Enter full name"
                  required
                />

              </div>

              {/* Email */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="Enter email"
                  required
                />

              </div>

              {/* Role */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Role
                </label>

                <select
                  className="form-select"
                  name="role"
                  value={formData.role}
                  onChange={changeHandler}
                >

                  <option value="Customer">
                    Customer
                  </option>

                  <option value="Vendor">
                    Vendor
                  </option>

                  <option value="Admin">
                    Admin
                  </option>

                </select>

              </div>

              {/* Block User */}

              <div className="col-md-6 mb-3 d-flex align-items-center">

                <div className="form-check form-switch mt-4">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isBlocked"
                    name="isBlocked"
                    checked={formData.isBlocked}
                    onChange={changeHandler}
                  />

                  <label
                    className="form-check-label fw-semibold ms-2"
                    htmlFor="isBlocked"
                  >
                    Block User
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
                    : "Update User"}

                </button>

                <button
                  type="button"
                  className="btn btn-secondary ms-3"
                  onClick={() => navigate("/admin/users")}
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

export default EditUser;
              