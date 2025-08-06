import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VendorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/vendors/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        // Save token or redirect as needed
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Vendor Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Vendor Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn primary full-width">Login</button>
        </form>
      </div>
    </div>
  );
};

export default VendorLogin;
