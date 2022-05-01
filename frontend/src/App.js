import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import './App.css';
import React, { useState } from "react";
import WebFont from 'webfontloader';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Products from './components/Product/Products';
import NewProduct from "./components/seller/NewProduct";
import Login from './components/User/Login';
import ProductDetails from './components/Product/ProductDetails';
import Register from "./components/User/Register";
import store from './store';
import { loadUser } from "./actions/userAction";
import Shipping from "./components/Cart/Shipping";
import Cart from './components/Cart/Cart';
import Profile from './components/User/Profile';
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Dashboard from "./components/Admin/Dashboard.js"
import { useSelector } from "react-redux";
import axios from "axios";
import Payment from './components/Cart/Payment';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrder from './components/Order/MyOrder';
import OrderList from './components/Admin/OrderList';
import ProductList from './components/Admin/ProductList';
import UserList from "./components/Admin/UserList";
import OrderDetails from "./components/Order/OrderDetails";
import ProductReviews from "./components/Admin/ProductReviews";
import Footer from './components/Footer/Footer';
import Search from "./components/Product/Search";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UserOptions from "./components/Header/UserOptions";

function App() {

  const {isAuthenticated, user} = useSelector((state) => state.user)

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  },[])
  let toggle = false; 
  // function toggleFunc(){
  //   const width = hasWindow ? window.innerWidth : null; 
  //   console.log(width);
  // }
  // console.log(toggle + " "+ width);
  return (
    <Router> 
      {isAuthenticated && <UserOptions user={user}/>} 
    <main className="app">
        <Switch>
          <Route path="/account/login" component={Login}>
          </Route>
          <Route path="/account/register">
            <Register />
          </Route>
          <Route path="/cart" component={Cart}></Route>
          <Route exact path="/product/new" component={NewProduct} />
          <Route exact path="/product/:id" component={ProductDetails}/>
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:keyword" component={Products} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/account" component={Profile}></Route>
          <Route exact path="/account/shipping" component={Shipping}></Route>
          <Route exact path="/order/confirm" component={ConfirmOrder}></Route>
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/success" component={OrderSuccess} />
          <Route exact path="/orders" component={MyOrder}/>
          <Route exact path="/order/:id" component={OrderDetails}/>
   
          <Route path = "/products/:id/relatableProducts"/>
          <Route exact path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/admin/users" component={UserList} />
          <Route exact path="/admin/products" component={ProductList}/>
          <Route exact path="/admin/orders"component={OrderList}/>
          <Route exact path="/admin/reviews"component={ProductReviews} />
          <Route exact path="/admin/order/:id" component={ProcessOrder}/>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
    </main>
    </Router>
  );
}

export default App;
