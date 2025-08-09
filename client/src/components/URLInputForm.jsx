import React, { useState } from 'react';
import api from '../api';

const URLInputForm = ({ isLoggedIn, onProductTracked }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLoggedIn) {
      alert('Please log in to track a product!');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/products', { url });
      onProductTracked(res.data); // Pass the new product back to the parent
      setUrl(''); // Clear the input on success
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to track product.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="url-form">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste the product URL here..."
        className="url-input"
        disabled={loading}
      />
      <button type="submit" className="url-submit-btn" disabled={loading}>
        {loading ? 'Tracking...' : 'Track Price'}
      </button>
      {error && <p className="url-form-error">{error}</p>}
    </form>
  );
};

export default URLInputForm;

// Add this style to your App.css for the error message
/*
.url-form-error {
  color: #e53e3e;
  text-align: center;
  width: 100%;
  margin-top: 1rem;
}
*/