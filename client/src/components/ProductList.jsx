import React from 'react';
import api from '../api';

const ProductList = ({ products, onDelete, isLoading }) => {
  
  const handleDelete = async (productId) => {
    if(window.confirm('Are you sure you want to stop tracking this product?')) {
        try {
            await api.delete(`/products/${productId}`);
            onDelete(productId); // Update parent state
        } catch (error) {
            alert('Failed to delete product.');
            console.error("Delete error:", error);
        }
    }
  };
  
  if (isLoading) {
    return <p style={{textAlign: 'center'}}>Loading your products...</p>;
  }

  if (products.length === 0) {
    return <p style={{textAlign: 'center'}}>You are not tracking any products yet. Paste a URL above to get started!</p>;
  }
  
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <button className="delete-btn" onClick={() => handleDelete(product.id)}>&times;</button>
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="product-image" 
            style={{ width: '100%', height: 'auto', marginBottom: '10px', objectFit: 'contain' }}
          />
          <h3>{product.name}</h3>
          <p>Current Price: Rs. {product.current_price}</p>
          <a href={product.url} target="_blank" rel="noopener noreferrer" className="product-link">
            View Product
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
