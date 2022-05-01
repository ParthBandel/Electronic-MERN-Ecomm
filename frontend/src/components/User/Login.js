import React,{Fragment, useEffect, useState} from 'react';
import './Login.css';
import {Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {login, clearError} from '../../actions/userAction';
import Loader from '../Loader/Loader';
import Header from '../Header/Header';
import { useAlert } from 'react-alert';
import loginImg from '../../images/login.svg';

const Login = ({location, history}) => {

    const dispatch = useDispatch(); 
    // let history = useHistory();
    const alert = useAlert(); 
    const {error, loading, isAuthenticated } = useSelector(state => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email,password)); 
        alert.success("Succesfully Logged In");
    }

    const redirect = location.search ? location.search.split("=")[1] : "/";
    useEffect(() => {

        if(error){
            dispatch(clearError());
            alert.error(error); 
        }
        if(isAuthenticated){
            history.push(redirect);
        }
    }, [isAuthenticated, error, dispatch, history, redirect])


  return(
      <Fragment>
      {loading ? (<Loader />) : (  
    <div className='login_screen'>
        <Header /> 
      <div>
      <section className="main_frame">
           <div className="card_login">
          <form className="form" onSubmit={submitHandler}>
              <h1>Login</h1>
              <div className="control">
                  <label htmlFor="email" className="hidden">Username: </label>
                  <input type="email" required className="email" placeholder="Email" autoCapitalize="off" autoFocus
                onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="control">
                  <label htmlFor="password" className="hidden">Password: </label>
                  <input type="password" required className="password" placeholder="Password" 
                  onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="action_buttons">
                  <button>Sign In</button>
              </div>
              <div className='register_line'>
                  <Link to="/account/login" className='register_link'>
                    <p className='p_tag'>Forget Password</p>
                  </Link>
              </div>
              <div className="register_line">
                  <Link to="/account/register" className="register_link">
                    <p className="p_tag">Not a registered User? Sign Up Now!</p>
                  </Link>
              </div>
          </form>
      </div>
      </section>
      </div>
      </div>
      )}
    </Fragment>
  )
};

export default Login;
