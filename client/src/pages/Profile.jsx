import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchProfile,
  updateUserProfile,
} from "../redux/userSlice";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSave,
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();

  const {
    profile,
    loading,
    success,
    error,
  } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (success) {
      toast.success("Profile updated successfully");
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserProfile(formData));
  };

  return (
    <div className="container py-5">

      <div className="row">

        {/* Left Side */}
        <div className="col-lg-4 mb-4">

          <div className="card shadow border-0 rounded-4">

            <div className="card-body text-center p-4">

              <img
                src={
                  profile?.avatar?.url ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="rounded-circle shadow"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />

              <h3 className="mt-3 fw-bold">
                {profile?.name}
              </h3>

              <p className="text-muted">
                {profile?.role}
              </p>

            </div>

          </div>

          <div className="card shadow border-0 rounded-4 mt-4">

            <div className="card-body">

              <h5 className="mb-4">
                Account Summary
              </h5>

              <div className="d-flex justify-content-between mb-3">

                <span>
                  <FaShoppingBag className="me-2 text-primary" />
                  Orders
                </span>

                <strong>
                  {profile?.ordersCount || 0}
                </strong>

              </div>

              <div className="d-flex justify-content-between mb-3">

                <span>
                  <FaHeart className="me-2 text-danger" />
                  Wishlist
                </span>

                <strong>
                  {profile?.wishlistCount || 0}
                </strong>

              </div>

              <div className="d-flex justify-content-between">

                <span>
                  <FaShoppingCart className="me-2 text-success" />
                  Cart
                </span>

                <strong>
                  {profile?.cartCount || 0}
                </strong>

              </div>

            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="col-lg-8">

          <div className="card shadow border-0 rounded-4">

            <div className="card-body p-5">

              <h3 className="mb-4">
                Edit Profile
              </h3>

              <form onSubmit={submitHandler}>

                <div className="mb-3">

                  <label className="form-label">
                    Full Name
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaUser />
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={changeHandler}
                    />

                  </div>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={changeHandler}
                    />

                  </div>

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Phone
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaPhone />
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={changeHandler}
                    />

                  </div>

                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  <FaSave className="me-2" />

                  {loading
                    ? "Updating..."
                    : "Update Profile"}

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;