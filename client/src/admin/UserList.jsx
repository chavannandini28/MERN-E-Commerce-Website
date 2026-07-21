import { useState } from "react";
import {
  FaSearch,
  FaUserEdit,
  FaTrash,
  FaUserShield,
  FaUserTie,
  FaUser,
} from "react-icons/fa";

const UserList = () => {
  const [search, setSearch] = useState("");

  // Replace with your API data
  const users = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@gmail.com",
      role: "Customer",
      status: "Active",
    },
    {
      _id: "2",
      name: "Admin",
      email: "admin@gmail.com",
      role: "Admin",
      status: "Active",
    },
    {
      _id: "3",
      name: "Vendor",
      email: "vendor@gmail.com",
      role: "Vendor",
      status: "Inactive",
    },
  ];

  return (
    <div className="container-fluid">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">
            User Management
          </h2>

          <p className="text-muted">
            Manage all registered users
          </p>
        </div>

      </div>

      {/* Search */}

      <div className="card border-0 shadow mb-4">

        <div className="card-body">

          <div className="input-group">

            <span className="input-group-text">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search User..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

      </div>

      {/* Users Table */}

      <div className="card border-0 shadow rounded-4">

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-dark">

              <tr>

                <th>User</th>

                <th>Email</th>

                <th>Role</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {users
                .filter((user) =>
                  user.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((user) => (
                  <tr key={user._id}>

                    <td>

                      <div className="d-flex align-items-center">

                        <img
                          src={`https://ui-avatars.com/api/?name=${user.name}`}
                          alt={user.name}
                          className="rounded-circle me-3"
                          width="50"
                          height="50"
                        />

                        <strong>
                          {user.name}
                        </strong>

                      </div>

                    </td>

                    <td>{user.email}</td>

                    <td>

                      {user.role === "Admin" && (
                        <span className="badge bg-danger">
                          <FaUserShield className="me-1" />
                          Admin
                        </span>
                      )}

                      {user.role === "Vendor" && (
                        <span className="badge bg-warning text-dark">
                          <FaUserTie className="me-1" />
                          Vendor
                        </span>
                      )}

                      {user.role === "Customer" && (
                        <span className="badge bg-primary">
                          <FaUser className="me-1" />
                          Customer
                        </span>
                      )}

                    </td>

                    <td>

                      <span
                        className={`badge ${
                          user.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {user.status}
                      </span>

                    </td>

                    <td>

                      <button className="btn btn-warning btn-sm me-2">

                        <FaUserEdit />

                      </button>

                      <button className="btn btn-danger btn-sm">

                        <FaTrash />

                      </button>

                    </td>

                  </tr>
                ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default UserList;