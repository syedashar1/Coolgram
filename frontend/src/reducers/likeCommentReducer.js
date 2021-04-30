import { GET_LIKES_FAIL, GET_LIKES_REQUEST, GET_LIKES_SUCCESS, LIKE_FAIL, LIKE_REQUEST, LIKE_SUCCESS } from '../types/likeCommentTypes';



export const likeReducer = ( state = { loading : true } , action) =>{

        switch (action.type){
                case LIKE_REQUEST :
                        return {loading : true}
                
                case LIKE_SUCCESS :
                        return { loading : false , user : action.payload }
                case LIKE_FAIL :
                        return { loading : false , error : action.payload }
                default:
                        return state;
        }


}



export const getLikesReducer = ( state = { loading : true } , action) =>{

        switch (action.type){
                case GET_LIKES_REQUEST :
                        return {loading : true}
                case GET_LIKES_SUCCESS :
                        return { loading : false , users : action.payload }
                case GET_LIKES_FAIL :
                        return { loading : false , error : action.payload }
                default:
                        return state;
        }


}