import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { ListForChatReducer } from './reducers/chatReducers';
import { createPostReducer, profilePicReducer } from './reducers/imagesReducers';
import { getLikesReducer, likeReducer } from './reducers/likeCommentReducer';
import {  userRegisterReducer, userSigninReducer , getDetailsReducer, userListReducer } from './reducers/userReducers';



const initialState = {};


const reducer = combineReducers({

  userSignin : userSigninReducer ,
  userRegister : userRegisterReducer ,
  getDetails : getDetailsReducer ,
  userList : userListReducer ,
  
  
  profilePic : profilePicReducer ,
  createPost : createPostReducer ,


  ListForChat : ListForChatReducer ,



  like : likeReducer ,
  getLikes : getLikesReducer ,


  
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;