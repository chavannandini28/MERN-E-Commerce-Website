import { useState } from "react";
import { registerUser } from "../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      const { data } = await registerUser(form);

      toast.success(data.message);

      navigate("/login");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Register
        </h2>

        <form onSubmit={submitHandler}>

          <input
            className="form-control mb-3"
            placeholder="Name"
            name="name"
            onChange={changeHandler}
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            onChange={changeHandler}
          />

          <input
            className="form-control mb-3"
            placeholder="Phone"
            name="phone"
            onChange={changeHandler}
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            name="password"
            onChange={changeHandler}
          />

          <button className="btn btn-success w-100">
            Register
          </button>

        </form>

      </div>
    </div>
  );
};

export default Register;