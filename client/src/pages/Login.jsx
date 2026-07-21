import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { loginUser } from "../api/authApi";
import { loginSuccess } from "../redux/authSlice";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginUser(form);

      dispatch(loginSuccess(data));

      toast.success(data.message);

      if (data.user.role === "Admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "Vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 450 }}>
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Login
        </h2>

        <form onSubmit={submitHandler}>

          <input
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />

          <button
            className="btn btn-dark w-100"
          >
            Login
          </button>

        </form>

        <p className="mt-3 text-center">
          Don't have an account?

          <Link to="/register">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;