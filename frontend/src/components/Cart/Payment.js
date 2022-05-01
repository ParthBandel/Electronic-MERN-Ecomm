import React, { Fragment, useEffect, useRef } from 'react'
import './Payment.css';
import CheckoutSteps from './CheckoutSteps';
import { useSelector, useDispatch} from 'react-redux';
import MetaData from '../MetaData';
import {createOrder, clearErrors} from '../../actions/orderAction';
import { Typography } from '@material-ui/core';



const Payment = ({ history }) => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch = useDispatch();
    const payBtn = useRef(null);


    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { error } = useSelector((state) => state.newOrder); 
 


    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
    };

    

    const submitHandler = async(e) => {
      e.preventDefault();
      if(!error){
        console.log(order);
        dispatch(createOrder(order));
        console.log("Order created");
        history.push("/success");
      }
      else{
        console.log(error);
      }
    }
    useEffect(() => {
      if (error) {
        console.log(error);
        dispatch(clearErrors());
      }
    }, [dispatch, error]);
    
  return (
    <Fragment>
      <MetaData title="Payment" /> 
      <div className='bg_screen'>
      <CheckoutSteps activeStep={2}/>
      <div className='paymentContainer'>
          <Typography>Payment Info</Typography>
          <p>The payment method available as of now is <span>CASH ON DELIVERY</span> </p>
          <p>Click ahead to continue with the order</p>
          <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
          <input
          type="submit"
          value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
          ref={payBtn}
          className="paymentFormBtn"
          />
        </form>
      </div>
      </div>
    </Fragment>
  )
}
export default Payment