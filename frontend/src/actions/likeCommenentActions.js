import Axios from 'axios';
import { GET_LIKES_FAIL, GET_LIKES_REQUEST, GET_LIKES_SUCCESS, LIKE_FAIL, LIKE_REQUEST, LIKE_SUCCESS } from '../types/likeCommentTypes';

export const like = ({id , postid}) => async (dispatch , getState) => {

        const userInfo = getState().userSignin.userInfo
        dispatch({ type: LIKE_REQUEST  });
        console.log(id);
      
        try {
                const { data } = await Axios.put(`/api/likecomment/like/${id}/${postid}`, {} , {
                        headers: { Authorization: `Bearer ${userInfo.token}` } } )  
                dispatch({ type: LIKE_SUCCESS , payload : data });
        } 
      
        catch (error) {
              dispatch({
                      type: LIKE_FAIL,
                      payload:
                      error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message,
          });
        }




};



export const getLikes = ({id , postid}) => async (dispatch , getState) => {

        const userInfo = getState().userSignin.userInfo
        dispatch({ type: GET_LIKES_REQUEST  });
        
      
        try {
                const { data } = await Axios.get(`/api/likecomment/getlikes/${id}/${postid}`, {} , {
                        headers: { Authorization: `Bearer ${userInfo.token}` } } )    
             
                    
                dispatch({ type: GET_LIKES_SUCCESS , payload : data });
        } 
      
        catch (error) {
              dispatch({
                      type: GET_LIKES_FAIL,
                      payload:
                      error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message,
          });
        }




};