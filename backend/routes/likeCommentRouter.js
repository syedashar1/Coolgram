import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from '../utils.js'
import Seller from '../models/sellerModel.js';


const likeCommentRouter = express.Router();








likeCommentRouter.put( '/like/:id/:postid', isAuth , expressAsyncHandler(async (req, res) => {
          
        // const user = await User.findById(req.user._id);

        const otherUser = await User.findById(req.params.id);

        var found = false
        

        if ( otherUser ) {

                console.log('here');
                
                for(var i = 0 ; i < otherUser.posts.length ; i++ ){
                        
                        if (otherUser.posts[i]._id == req.params.postid ) {
                          console.log('found it !  at' , i );
                          found = true
                          break
                        }
                      }

                if (found) {
                        
                        if( otherUser.posts[i].likes.indexOf(req.user._id) == -1 ){

                                otherUser.posts[i].likes.push(req.user._id)
                                console.log('liked');
                                console.log(otherUser.posts[i].likes);
                        }
                        else{

                                otherUser.posts[i].likes = otherUser.posts[i].likes.filter(e=>e != req.user._id )
                                console.log('unliked');
                                console.log(otherUser.posts[i].likes);

                        }


                        await otherUser.save()
                        res.send({message : 'liked'})


                }


          }
        
      
}))




likeCommentRouter.get( '/getlikes/:id/:postid' , expressAsyncHandler(async (req, res) => {
          

        const otherUser = await User.findById(req.params.id);

        var found = false
        console.log('here');

        if ( otherUser ) {

                
                
                for(var i = 0 ; i < otherUser.posts.length ; i++ ){
                        
                        if (otherUser.posts[i]._id == req.params.postid ) {
                          console.log('found it !  at' , i );
                          found = true
                          break
                        }
                }

                if (found) {   
                        const users = await User.find({  '_id': { $in: otherUser.posts[i].likes} } , ' _id name profilePic ' );
                        res.send(users)
                }
                else {
                        res.status(401).send({message : 'post not found'})
                }




        }
        
      
}))







export default likeCommentRouter
//     liker.oursLiked = liker.oursLiked.filter(e=>e!== req.body.family )
//     liker.forChat.push(req.body.family)