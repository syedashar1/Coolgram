import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import Fragrance from '../models/fragranceModel.js'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from '../utils.js'
import Seller from '../models/sellerModel.js';


const fragranceRouter = express.Router();


fragranceRouter.post('/register' , expressAsyncHandler( async (req , res) => {
        

        const newFragrance = new Fragrance(req.body);
        const createdFragrance = await newFragrance.save(); 
        res.send( createdFragrance );

}))




export default fragranceRouter;
