import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./Register.css";


interface User {
  loginid: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [user, setUser] = useState<User>({ loginid: "", email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/register", user);
      alert(response.data.message);
    } catch (error: any) {
      alert("Error: " + (error.response?.data?.error || "Unexpected error"));
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="loginid" placeholder="Username" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;
