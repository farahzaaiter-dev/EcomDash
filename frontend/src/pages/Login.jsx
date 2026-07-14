import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      alert(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        {/* Left Side */}
        <div
          className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white"
          style={{ backgroundColor: "#5B5CEB" }}
        >
          <h1 className="fw-bold display-4">Welcome Back!</h1>

          <p className="fs-5 mt-3 text-center px-5">
            Sign in to access your dashboard and manage your store.
          </p>
        </div>

        {/* Right Side */}
        <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">

          <div
            className="bg-white shadow rounded-4 p-5"
            style={{ width: "420px" }}
          >
            <h2 className="fw-bold mb-4 text-center">
              Sign In
            </h2>

            <form onSubmit={handleLogin}>

              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn w-100 text-white fw-semibold"
                style={{ backgroundColor: "#5B5CEB" }}
              >
                Sign In
              </button>

            </form>

            <hr className="my-4" />

            <p className="text-center mb-0">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="fw-bold text-decoration-none"
              >
                Create one
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;