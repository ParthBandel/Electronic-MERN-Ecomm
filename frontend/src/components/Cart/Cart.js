import React , { useEffect } from 'react'
import './Cart.css';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import {addtoCart, removeItemsFromCart} from '../../actions/cartAction';
import {useAlert } from 'react-alert'; 
import UserOptions from '../Header/UserOptions';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap"


const Cart = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {cartItems} = useSelector((state) => state.cart); 
    const {user, isAuthenticated} = useSelector((state) => state.user);

    useEffect(() => {}, []);

    const qtyChangeHandler = (id, qty) => {
        dispatch(addtoCart(id, qty));
        alert.success("Added to Cart")
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeItemsFromCart(id));
    alert.success("Removed from Cart");
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => { 
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };
  // const history = useHistory();
  const checkoutHandler = () => {
    history.push("/account/login?redirect=shipping");
  };

    return (
        <> 
          {isAuthenticated && <UserOptions user={user}/>} 
        <div className="cartscreen">
          <div className="cartscreen__left">
            <h2>Shopping Cart</h2>
  
            {cartItems.length === 0 ? (
              <div>
                Your Cart Is Empty <Link to="/products">Go Back</Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.product}
                  item={item}
                  qtyChangeHandler={qtyChangeHandler}
                  removeHandler={removeFromCartHandler}
                />
              ))
            )}
          </div>
  
          <div className="cartscreen__right">
            <div className="cartscreen__info">
              <p>Subtotal ({getCartCount()}) items</p>
              <p>₹{getCartSubTotal()}</p>
            </div>
            <div>
            <Button onClick={checkoutHandler} >
                Proceed To Checkout
              </Button>
            </div>
          </div>
        </div>
      </>
    ); 
};

export default Cart