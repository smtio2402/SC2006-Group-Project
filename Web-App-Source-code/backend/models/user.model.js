import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true //must be unique
    },
    //will store the hashed password 
    password:{
        type:String,
        required: true 
    },
    //store user favourite carpark
    favourites: {
        type: [String], 
        default: []
    },
    history: [
        {
            carparkId: String,
            checkInTime: {
                type: Date,
            },
            checkOutTime: {
                type: Date,
            },
            expense: String
        }
    ]
      
},
{timestamps:true}
);

export default mongoose.model('User', userSchema);

