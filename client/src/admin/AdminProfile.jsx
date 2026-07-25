import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaEdit,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { getProfile } from "../api/userApi";

const AdminProfile = () => {
  const [loading, setLoading] = useState(true);

  const [admin, setAdmin] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const { data } = await getProfile();

      setAdmin(
        data.user ||
        data.admin ||
        {}
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to load profile."
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

            <FaUserCircle className="me-2 text-primary" />

            Admin Profile

          </h2>

          <p className="text-muted mb-0">
            View your administrator profile
          </p>

        </div>

      </div>

      {loading ? (

        <div className="text-center py-5">

          <div className="spinner-border text-primary" />

        </div>

      ) : (

        <div className="row">

          <div className="col-lg-4">

            <div className="card border-0 shadow">

              <div className="card-body text-center">

                <img
                  src={
                    admin.avatar?.url ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Admin"
                  className="rounded-circle mb-3"
                  width="150"
                  height="150"
                />

                <h4 className="fw-bold">
                  {admin.name}
                </h4>

                <span className="badge bg-primary">
                  Administrator
                </span>

              </div>

            </div>

          </div>

          <div className="col-lg-8">
                        <div className="card border-0 shadow">

              <div className="card-header bg-white">

                <h5 className="fw-bold mb-0">
                  Profile Information
                </h5>

              </div>

              <div className="card-body">

                <div className="row">

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">
                      <FaUserCircle className="me-2 text-primary" />
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={admin.name || ""}
                      readOnly
                    />

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">
                      <FaEnvelope className="me-2 text-success" />
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      value={admin.email || ""}
                      readOnly
                    />

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">
                      <FaPhone className="me-2 text-warning" />
                      Phone
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={admin.phone || "Not Available"}
                      readOnly
                    />

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">
                      <FaUserShield className="me-2 text-danger" />
                      Role
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={admin.role || "Admin"}
                      readOnly
                    />

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">
                      Joined On
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={
                        admin.createdAt
                          ? new Date(
                              admin.createdAt
                            ).toLocaleDateString()
                          : "-"
                      }
                      readOnly
                    />

                  </div>

                  <div className="col-md-6 mb-4">

                    <label className="form-label fw-semibold">
                      Status
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={
                        admin.isActive
                          ? "Active"
                          : "Inactive"
                      }
                      readOnly
                    />

                  </div>

                </div>

                <div className="mt-4">

                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      window.location.href =
                        "/admin/settings"
                    }
                  >

                    <FaEdit className="me-2" />

                    Edit Profile

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminProfile;
        