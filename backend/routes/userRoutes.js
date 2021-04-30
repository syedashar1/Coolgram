import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from '../utils.js'
import Seller from '../models/sellerModel.js';


const userRouter = express.Router();


userRouter.post( '/signin', expressAsyncHandler(async (req, res) => {
          
        

        const user = await User.findOne({ email: req.body.email });
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
              _id: user._id,
              email: user.email,
              token: generateToken(user),
              isSeller : user.seller || false ,
            });
            return;
          }
        }
        res.status(401).send({ message: 'Invalid email or password' });
      })
);


userRouter.get( '/:id' , expressAsyncHandler(async (req, res) => {
        console.log("getting 1 user");
        const user = await User.findById(req.params.id);
        console.log(user);
        res.send(user);
      })
);



userRouter.post('/register' , expressAsyncHandler( async (req , res) => {
        console.log('regiter');

        const newUser = new User(req.body);
      
        const alreadyEmail = await User.findOne({ email: req.body.email });
        
        if( alreadyEmail ) {
          res.status(401).send({ message: 'email already used' });
        }
      
        if( !newUser.password ) {
          res.send("enter password")
        }
      
        
        newUser.password = bcrypt.hashSync( newUser.password , 8 )
      
        const createdUser = await newUser.save();
        console.log(createdUser);
        res.send({
          _id: createdUser._id,
          email: createdUser.email,
          token: generateToken(createdUser),
          isSeller : createdUser.seller || false ,
        });

}))



userRouter.post('/registerSeller' , expressAsyncHandler( async (req , res) => {
        console.log('regiter Seller');

        const newUser = new Seller(req.body);
      
        const alreadyEmail = await Seller.findOne({ email: req.body.email });
        
        if( alreadyEmail ) {
          res.status(401).send({ message: 'email already used' });
        }
      
        if( !newUser.password ) {
          res.send("enter password")
        }
      
        
        newUser.password = bcrypt.hashSync( newUser.password , 8 )
      
        const createdUser = await newUser.save();
        console.log(createdUser);
        res.send({
          _id: createdUser._id,
          email: createdUser.email,
          token: generateToken(createdUser),
          isSeller : createdUser.seller || false ,
        });

}))



userRouter.get("/", async (req, res) => {
  
  const pageSize = 5 ;
  const page = Number(req.query.pageNumber) || 1;

  const users = await User.find({}).skip(pageSize * (page - 1)).limit(pageSize);

  res.send(users);

    
}); 




export default userRouter;

