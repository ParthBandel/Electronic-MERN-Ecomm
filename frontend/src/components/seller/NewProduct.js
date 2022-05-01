import React from 'react';
import NewProductForm from './NewProductForm';
import './NewProduct.css';

const NewProduct = () => {

  return (
  <section>
    <h1 className="section-heading">Add New Product</h1>
    <div className="main">
    <NewProductForm />
    </div>
  </section>
  );
};

export default NewProduct;
