import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateArticle() {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    author: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const articleId = 'your-article-id'; // Replace with your article ID

  useEffect(() => {
    // Fetch the article when the component mounts
    axios.get(`http://localhost:3000/api/articles/${articleId}`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        setError('Error fetching article data. Please try again later.');
        console.error('Error fetching data: ', error);
      });
  }, [articleId]);

  const handleChange = event => {
    setArticle({
      ...article,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Update the article
    axios.put(`http://localhost:3000/api/articles/${articleId}`, article)
      .then(response => {
        setSuccessMessage('Article updated successfully.');
        setError('');
        console.log(response.data);
      })
      .catch(error => {
        setError('Error updating article. Please try again later.');
        console.error('Error updating article: ', error);
      });
  };

  return (
    <div>
      <h2>Update Article</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={article.title} onChange={handleChange} />
        </label>
        <label>
          Content:
          <textarea name="content" value={article.content} onChange={handleChange} />
        </label>
        <label>
          Author:
          <input type="text" name="author" value={article.author} onChange={handleChange} />
        </label>
        <button type="submit">Update Article</button>
      </form>
    </div>
  );
}

export default UpdateArticle;
