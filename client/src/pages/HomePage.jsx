import React, { useState, useEffect } from 'react';
import URLInputForm from '../components/URLInputForm';
import ProductList from '../components/ProductList';
import api from '../api';

const HomePage = ({ isLoggedIn }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // This effect now correctly handles both logging in and logging out.
  useEffect(() => {
    const manageProductData = async () => {
      // If the user is logged in, fetch their products.
      if (isLoggedIn) {
        setLoading(true);
        try {
          const res = await api.get('/products');
          setProducts(res.data);
        } catch (error) {
          console.error("Failed to fetch products", error);
          // Also clear products in case of an API error
          setProducts([]); 
        } finally {
          setLoading(false);
        }
      } else {
        // --- THIS IS THE KEY ADDITION ---
        // If the user is logged out, clear the products from the state.
        setProducts([]);
      }
    };

    manageProductData();
  }, [isLoggedIn]); // This dependency correctly triggers the effect on login/logout

  // Function to add a newly tracked product to our list state
  const handleProductTracked = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  // Function to remove a product from our list state after deletion
  const handleProductDeleted = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <>
      <h1 className="page-title">Never Miss a Price Drop</h1>
      <URLInputForm isLoggedIn={isLoggedIn} onProductTracked={handleProductTracked} />
      <ProductList 
        products={products} 
        onDelete={handleProductDeleted} 
        isLoading={loading}
      />
    </>
  );
};

export default HomePage;