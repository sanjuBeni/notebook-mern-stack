import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/login");
      props.showAlert("Account created successfully", "success");
    } else {
      props.showAlert("Fill valid data", "danger");
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-md-4 offset-3">
          <form onSubmit={handleSignup} method="post">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={onChange}
                autoComplete={"off"}
              />
            </div>
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
              <label htmlFor="passwod" className="form-label">
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
            <div className="mb-3">
              <label htmlFor="cpasswod" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                onChange={onChange}
                autoComplete={"off"}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
