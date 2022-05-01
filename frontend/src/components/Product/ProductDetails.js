import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductDetails, getRelatableProducts, clearError, newReview} from '../../actions/productAction';
import {addtoCart} from '../../actions/cartAction';
import './ProductDetails.css'
import Header from '../Header/Header';
import ProductCard from './ProductCard';
import {Dialog, DialogActions, DialogTitle, DialogContent, Button} from '@material-ui/core';
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import {useAlert} from 'react-alert';
import ReviewCard from './ReviewCard';


const ProductDetails = ({match, history}) => {

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert(); 

  const { loading, error, product} = useSelector((state) => state.productDetails)
  const {success, error: reviewError } = useSelector((state) => state.newReview);
  const {products} = useSelector((state) => state.relatableProduct);



  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    dispatch(newReview({
      rating,
      comment,
      productId: match.params.id,  

    }));

    setOpen(false);
  };

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearError());
    }

    if(reviewError){
      alert.error(reviewError);
      dispatch(clearError());
    }
    if(success){
      alert.success("Your review is submitted");
      dispatch({type: NEW_REVIEW_RESET })
    }
    if(product && match.params.id !== product._id){ 
      dispatch(getProductDetails(match.params.id))
      .then(() => dispatch(getRelatableProducts()));
    }
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  const addToCartHandler = () => {
    dispatch(addtoCart(product._id, qty));
    console.log("Item added to cart");
    history.push("/cart");
  };

  return(
    <div>
      <Header/>
    <div className="productscreen"> 
    {loading ? (
    <h2>Loading..</h2>
    ) : error ? (
      <h2>{error}</h2>
    ) : (
      <>
        <div className="productscreen__left">
          <div className="left__image">
           { product && product.images && <img src={product.images[0].url} alt={product.name} className="image"/>}
          </div>
          <div className="left__info">
            <p className="left__name">{product.name}</p> 
            <p>Price: ₹{product.price}</p>
            <p>Description: {product.description}</p>
          </div>
        </div>
        <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price:
                <span>₹{product.price}</span>
              </p>
              <p>
                Status:
                <span>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p>
                Qty
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" className='cart_button' onClick={addToCartHandler}>
                  Add To Cart
                </button>
                <br></br>
                <button type='button' onClick={submitReviewToggle}>
                  Submit Review
                </button>
              </p>
            </div>
          </div>
      </>
    )} 
     </div>
     <div>
       <h3 className='reviewsHeading'>REVIEWS</h3> 
       <Dialog 
       aria-labelledby='simple-dialog-title'
       open={open} 
       onClose={submitReviewToggle}>
         <DialogTitle>Submit Review</DialogTitle>
         <DialogContent className='submitDialog'>
           <Rating
           onChange={(e, newValue) => {setRating(newValue); }}
           name="simply-controlled"
           value={rating}
           precision={0.5} 
           max={5}
           size='large'/> 
           <textarea 
           className='submitDialogTextArea' 
           cols='30'
           rows='5'
           value={comment}
           onChange={(e) => setComment(e.target.value)}></textarea> 
         </DialogContent>
         <DialogActions>
           <Button color="secondary" onClick={submitReviewToggle}>
             Cancel
           </Button>
           <Button color="primary" onClick={reviewSubmitHandler}>
             Submit
           </Button>
         </DialogActions>
       </Dialog> 
       {product.reviews && product.reviews[0] ? (
         <div className='reviews'>
           {product.reviews && 
           product.reviews.map((review) =>(
             <ReviewCard key={review._id} review={review}/>
       ))}
         </div>
       ): ( 
         <p className='noReviews'>No Reviews Yet</p> 
       )}
     </div>
     {/* Relatable Products */}
     <div className='relatable_products'> 
            <h1 className='rproducts_h1'>You may also like</h1>
            <div className="rp_container">
            {products.map((item) => (
              <ProductCard 
              key={item._id}
              product={item}
              />))} 
            </div>
          </div>
     </div>
  );
};

export default ProductDetails;
