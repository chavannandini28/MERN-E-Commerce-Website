import { useEffect, useState } from "react";
import {
  FaTrash,
  FaBan,
  FaCheckCircle,
  FaSearch,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getUsers,
  deleteUser,
  blockUser,
  unblockUser,
} from "../api/userApi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data } = await getUsers();

      const list = data.users || data || [];

      setUsers(list);
      setFilteredUsers(list);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value;

    setKeyword(value);

    const result = users.filter(
      (user) =>
        user.name
          ?.toLowerCase()
          .includes(value.toLowerCase()) ||
        user.email
          ?.toLowerCase()
          .includes(value.toLowerCase())
    );

    setFilteredUsers(result);
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);

      toast.success("User deleted");

      loadUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  const blockHandler = async (id) => {
    try {
      await blockUser(id);

      toast.success("User blocked");

      loadUsers();
    } catch {
      toast.error("Operation failed");
    }
  };

  const unblockHandler = async (id) => {
    try {
      await unblockUser(id);

      toast.success("User unblocked");

      loadUsers();
    } catch {
      toast.error("Operation failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h3>Loading Users...</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>User Management</h2>

        <div className="input-group w-25">

          <span className="input-group-text">
            <FaSearch />
          </span>

          <input
            className="form-control"
            placeholder="Search..."
            value={keyword}
            onChange={searchHandler}
          />

        </div>

      </div>

      <div className="card shadow">

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Role</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr key={user._id}>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>

                    <span className="badge bg-primary">
                      {user.role}
                    </span>

                  </td>

                  <td>

                    {user.isBlocked ? (
                      <span className="badge bg-danger">
                        Blocked
                      </span>
                    ) : (
                      <span className="badge bg-success">
                        Active
                      </span>
                    )}

                  </td>

                  <td>

                    {user.isBlocked ? (

                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() =>
                          unblockHandler(user._id)
                        }
                      >
                        <FaCheckCircle />
                      </button>

                    ) : (

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          blockHandler(user._id)
                        }
                      >
                        <FaBan />
                      </button>

                    )}

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteHandler(user._id)
                      }
                    >
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