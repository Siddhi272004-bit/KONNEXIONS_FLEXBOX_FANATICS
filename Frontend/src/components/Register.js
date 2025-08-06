// import React, { useState } from 'react';
// import './Register.css';

// function Register() {
//   const [isCustomer, setIsCustomer] = useState(true);

//   const handleToggle = () => {
//     setIsCustomer(!isCustomer);
//   };

//   return (
//     <div className="register-container">
//       <div className={`register-box ${isCustomer ? 'left-active' : 'right-active'}`}>
//         {/* Left Panel */}
//         <div className="panel left-panel">
//           <div className="content">
//             <h2>Hello, Vendor!</h2>
//             <p>If you are a vendor, click below to register</p>
//             <button className="toggle-btn" onClick={handleToggle}>
//               Register as Vendor
//             </button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="panel right-panel">
//           <div className="content">
//             <h2>Hello, Customer!</h2>
//             <p>If you are a customer, click below to register</p>
//             <button className="toggle-btn" onClick={handleToggle}>
//               Register as Customer
//             </button>
//           </div>
//         </div>

//         {/* Form Panel */}
//         <div className="form-container">
//           <form className="register-form">
//             <h2>{isCustomer ? 'Customer Register' : 'Vendor Register'}</h2>
//             <input type="text" placeholder="Name" required />
//             <input type="email" placeholder="Email" required />
//             <input type="password" placeholder="Password" required />
//             <button type="submit">Register</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [isCustomer, setIsCustomer] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    vendorID: '',  // Only used for vendor
  });

  const handleToggle = () => {
    setIsCustomer(!isCustomer);
    setFormData({ name: '', email: '', password: '', vendorID: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isCustomer
        ? 'http://localhost:5000/api/user/register'
        : 'http://localhost:5000/api/vendor/register';


    try {
      const res = await axios.post(endpoint, formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className={`register-box ${isCustomer ? 'left-active' : 'right-active'}`}>
        <div className="panel left-panel">
          <div className="content">
            <h2>Hello, Customer!</h2>
            <p>If you are a Customer, click below to register</p>
            <button className="toggle-btn" onClick={handleToggle}>
              Register as Customer
            </button>
          </div>
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h2>Hello, Vendor!</h2>
            <p>If you are a Vendor, click below to register</p>
            <button className="toggle-btn" onClick={handleToggle}>
              Register as Vendor
            </button>
          </div>
        </div>

        <div className="form-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>{isCustomer ? 'Customer Register' : 'Vendor Register'}</h2>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            {!isCustomer && (
              <input type="text" name="vendorID" placeholder="Vendor ID" value={formData.vendorID} onChange={handleChange} required />
            )}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
