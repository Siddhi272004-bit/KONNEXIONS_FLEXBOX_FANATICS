import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CustomerLogin from './components/Customer/CustomerLogin';
import VendorLogin from './components/Vendor/VendorLogin';
import CustomerDashboard from './components/Customer/CustomerDashboard';
import VendorDashboard from './components/Vendor/VendorDashboard';
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/customer" element={<CustomerLogin />} />
          <Route path="/login/vendor" element={<VendorLogin />} />
          <Route path="/dashboard/customer" element={<CustomerDashboard />} />
          <Route path="/dashboard/vendor" element={<VendorDashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
