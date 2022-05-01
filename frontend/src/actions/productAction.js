import axios from "axios";

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    CLEAR_ERROR,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    RELATABLE_PRODUCT_FAIL,
    RELATABLE_PRODUCT_REQUEST,
    RELATABLE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
} from '../constants/productConstants';

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/admin/products");
    //console.log(data);

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get all products
export const getProduct = (keyword = "", currentPage=1, price = [0,25000])=> async (dispatch)=>{
    try{
        dispatch({
            type:ALL_PRODUCT_REQUEST
        });
        let link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        const {data} = await axios.get(link);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        });
    }
    catch(error){
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload:error.response.data.message,
        })
    }
};

//get relatable product
export const getRelatableProducts = () => async (dispatch)=>{
  try{
    dispatch({ type: RELATABLE_PRODUCT_REQUEST });

    const {data} = await axios.get("/product/:id/relatableProducts");
    //console.log(data);
    dispatch({
      type: RELATABLE_PRODUCT_SUCCESS, 
      payload: data 
    }); 
  } 
  catch(error){
    dispatch({
      type: RELATABLE_PRODUCT_FAIL,
      payload: error.response.data.message
    })
  }
}

//product details
export const getProductDetails = (id)=> async (dispatch)=>{
  try{
      dispatch({
          type:PRODUCT_DETAILS_REQUEST
      });

      const {data} = await axios.get(`/product/${id}`);
      //console.log(data);
      dispatch({
          type:PRODUCT_DETAILS_SUCCESS,
          payload:data.product,
      });
  }
  catch(error){
      dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload:error.response.data.message,
      });
  }
};

//clear errors
export const clearError = ()=> async (dispatch)=> {
    dispatch({
        type: CLEAR_ERROR,
    });
};

//new product
export const createProduct = (productData) => async (dispatch) => {
  //console.log("Trial");
  //console.log(productData)
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/product/new`,
        productData,
        config
      );
      //console.log("Done");
      //console.log(data);

      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// delete products 
export const deleteProduct = (id) => async(dispatch) => {
  try{
    dispatch({type: DELETE_PRODUCT_REQUEST});

    const { data } = await axios.delete(`/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS, 
      payload: data.success 
    });
  }
  catch(error){
    dispatch({
      type: DELETE_PRODUCT_FAIL, 
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData)=> async (dispatch)=>{
  try{
      dispatch({
          type:NEW_REVIEW_REQUEST
      });

      const config = {
        headers: {"Content-Type" : "application/json"},
      };
      
      const { data } = await axios.put(`/review`, reviewData, config);
      //console.log(data);
      dispatch({
          type:NEW_REVIEW_SUCCESS,
          payload:data.success,
      });
  }
  catch(error){
      dispatch({
          type: NEW_REVIEW_FAIL,
          payload:error.response.data.message,
      });
  }
};
// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/admin/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/admin/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

