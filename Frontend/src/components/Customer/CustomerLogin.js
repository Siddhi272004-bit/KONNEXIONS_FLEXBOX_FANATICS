import React, { useState } from 'react';
import './styles_copy.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCustomerLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', { email, password })
        .then(res => {
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            navigate('/CustomerDashboard');
        })
    .catch(err => {
    setError("Invalid customer credentials");
  });

      alert(`Welcome, ${res.data.name}`);
      window.location.href = '/dashboard.html';
    } catch (err) {
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Customer Login</h2>
        <form onSubmit={handleCustomerLogin}>
          <input type="email" placeholder="Customer Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn primary full-width">Login</button>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
