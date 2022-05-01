import React from "react";
import { Link} from "react-router-dom";
import {logout} from '../../actions/userAction';
import { useDispatch, useSelector} from "react-redux";
import "./Header.css";
import { useAlert } from "react-alert";


function Header() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {user, isAuthenticated} = useSelector(state => state.user) 


    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
  
    const getCartCount = () => {
      return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    };

    const logoutHandler = () => {
        dispatch(logout())
        alert.success("Logged out Succesfully");
    }

    return (
        <header className="header">
            <Link to="/">
            <div className="logo">ESHOP</div>
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link to="/search">
                            Search
                        </Link>
                    </li>
                    <li>
                        <Link to="/products">
                            Products
                        </Link>
                    </li>
                    {isAuthenticated ? ( 
                        <li>
                            <button className="log_button" onClick={logoutHandler}>Logout</button>
                        </li>
                    ):(
                        <li>
                            <Link to="/account/login">
                                Log In
                            </Link> 
                        </li>
                    )}
                    <li>
                        <Link to="/cart" className="cart_link">
                            Cart
                        </Link>
                    </li>
                    {/* {isAuthenticated && user.isAdmin (
                        <li>
                            <Link to="/admin/dashboard">Admin Board</Link>
                        </li>
                    )}  */}
                </ul>
            </nav>
        </header>
    )
}

export default Header
