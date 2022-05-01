import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"; 
import {composeWithDevTools} from "redux-devtools-extension";
import { newProductReducer, 
         productReducer, 
         productDetailsReducer, 
         relatableProductReducer, 
         productsReducer,
         newReviewReducer, 
         productReviewsReducer, 
         reviewReducer} from "./reducers/productReducer";
import {cartReducer} from './reducers/cartReducer';
import {userReducer,
        allUsersReducer, 
        profileReducer, 
        userDetailsReducer} from './reducers/userReducer';
import {allOrdersReducer, 
        orderReducer, 
        newOrderReducer, 
        myOrdersReducer, 
        orderDetailsReducer} from './reducers/orderReducer';


const reducer = combineReducers({
    products: productReducer,
    newProduct: newProductReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    relatableProduct: relatableProductReducer,
    profile: profileReducer,
    product: productsReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer, 
    productReviews: productReviewsReducer,
    review: reviewReducer, 
    userDetails : userDetailsReducer
});

let initialState={
    cart: {
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
};

const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;

