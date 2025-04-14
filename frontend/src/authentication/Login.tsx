import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

interface User {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", user);
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error: any) {
      alert("Error: " + (error.response?.data?.error || "Unexpected error"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
