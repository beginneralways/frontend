


import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (token) => {
    setSuccessMessage('Login Successful');
    setError(''); // Clear any previous error messages

    // Set the token as a cookie with a 7-day expiration (adjust the expiration as needed)
    document.cookie = `token=${token}; max-age=604800; path=/`;

    // Redirect or perform other actions after successful login
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the login API endpoint
      const response = await axios.post('http://localhost:3000/api/login', formData);

      // Handle a successful login
      handleLoginSuccess(response.data.token);

    } catch (error) {
      // Handle login errors
      setError('Login failed. Please check your credentials.');
      setSuccessMessage(''); // Clear any previous success message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {document.cookie.includes('token') && (
        <p>
          <Link to="/write">Write an Article</Link>
        </p>
      )}
    </div>
  );
}

export default Login;
