import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaSave,
} from "react-icons/fa";

import Loader from "../components/Loader";

import {
  getProfile,
  updateProfile,
} from "../api/userApi";

const AdminProfile = () => {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const { data } = await getProfile();

      setFormData({
        name: data.user?.name || "",
        email: data.user?.email || "",
        phone: data.user?.phone || "",
        avatar: data.user?.avatar?.url || "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(formData);

      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container-fluid py-4">

      <div className="mb-4">

        <h2 className="fw-bold">
          Admin Profile
        </h2>

        <p className="text-muted">
          Manage your account information.
        </p>

      </div>

      <div className="row">

        <div className="col-lg-4">

          <div className="card border-0 shadow-sm">

            <div className="card-body text-center">

              <img
                src={
                  formData.avatar ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="rounded-circle mb-3"
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "cover",
                }}
              />

              <div>

                <label className="btn btn-outline-primary">

                  <FaCamera className="me-2" />

                  Change Photo

                  <input
                    type="file"
                    hidden
                  />

                </label>

              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-8">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <form onSubmit={submitHandler}>
                                <div className="row">

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">

                      <FaUser className="me-2" />

                      Full Name

                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={changeHandler}
                      placeholder="Enter your name"
                    />

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">

                      <FaEnvelope className="me-2" />

                      Email Address

                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={changeHandler}
                      placeholder="Enter your email"
                    />

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">

                      <FaPhone className="me-2" />

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

                </div>

                <div className="mt-4">

                  <button
                    type="submit"
                    className="btn btn-primary"
                  >

                    <FaSave className="me-2" />

                    Save Changes

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

            {/* Account Information */}

      <div className="row mt-5">

        <div className="col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white">

              <h5 className="fw-bold mb-0">
                Account Information
              </h5>

            </div>

            <div className="card-body">

              <div className="mb-3">

                <strong>Name</strong>

                <p className="text-muted mb-0">
                  {formData.name}
                </p>

              </div>

              <div className="mb-3">

                <strong>Email</strong>

                <p className="text-muted mb-0">
                  {formData.email}
                </p>

              </div>

              <div>

                <strong>Phone</strong>

                <p className="text-muted mb-0">
                  {formData.phone || "Not Available"}
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="col-lg-6">

          <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white">

              <h5 className="fw-bold mb-0">
                Security
              </h5>

            </div>

            <div className="card-body">

              <p className="text-muted">

                You can change your password anytime from your account settings.

              </p>

              <button
                className="btn btn-outline-danger"
              >

                Change Password

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminProfile;
              