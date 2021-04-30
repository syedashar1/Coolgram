import mongoose from 'mongoose';


const fragranceSchema = new mongoose.Schema(
{

        name : { type : String , required : true , unique : true },
        brand : { type : String },
        sellers : [String] ,
        rating : {type : Number , default : 0 } ,
        totalRating : {type : Number , default : 0 } ,
        notes : [String] ,
        description : {type : String} , 
        image : {type: String } ,
        reviews : [ String ],

} ,
{
        timestamps: true,
}
);


const Fragrance = mongoose.model('Fragrance', fragranceSchema);
export default Fragrance;


      