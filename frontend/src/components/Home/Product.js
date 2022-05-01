import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from 'react-rating-stars-component';
import './Home.css';


const Product = ({ product }) => {
    const options = {
        edit:false, 
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        isHalf : true, 
        value: product.ratings
    };
    
  return (
    <div className="productCard">
      <img src={product.images[0].url} alt={product.name} />

      <div className="product__info">
        <p className="info__name">{product.name}</p>
        
        <div>
          <ReactStars {...options}/><span>({product.numofReviews} Reviews)</span>
        </div>
        <p className="info__description">{product.description.substring(0, 100)}...</p>

        <p className="info__price">{`₹${product.price}`}</p>

        <Link to={`/product/${product._id}`} className="info__button"> 
          View
        </Link>
      </div>
    </div>
  )
};

export default Product;
