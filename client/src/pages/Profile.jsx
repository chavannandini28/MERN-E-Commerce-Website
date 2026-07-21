import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from "react-icons/fa";

const Profile = () => {
  // Replace these with your Redux/API data later
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    address: "Nashik, Maharashtra",
    role: "Customer",
  };

  return (
    <div className="container py-5">

      <div className="row">

        {/* Left Card */}

        <div className="col-lg-4 mb-4">

          <div className="card border-0 shadow rounded-4">

            <div className="card-body text-center p-5">

              <FaUserCircle
                size={130}
                className="text-primary mb-3"
              />

              <h3>{user.name}</h3>

              <span className="badge bg-success px-3 py-2">
                {user.role}
              </span>

              <hr />

              <button className="btn btn-primary rounded-pill px-4">
                <FaEdit className="me-2" />
                Edit Profile
              </button>

            </div>

          </div>

        </div>

        {/* Right Card */}

        <div className="col-lg-8">

          <div className="card border-0 shadow rounded-4">

            <div className="card-body p-5">

              <h3 className="fw-bold mb-4">
                Personal Information
              </h3>

              <div className="row">

                <div className="col-md-6 mb-4">

                  <label className="fw-bold">
                    Full Name
                  </label>

                  <div className="input-group mt-2">

                    <span className="input-group-text">
                      <FaUserCircle />
                    </span>

                    <input
                      className="form-control"
                      value={user.name}
                      readOnly
                    />

                  </div>

                </div>

                <div className="col-md-6 mb-4">

                  <label className="fw-bold">
                    Email
                  </label>

                  <div className="input-group mt-2">

                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>

                    <input
                      className="form-control"
                      value={user.email}
                      readOnly
                    />

                  </div>

                </div>

                <div className="col-md-6 mb-4">

                  <label className="fw-bold">
                    Mobile
                  </label>

                  <div className="input-group mt-2">

                    <span className="input-group-text">
                      <FaPhone />
                    </span>

                    <input
                      className="form-control"
                      value={user.phone}
                      readOnly
                    />

                  </div>

                </div>

                <div className="col-md-6 mb-4">

                  <label className="fw-bold">
                    Address
                  </label>

                  <div className="input-group mt-2">

                    <span className="input-group-text">
                      <FaMapMarkerAlt />
                    </span>

                    <input
                      className="form-control"
                      value={user.address}
                      readOnly
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Statistics */}

          <div className="row mt-4">

            <div className="col-md-4">

              <div className="card text-center border-0 shadow">

                <div className="card-body">

                  <h2 className="text-primary">15</h2>

                  <p>Total Orders</p>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card text-center border-0 shadow">

                <div className="card-body">

                  <h2 className="text-danger">8</h2>

                  <p>Wishlist</p>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card text-center border-0 shadow">

                <div className="card-body">

                  <h2 className="text-success">₹28,500</h2>

                  <p>Total Purchase</p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;