import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const { darkMode } = props;

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert(" Acount created successfully " , "success");

    } else {
      props.showAlert("Invalid details" , "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className={`form-label ${darkMode ? "text-white" : "text-black"}`}>
              Name
            </label>
            <input
              type="name"
              className="form-control"
              value={credentials.name}
              onChange={onChange}
              name="name"
              id="password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className={`form-label ${darkMode ? "text-white" : "text-black"}`}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              onChange={onChange}
              id="email"
              name="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className={`form-label ${darkMode ? "text-white" : "text-black"}`}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
              id="password"
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className={`form-label ${darkMode ? "text-white" : "text-black"}`}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              name="cpassword"
              id="cpassword"
              minLength={5}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
