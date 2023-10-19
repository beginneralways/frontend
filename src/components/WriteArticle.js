import React, { useState } from 'react';
import axios from 'axios';

function WriteArticle() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isTokenValid = () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    return token !== '';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isTokenValid()) {
      setError('Unauthorized'); // Token is not valid
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/articles', formData, {
        withCredentials: true, // Send cookies with the request
      });
  
      if (response.status === 201) {
        // 201 Created status indicates success
        setSuccessMessage('Article Created Successfully');
        setError('');
      } else {
        // Handle other response status codes as needed
        setError('Article creation failed. Please check your data.');
        setSuccessMessage('');
      }
    } catch (error) {
      // Handle network errors or other issues
      setError('Article creation failed. Please check your data.');
      setSuccessMessage('');
    }
  };
  

  return (
    <div>
      <h2>Write an Article</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'green' }}>article created</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <textarea
            name="content"
            placeholder="Article Content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Article</button>
      </form>
    </div>
  );
}

export default WriteArticle;
