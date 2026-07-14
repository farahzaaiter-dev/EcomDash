import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";


function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Account created successfully!");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration failed."
      );
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        <div
          className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white"
          style={{ backgroundColor: "#5B5CEB" }}
        >
          <h1 className="fw-bold display-4">Join EcomDash</h1>

          <p className="fs-5 text-center px-5">
            Create your administrator account to manage your dashboard.
          </p>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">

          <div
            className="bg-white shadow rounded-4 p-5"
            style={{ width: "430px" }}
          >

            <h2 className="fw-bold text-center mb-4">
              Create Account
            </h2>

            <form onSubmit={handleRegister}>

              <input
                className="form-control mb-3"
                placeholder="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                className="form-control mb-4"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn w-100 text-white"
                style={{ backgroundColor: "#5B5CEB" }}
              >
                Register
              </button>

            </form>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login">
                Sign In
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;