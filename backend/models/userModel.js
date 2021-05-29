import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
{
        name : { type : String } ,

        email: { type:String , required:true , unique : true},


        password:{ type:String , required:true},

        resetToken:String,
        expireToken:Date,

        age : {type : Number } ,

        country : { type : String , required : true } ,

        city : { type : String } ,
        
        bio : { type : String } ,

        profilePic : {type: String },

        location : {
                latitude : {type : Number} , 
                longitude : {type : Number}
                
        } ,

        ratingsTo : [{
                product : {type: String},
                reviews : {type : String},
                rating : {type : String},
        }] ,


        favouriteNotes : [String] ,


        sotd : {
                scent : {type : String} ,
                about : {type : String} ,
        } ,

        posts : [{
                pic : {type : String} , 
                caption : {type : String} , 
                likes : [String] , 
                createdAt  : { type : Date, default: Date.now } ,


                comments : [{
                        id : {type : String} ,
                        comment : {type : String} ,
                }] ,

                showComments : {type:Boolean , default:true}

        }] ,
        
        
        savedPosts : [{
                postedBy : { type : String} ,
                postId : { type : String} ,
        }] ,




        decants : [
                {
                        name : { type : String } ,
                        size : { type : Number } ,
                        avaliable : { type : Number } ,
                        price : { type : Number } ,
                        status : {type : String , default : "Avaliable"} ,
                        description : { type : String } , 
                        deliveryCharges : { type : Number },
                        pics : [String]
                }
        ] , 



        forChat : [String] ,

        newMessages:[String] ,
        
        conversations : [{
                recipients : [String] , 
                messages : [
                        {sender : String ,
                        text : String }  
                ]
        }], 
        
        newNotifications : {type : Number , default : 0} ,

        notification : [{
                type : { type : String } ,
                by : { type : String } ,
                post : { type : String } ,
                comment : { type : String } ,
        }]


} ,
{
        timestamps: true,
}
);


const User = mongoose.model('User', userSchema);
export default User;

