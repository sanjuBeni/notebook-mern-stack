import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      // Redirect
      navigate("/");
      props.showAlert("Logged in successfully", "success");
    } else {
      // alert(json.error);
      props.showAlert("Invalid details", "danger");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-md-4 offset-3">
          <form onSubmit={handleLogin} method="post">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={onChange}
                autoComplete={"off"}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={onChange}
                autoComplete={"off"}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
