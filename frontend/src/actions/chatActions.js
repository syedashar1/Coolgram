import Axios from 'axios';
import { LIST_FORCHAT_FAIL, LIST_FORCHAT_REQUEST, LIST_FORCHAT_SUCCESS } from '../types/chatTypes'






export const avaliableForChat = () => async (dispatch , getState) => {
  
        const userInfo = getState().userSignin.userInfo
      
        dispatch({ type: LIST_FORCHAT_REQUEST });
      
      
        try {
          const { data } = await Axios.get(`/api/chat/forchat/${userInfo._id}`);
          // console.log(data);
          dispatch({ type: LIST_FORCHAT_SUCCESS, payload: data });
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message;
          dispatch({ type: LIST_FORCHAT_FAIL, payload: message });
        }
};