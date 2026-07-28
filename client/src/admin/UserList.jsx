import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaUserPlus,
} from "react-icons/fa";

import Loader from "../components/Loader";

import {
  getAllUsers,
  deleteUser,
} from "../api/userApi";

const UserList = () => {
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const { data } = await getAllUsers();

      setUsers(data.users || []);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to load users"
      );

    } finally {

      setLoading(false);

    }
  };

  const deleteHandler = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {

      await deleteUser(id);

      toast.success(
        "User deleted successfully"
      );

      loadUsers();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );

    }
  };

  const filteredUsers = users.filter((user) => {

    return (
      user.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  });

  if (loading) {
    return <Loader />;
  }

  return (

    <div className="container-fluid py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">

          User Management

        </h2>

        <Link
          to="/admin/users/add"
          className="btn btn-primary"
        >

          <FaUserPlus className="me-2" />

          Add User

        </Link>

      </div>

      <div className="card border-0 shadow-sm">

        <div className="card-body">

          <div className="row mb-4">

            <div className="col-md-6">

              <div className="input-group">

                <span className="input-group-text">

                  <FaSearch />

                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search name or email..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

            </div>

          </div>

                    <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>Avatar</th>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Phone</th>

                  <th>Role</th>

                  <th>Status</th>

                  <th>Joined</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.length > 0 ? (

                  filteredUsers.map((user) => (

                    <tr key={user._id}>

                      <td>

                        <img
                          src={
                            user.avatar?.url ||
                            "https://via.placeholder.com/50"
                          }
                          alt={user.name}
                          width="50"
                          height="50"
                          className="rounded-circle border"
                          style={{
                            objectFit: "cover",
                          }}
                        />

                      </td>

                      <td>

                        <h6 className="mb-0 fw-bold">

                          {user.name}

                        </h6>

                      </td>

                      <td>

                        {user.email}

                      </td>

                      <td>

                        {user.phone || "-"}

                      </td>

                      <td>

                        <span
                          className={`badge ${
                            user.role === "Admin"
                              ? "bg-danger"
                              : user.role === "Vendor"
                              ? "bg-warning text-dark"
                              : "bg-primary"
                          }`}
                        >

                          {user.role}

                        </span>

                      </td>

                      <td>

                        {user.isActive ? (

                          <span className="badge bg-success">

                            Active

                          </span>

                        ) : (

                          <span className="badge bg-secondary">

                            Inactive

                          </span>

                        )}

                      </td>

                      <td>

                        {new Date(
                          user.createdAt
                        ).toLocaleDateString()}

                      </td>

                      <td>

                        <div className="btn-group">

                          <Link
                            to={`/admin/users/edit/${user._id}`}
                            className="btn btn-sm btn-outline-primary"
                          >

                            <FaEdit />

                          </Link>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              deleteHandler(user._id)
                            }
                          >

                            <FaTrash />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >

                      <h5 className="text-muted">

                        No Users Found

                      </h5>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

                    <hr />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">

            <div>

              <strong>
                Total Users :
              </strong>

              <span className="badge bg-primary ms-2">

                {filteredUsers.length}

              </span>

            </div>

            <div className="mt-3 mt-md-0 d-flex gap-2">

              <button
                className="btn btn-outline-secondary"
                onClick={loadUsers}
              >

                Refresh List

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default UserList;