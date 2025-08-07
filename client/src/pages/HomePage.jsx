// src/pages/HomePage.jsx
import React from 'react';
import URLInputForm from '../components/URLInputForm';
import ProductList from '../components/ProductList';

const HomePage = ({ isLoggedIn }) => {
  return (
    <>
      <h1 className="page-title">Never Miss a Price Drop</h1>
      <URLInputForm isLoggedIn={isLoggedIn} />
      <ProductList />
    </>
  );
};

export default HomePage;