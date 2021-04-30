import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from '../utils.js'
import Seller from '../models/sellerModel.js';


const imageRouter = express.Router();


imageRouter.put( '/profilepic', isAuth , expressAsyncHandler(async (req, res) => {
          
        const user = await User.findById(req.user._id);
      
        if (user) {
          user.profilePic = req.body.profilePic
          await user.save()
          console.log({message : 'Profile Picture updated'});
          res.send({message : 'Profile Picture updated'})
          }
        
        else{
          res.status(401).send({ message: 'Profile Picture error' });
      
        }
      
      
}))



imageRouter.put( '/createpost', isAuth , expressAsyncHandler(async (req, res) => {
          
        const user = await User.findById(req.user._id);
      
        if (user) {
          
          user.posts.push({pic : req.body.url , caption : req.body.caption })
          await user.save()
          console.log({message : 'New Post Created!'});
          res.send({message : 'New Post Created!'})
          }
        
        else{
          res.status(401).send({ message: 'Error Creating Post' });
      
        }
      
      
}))



export default imageRouter;
