import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Success from "./Success";
import Error from "./Error";
import Loader from "./Loader";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", isError: false });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match", isError: true });
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    try {
      setLoading(true);
      setSuccess(false);
      setError(false);

      const response = await axios.post(
        `http://localhost:5000/api/auth/register`,
        user
      );
      setMessage({ text: response.data.message, isError: false });
      setLoading(false);
      setSuccess(true);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/account/login");
      }, 1500);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error registering. Please try again.";
      setMessage({ text: errorMsg, isError: true });
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      {success && <Success message={"Register Successful"} />}
      <form className="shadow-lg p-3 mb-5 bg-body rounded" onSubmit={register}>
        <h3 className="mb-5 text-danger">Register Now!</h3>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            className="form-control"
            id="name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="confirmPassword"
            className="form-control"
            id="confirmPassword"
            required
          />
        </div>
        <div>
          <p style={{ color: message.isError ? "red" : "green" }}>
            {message.text}
          </p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
