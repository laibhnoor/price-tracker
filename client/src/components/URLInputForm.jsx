import React, { useState } from 'react';

const URLInputForm = () => {
    const [url, setUrl] = useState('');
    // You would replace this with your actual authentication state
    const isUserSignedUp = false;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isUserSignedUp) {
            alert('Please sign up or log in to track a product!');
            return;
        }
        console.log('URL submitted:', url);
        // Add your scraping logic here
    };

    return (
        <form onSubmit={handleSubmit} className="url-form">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste the product URL here..."
                className="url-input"
            />
            <button type="submit" className="url-submit-btn">
                Track Price
            </button>
        </form>
    );
};

export default URLInputForm;