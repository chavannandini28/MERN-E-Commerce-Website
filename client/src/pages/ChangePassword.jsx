import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { changePassword } from "../api/userApi";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return toast.error("Please fill all fields");
    }

    if (formData.newPassword.length < 6) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match"
      );
    }

    try {
      setLoading(true);

      const { data } = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      toast.success(
        data.message || "Password changed successfully"
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-6">

          <div className="card shadow border-0 rounded-4">

            <div className="card-body p-5">

              <h2 className="fw-bold text-center mb-4">
                Change Password
              </h2>

              <form onSubmit={submitHandler}>

                {/* Current Password */}

                <div className="mb-3">

                  <label className="form-label">
                    Current Password
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaLock />
                    </span>

                    <input
                      type={
                        showCurrent
                          ? "text"
                          : "password"
                      }
                      className="form-control"
                      name="currentPassword"
                      value={
                        formData.currentPassword
                      }
                      onChange={changeHandler}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setShowCurrent(!showCurrent)
                      }
                    >
                      {showCurrent ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>

                {/* New Password */}

                <div className="mb-3">

                  <label className="form-label">
                    New Password
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaLock />
                    </span>

                    <input
                      type={
                        showNew
                          ? "text"
                          : "password"
                      }
                      className="form-control"
                      name="newPassword"
                      value={
                        formData.newPassword
                      }
                      onChange={changeHandler}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setShowNew(!showNew)
                      }
                    >
                      {showNew ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>

                {/* Confirm Password */}

                <div className="mb-4">

                  <label className="form-label">
                    Confirm Password
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaLock />
                    </span>

                    <input
                      type={
                        showConfirm
                          ? "text"
                          : "password"
                      }
                      className="form-control"
                      name="confirmPassword"
                      value={
                        formData.confirmPassword
                      }
                      onChange={changeHandler}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setShowConfirm(!showConfirm)
                      }
                    >
                      {showConfirm ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  <FaSave className="me-2" />

                  {loading
                    ? "Updating..."
                    : "Change Password"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ChangePassword;