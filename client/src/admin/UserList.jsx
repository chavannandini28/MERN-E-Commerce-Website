import { useEffect, useState } from "react";

import { getUsers } from "../api/userApi";

import Loader from "../components/Loader";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const { data } =
      await getUsers();

    setUsers(data.users);
  };

  if (!users)
    return <Loader />;

  return (
    <div>

      <h2>Users</h2>

      <table className="table table-bordered">

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Role</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (
            <tr key={user._id}>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default UserList;