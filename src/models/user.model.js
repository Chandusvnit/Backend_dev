import mongoose , {Schema} from "mongoose";

const userSchema  = new Schema (
    {
        avatar : {
            type : {
                url : String,
                localpath : String,
            },
            default :{
                url :`https://placehold.co/200x150`,
                localpath :"",
            }
        },
        username :{
            type :String,
            required:true,
            unique : true,
            lowercase:true,
            idex:true,
            trim :true,
        },
        email :{
            type :String,
            required:true,
            unique : true,
            lowercase:true,
            trim :true,
        },
        Fullname :{
            type:String,
            trim :true,
            required:true,
        },
        password:{
            type:String,
            required:[true , "Password is Required"],
        },
        isEmailverified:{
            type:Boolean,
            default:false,
        },
        refreshToken:{
            type:String,
        },
        forgotPasswordToken:{
            type:String,
        },
        forgotPasswordExpiry:{
            type:Date,
        },
        emailVerificationToken:{
            type:String,
        },
        emailVerificationExpiry:{
            type:Date,
        }
    },
    {
        timestamps:true,
    }
)

export const User =  mongoose.model("User"  ,userSchema);