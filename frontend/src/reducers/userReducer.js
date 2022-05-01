import {
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    LOGIN_REQUEST, 
    CLEAR_ERROR, 
    REGISTER_USER_FAIL, 
    REGISTER_USER_REQUEST, 
    REGISTER_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    LOGOUT_FAIL, 
    LOGOUT_SUCCESS, 
    DELETE_USER_FAIL, 
    DELETE_USER_REQUEST, 
    DELETE_USER_RESET, 
    DELETE_USER_SUCCESS, 
    USER_DETAILS_FAIL, 
    USER_DETAILS_REQUEST, 
    USER_DETAILS_SUCCESS} from '../constants/userConstants';


export const userReducer = (state = {user : {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return{
                loading: true, 
                isAuthenticated: false
            };
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            //console.log(action);
            return{
                ...state,
                user: action.payload,
                loading: false,
                isAuthenticated: true,
            };
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false 
            };   
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false, 
                user: null, 
                error: action.payload
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state, 
                error: null
            } 
        default:
            return state;
    } 
};

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case ALL_USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
  
      case ALL_USERS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
export const profileReducer = (state = {}, action) => {
  switch(action.type){
    case DELETE_USER_REQUEST:
      return{
        ...state, 
        loading: true
      };
    case DELETE_USER_SUCCESS:
      return{
        ...state,
        loading: false, 
        isDeleted: action.payload.message, 
        message: action.payload.message 
      }; 
    case DELETE_USER_FAIL:
      return{
        ...state, 
        loading: false, 
        error: action.payload
      };
    case DELETE_USER_RESET:
      return {
        ...state, 
        isDeleted: false
      };
    case CLEAR_ERROR:
      return{
        ...state,
        error: null
      }; 
    default:
      return state;
  }
}; 

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
