import { useEffect, useState } from "react";
import { getProfile } from "../api/authApi";

const Profile = () => {

  const [user, setUser] = useState({});

  useEffect(() => {

    const loadProfile = async () => {
      const { data } = await getProfile();
      setUser(data.user);
    };

    loadProfile();

  }, []);

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h3>My Profile</h3>

        <hr />

        <p>
          <strong>Name :</strong> {user.name}
        </p>

        <p>
          <strong>Email :</strong> {user.email}
        </p>

        <p>
          <strong>Phone :</strong> {user.phone}
        </p>

        <p>
          <strong>Role :</strong> {user.role}
        </p>

      </div>

    </div>
  );
};

export default Profile;