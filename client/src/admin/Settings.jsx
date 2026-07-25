import { useEffect, useState } from "react";
import {
  FaCog,
  FaSave,
  FaUserShield,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getProfile,
  updateProfile,
} from "../api/userApi";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const { data } = await getProfile();

      const user =
        data.user ||
        data.data ||
        {};

      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateProfile(formData);

      toast.success(
        "Profile updated successfully."
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-fluid py-4">

      <div className="d-flex align-items-center mb-4">

        <FaCog
          className="text-primary me-3"
          size={32}
        />

        <div>

          <h2 className="fw-bold mb-0">
            Admin Settings
          </h2>

          <small className="text-muted">
            Manage your profile information
          </small>

        </div>

      </div>

      <div className="card shadow border-0">

        <div className="card-body p-4">

          {loading ? (

            <div className="text-center py-5">

              <div className="spinner-border text-primary" />

            </div>

          ) : (

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
                    value={formData.name}
                    onChange={changeHandler}
                    placeholder="Enter your name"
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
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="Enter your email"
                    required
                  />

                </div>

                {/* Phone */}

                <div className="col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={changeHandler}
                    placeholder="Enter phone number"
                  />

                </div>

                {/* Role (Read Only) */}

                <div className="col-md-6 mb-3">

                  <label className="form-label fw-semibold">
                    Role
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">

                      <FaUserShield />

                    </span>

                    <input
                      type="text"
                      className="form-control"
                      value="Administrator"
                      readOnly
                    />

                  </div>

                </div>

                {/* Save Button */}

                <div className="col-12 mt-4">

                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={saving}
                  >

                    <FaSave className="me-2" />

                    {saving
                      ? "Saving..."
                      : "Save Changes"}

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

export default Settings;
              