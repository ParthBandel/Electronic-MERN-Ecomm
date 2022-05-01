import React, { Fragment, useEffect, useState } from 'react';
import './Register.css';
import {Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {register, clearError} from '../../actions/userAction';
import Loader from '../Loader/Loader'; 
import Header from '../Header/Header';



const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    let history = useHistory(); 

    const {error, loading, isAuthenticated} = useSelector(state => state.user); 

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(register(name,email,password))
     }

     useEffect(() => {
        if(error){
            dispatch(clearError());
        }

        if(isAuthenticated){
            history.push("/account/login");
        }
    },[history, dispatch, history, isAuthenticated])


  return(
    <Fragment> 
    {loading ? (<Loader />) : (
        <div className='reg_screen'> 
        <Header /> 
        <div>
        <section className="main_frame">
        <div className="card_register">
       <form className="form" onSubmit={submitHandler}>
            <h1>Create Account</h1>
           <div className="control">
               <label htmlFor="name" className="hidden">Name: </label>
               <input type="text" required className="name" placeholder="Name" 
               onChange={(e) => setName(e.target.value)}/>
           </div>
           <div className="control">
               <label htmlFor="email" className="hidden">Email: </label>
               <input type="email" required className="email" placeholder="Email" 
               onChange={(e) => setEmail(e.target.value)}/>
           </div>
           <div className="control">
               <label htmlFor="password" className="hidden">Password: </label>
               <input type="password" required className="password" placeholder="Password"
               onChange={(e) => setPassword(e.target.value)}/>
           </div>
           <div className="action_button">
               <button>Sign Up</button>
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

export default Register;
