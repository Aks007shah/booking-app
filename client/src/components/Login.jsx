import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
import Loader from "./Loader";


function Login(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return window.alert("Fill all Fields");
    } else {
      const user = {
        name,
        email,
        password,
      };

      try {
        setLoading(true);
        const response = await axios.post("/api/auth/login", user);
        setMessage(response.data.message);
        setLoading(false);

        localStorage.setItem("users", JSON.stringify(response));
        
        const userData = response.data.data;

        if (userData && userData.name) {
          setUserName(userData.name); 
        }

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("There was an error logging in!", error);
        setMessage("Error logging in. Please try again.");
      }
    }
  };

  return (
    <div>
    {userName && (
        <div>
          Welcome, <span className="text-danger">{userName}!</span>
        </div>
      )}
      <form onSubmit={login} className="shadow-lg p-3 mb-5 bg-body rounded">
        <h3 className="mb-5 text-danger">Login Now!</h3>
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
          />
        </div>
        <div className="text-success">{message}</div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      
    </div>
  );
}

export default Login;
