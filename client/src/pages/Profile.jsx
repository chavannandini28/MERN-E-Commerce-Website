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
      toast.success("Profile Updated Successfully");
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

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow border-0 rounded-4">

            <div className="card-body p-5">

              <div className="text-center mb-4">

                <img
                  src={
                    profile?.avatar?.url ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="rounded-circle shadow"
                  style={{
                    width: 140,
                    height: 140,
                    objectFit: "cover",
                  }}
                />

                <h3 className="mt-3">
                  {profile?.name}
                </h3>

              </div>

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