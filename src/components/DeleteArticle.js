import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteArticle() {
  const [articleId, setArticleId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch user role (admin or not) when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/api/user-roleb')  // Replace with your API endpoint to get the user role
      .then(response => {
        const userRole = response.data.role;
        setIsAdmin(userRole === 'admin');
      })
      .catch(error => {
        console.error('Error fetching user role: ', error);
      });
  }, []);

  const handleDelete = async () => {
    if (!isAdmin) {
      setError('You are not authorized to delete articles.');
      return;
    }

    try {
      // Make a DELETE request to the API endpoint to delete the article
      await axios.delete(`http://localhost:3000/api/articles/${articleId}`);
      setSuccessMessage('Article Deleted Successfully');
      setError('');
    } catch (error) {
      setError('Article deletion failed. Please check the article ID and your data.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Delete Article</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <div>
          <input
            type="text"
            placeholder="Article ID"
            value={articleId}
            onChange={(e) => setArticleId(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleDelete}>
          Delete Article
        </button>
      </form>
    </div>
  );
}

export default DeleteArticle;
