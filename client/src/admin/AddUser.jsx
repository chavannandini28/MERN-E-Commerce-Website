import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { createUser } from "../api/userApi";

const AddUser = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      return toast.error("Please fill all fields.");
    }

    if (formData.password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters."
      );
    }

    try {
      setLoading(true);

      await createUser(formData);

      toast.success("User created successfully.");

      navigate("/admin/users");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to create user."
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

            <FaUserPlus className="me-2 text-primary" />

            Add User

          </h2>

          <p className="text-muted mb-0">
            Create a new user account
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

                              {/* Full Name */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={changeHandler}
                  required
                />

              </div>

              {/* Email */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={changeHandler}
                  required
                />

              </div>

              {/* Password */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={changeHandler}
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

              {/* Buttons */}

              <div className="col-12 mt-4">

                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={loading}
                >

                  <FaSave className="me-2" />

                  {loading
                    ? "Creating..."
                    : "Create User"}

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

        </div>

      </div>

    </div>
  );
};

export default AddUser;
        