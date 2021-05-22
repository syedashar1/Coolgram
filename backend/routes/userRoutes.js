import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from '../utils.js'
import Seller from '../models/sellerModel.js';
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'
import crypto from 'crypto'


const userRouter = express.Router();

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
      api_key:'asdasdasdasdasddfgfgdgfgdf'
  }
}))




userRouter.post( '/signin', expressAsyncHandler(async (req, res) => {
          
        

        const user = await User.findOne({ email: req.body.email });
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
              _id: user._id,
              email: user.email,
              newMessages : user.newMessages ,
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
        const user = await User.findById(req.params.id);
        user.notification.reverse()
        res.send(user);
      })
);

userRouter.get( '/onlysaved/:id' , expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id , 'savedPosts' );
  res.send(user);
})
);


userRouter.get( '/single/:id' , expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id , '_id name profilePic' );
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





userRouter.post( '/reset', expressAsyncHandler(async (req, res) => {
          
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    


  }
  res.status(401).send({ message: 'Invalid email or password' });
})
);











userRouter.post('/reset-password',(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      console.log(req.body)

      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.status(422).json({error:"User dont exists with that email"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 3600000
          user.save().then((result)=>{
              transporter.sendMail({
                  to:user.email,
                  from:"no-replay@insta.com",
                  subject:"password reset",
                  html:`
                  <p>You requested for password reset</p>
                  <h5>click in this link to reset password</h5>
                  `
              })
              res.json(user)
          })

      })
  })
})





userRouter.post('/new-password',(req,res)=>{
  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
  .then(user=>{
      if(!user){
          return res.status(422).json({error:"Try again session expired"})
      }
      bcrypt.hash(newPassword,12).then(hashedpassword=>{
         user.password = hashedpassword
         user.resetToken = undefined
         user.expireToken = undefined
         user.save().then((saveduser)=>{
             res.json({message:"password updated success"})
         })
      })
  }).catch(err=>{
      console.log(err)
  })
})





userRouter.put( '/update', isAuth ,expressAsyncHandler(async (req, res) => {
          
  const user = await User.findById(req.user._id);
  if (user) {
    
    user.password = bcrypt.hashSync( req.body.password , 8 ) || user.password 
    
  }
   
  
  const createdUser = await user.save();
  console.log(createdUser);
  res.send({
    _id: createdUser._id,
    email: createdUser.email,
    token: generateToken(createdUser),
    isSeller : createdUser.seller || false ,
  });


})
);






export default userRouter;

