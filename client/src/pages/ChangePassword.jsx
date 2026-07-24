import { useMemo, useState } from "react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaShieldAlt,
} from "react-icons/fa";
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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const passwordStrength = useMemo(() => {
    const password = formData.newPassword;

    if (!password) return "";

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return "Weak";
    if (score <= 4) return "Medium";

    return "Strong";
  }, [formData.newPassword]);

  const isFormValid =
    formData.currentPassword &&
    formData.newPassword &&
    formData.confirmPassword &&
    formData.newPassword === formData.confirmPassword &&
    formData.newPassword.length >= 6;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.currentPassword.trim()) {
      return toast.error("Current password is required");
    }

    if (formData.newPassword.length < 6) {
      return toast.error(
        "New password must be at least 6 characters"
      );
    }

    if (
      formData.currentPassword ===
      formData.newPassword
    ) {
      return toast.error(
        "New password must be different"
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
        data.message ||
          "Password changed successfully"
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

        <div className="col-lg-6 col-md-8">

          <div className="card shadow-lg border-0 rounded-4">

            <div className="card-header bg-primary text-white text-center py-4 rounded-top-4">

              <FaShieldAlt size={42} />

              <h3 className="mt-3 mb-0 fw-bold">
                Change Password
              </h3>

            </div>

            <div className="card-body p-4">

              <div className="alert alert-info">

                Password should contain at least
                <strong>
                  {" "}6 characters
                </strong>
                . For better security use uppercase,
                lowercase, numbers and symbols.

              </div>

              <form onSubmit={submitHandler}>

                {/* Current Password */}

                <div className="mb-3">

                  <label className="form-label fw-semibold">
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
                      autoComplete="current-password"
                      value={formData.currentPassword}
                      onChange={changeHandler}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setShowCurrent(
                          !showCurrent
                        )
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

                  <label className="form-label fw-semibold">
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
                      autoComplete="new-password"
                      value={formData.newPassword}
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

                  {passwordStrength && (

                    <small
                      className={`fw-bold ${
                        passwordStrength === "Strong"
                          ? "text-success"
                          : passwordStrength === "Medium"
                          ? "text-warning"
                          : "text-danger"
                      }`}
                    >
                      Strength: {passwordStrength}
                    </small>

                  )}

                </div>

                {/* Confirm Password */}

                <div className="mb-4">

                  <label className="form-label fw-semibold">
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
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={changeHandler}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setShowConfirm(
                          !showConfirm
                        )
                      }
                    >
                      {showConfirm ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>

                  </div>

                  {formData.confirmPassword && (

                    <small
                      className={
                        formData.newPassword ===
                        formData.confirmPassword
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {formData.newPassword ===
                      formData.confirmPassword
                        ? "Passwords match"
                        : "Passwords do not match"}
                    </small>

                  )}

                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={
                    loading || !isFormValid
                  }
                >
                  <FaSave className="me-2" />

                  {loading
                    ? "Updating Password..."
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