import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Loader from "../components/Loader";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../api/userApi";

const AdminProfile = () => {

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    phone: "",

    avatar: "",

    oldPassword: "",

    newPassword: "",

    confirmPassword: "",

  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      setLoading(true);

      const { data } = await getProfile();

      setFormData((prev) => ({
        ...prev,
        name: data.user?.name || "",
        email: data.user?.email || "",
        phone: data.user?.phone || "",
        avatar: data.user?.avatar?.url || "",
      }));

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load profile"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const profileSubmitHandler = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      toast.success("Profile Updated");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Update Failed"
      );

    } finally {

      setSaving(false);

    }

  };

  if (loading) {
    return <Loader />;
  }

  return (

    <div className="container py-4">

      <div className="card border-0 shadow">

        <div className="card-header bg-white">

          <h3 className="fw-bold mb-0">

            Admin Profile

          </h3>

        </div>

        <div className="card-body">

          <form onSubmit={profileSubmitHandler}>

            <div className="text-center mb-4">

              <img
                src={
                  formData.avatar ||
                  "https://via.placeholder.com/120"
                }
                alt="Profile"
                className="rounded-circle border"
                width="120"
                height="120"
                style={{
                  objectFit: "cover",
                }}
              />

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">

                  Full Name

                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">

                  Email

                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

                            <div className="col-md-6 mb-3">

                <label className="form-label">

                  Phone Number

                </label>

                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">

                  Profile Picture URL

                </label>

                <input
                  type="text"
                  name="avatar"
                  className="form-control"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                />

              </div>

              <div className="col-12">

                <hr className="my-4" />

              </div>

              <div className="col-12">

                <h5 className="fw-bold mb-3">

                  Change Password

                </h5>

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">

                  Current Password

                </label>

                <input
                  type="password"
                  name="oldPassword"
                  className="form-control"
                  value={formData.oldPassword}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">

                  New Password

                </label>

                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                  value={formData.newPassword}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-4 mb-3">

                <label className="form-label">

                  Confirm Password

                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

              </div>

                            <div className="col-12">

                <hr className="my-4" />

              </div>

              <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center">

                <div>

                  <small className="text-muted">

                    Last Updated :
                    {" "}
                    {new Date().toLocaleString()}

                  </small>

                </div>

                <div className="mt-3 mt-md-0 d-flex gap-2">

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={loadProfile}
                  >

                    Reload

                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    disabled={saving}
                    onClick={passwordSubmitHandler}
                  >

                    {saving
                      ? "Updating..."
                      : "Change Password"}

                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >

                    {saving
                      ? "Saving..."
                      : "Update Profile"}

                  </button>

                </div>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

};

export default AdminProfile;