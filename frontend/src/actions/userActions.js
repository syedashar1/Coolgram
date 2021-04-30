import Axios from 'axios';
import { USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL , USER_SIGNIN_SUCCESS , USER_SIGNIN_FAIL , USER_LIST_REQUEST
        , USER_DETAILS_REQUEST , USER_DETAILS_SUCCESS , USER_DETAILS_FAIL , USER_SIGNOUT , USER_SIGNIN_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL
 } from "../types/userTypes";


export const signin = (email, password) => async (dispatch) => {

  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

  try {
        const { data } = await Axios.post('/api/users/signin', { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        } 

  catch (error) {
        dispatch({
                type: USER_SIGNIN_FAIL,
                payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
    });
  }
};

export const register = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { } });
  // console.log(user);
  try {
    const { data } = await Axios.post('/api/users/register', user );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {

    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log(error.response && error.response.data.message
      ? error.response.data.message
      : error.message,);

    
  }
};

export const registerSeller = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { } });
  // console.log(user);
  try {
    const { data } = await Axios.post('/api/users/registerSeller', user );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {

    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log(error.response && error.response.data.message
      ? error.response.data.message
      : error.message,);

    
  }
};


export const userDetails = (_id) => async (dispatch , getState) => {

      
      dispatch({ type: USER_DETAILS_REQUEST });
      console.log(_id);
      const userInfo = getState().userSignin.userInfo

      try {

        if (_id) {

          console.log(_id);
          const { data } = await Axios.get(`/api/users/${_id}`);
          // console.log(data);
          dispatch({ type: USER_DETAILS_SUCCESS , payload: data });
          
        }

        else{
            const { data } = await Axios.get(`/api/users/${userInfo._id}`, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              
            },
          });
            dispatch({ type: USER_DETAILS_SUCCESS , payload: data });
            console.log('id is not present');

        }




    
      } 
      
      catch (error) {

          const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};



export const signout = () => async (dispatch , getState) => {

  const userInfo = getState().userSignin.userInfo
  // if (localStorage.getItem('whatsapp-clone-conversations')) {
  //   const conversation =  JSON.parse(localStorage.getItem('whatsapp-clone-conversations'))
  
  // const { data } = await Axios.put(`/api/users/saveAll/${userInfo._id}` , conversation );
  // console.log(data);
  
  // }
  localStorage.clear();
  dispatch({ type: USER_SIGNOUT });
};



export const listUsers = ( pageNumber ) => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });

  try {
     
    const { data } = await Axios.get( `/api/users?pageNumber=${pageNumber}` );
    console.log(pageNumber);
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};
