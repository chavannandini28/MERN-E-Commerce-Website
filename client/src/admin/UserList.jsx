import { useEffect, useState } from "react";
import {
  FaSearch,
  FaUserShield,
  FaUser,
  FaTrash,
} from "react-icons/fa";

import { getUsers } from "../api/userApi";

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
      setLoading(true);

      const { data } = await getUsers();

      const list = data.users || data || [];

      setUsers(list);
      setFilteredUsers(list);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value;

    setKeyword(value);

    const result = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsers(result);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading Users...</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid">

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

      <div className="card shadow border-0">

        <div className="card-body">

          <div className="row mb-4">

            <div className="col-md-5">

              <div className="input-group">

                <span className="input-group-text">
                  <FaSearch />
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search User..."
                  value={keyword}
                  onChange={searchHandler}
                />

              </div>

            </div>

          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>

                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.length > 0 ? (

                  filteredUsers.map((user) => (

                    <tr key={user._id}>

                      <td>

                        <div className="d-flex align-items-center">

                          <div
                            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                            style={{
                              width: 45,
                              height: 45,
                            }}
                          >
                            <FaUser />
                          </div>

                          <strong>
                            {user.name}
                          </strong>

                        </div>

                      </td>

                      <td>{user.email}</td>

                      <td>

                        {user.role === "Admin" ? (

                          <span className="badge bg-danger">

                            <FaUserShield className="me-1" />

                            Admin

                          </span>

                        ) : (

                          <span className="badge bg-primary">

                            Customer

                          </span>

                        )}

                      </td>

                      <td>

                        <span className="badge bg-success">
                          Active
                        </span>

                      </td>

                      <td>

                        <button className="btn btn-outline-danger btn-sm">

                          <FaTrash />

                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-5"
                    >
                      No Users Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserList;