import React from 'react';

const ProductList = () => {
    // This will be populated with data from your backend
    const products = [
        { id: 1, name: 'High-Performance Wireless Mouse', price: '$89.99', url: '#' },
        { id: 2, name: 'Mechanical Keyboard with RGB', price: '$129.50', url: '#' },
        { id: 3, name: '4K Ultra-HD Monitor', price: '$349.00', url: '#' },
    ];

    return (
        <div className="product-grid">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <h3>{product.name}</h3>
                    <p>Current Price: {product.price}</p>
                    <a href={product.url} target="_blank" rel="noopener noreferrer" className="product-link">
                        View Product
                    </a>
                </div>
            ))}
        </div>
    );
};

export default ProductList;