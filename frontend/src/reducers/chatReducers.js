import { LIST_FORCHAT_FAIL, LIST_FORCHAT_REQUEST, LIST_FORCHAT_SUCCESS } from '../types/chatTypes'




export const ListForChatReducer = (state = { loading: true }, action) => {
        switch (action.type) {
          case LIST_FORCHAT_REQUEST:
            return { loading: true };
          case LIST_FORCHAT_SUCCESS:
            console.log(action.payload);
            return { loading: false, users : action.payload };
          case LIST_FORCHAT_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
      };