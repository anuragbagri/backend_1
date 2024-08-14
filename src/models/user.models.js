import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username :{
            type : String ,
            required : true ,
            unqiue : true,
            lowercase : true,
            trim : true ,
            index :true ,       // index : true => searching can be done on this field .username entries.
        },
        email : {
            type : String,
            required : true ,
            unqiue : true ,
            trim : true,
            lowercase : true
        },
        fullname : {
            type : String ,
            required : true , 
            trim : true ,
            index: true
            
        },
        avatar : {
            type : String , // since we are getting a url for our image from cloudinary services
            required : true ,
        },
        coverImage : {
            type : String , //cloudinary url
        },
        watchHistory : [                       // array of objects
            {

                type: Schema.Types.ObjectId,    // reference to video relation
                ref : "Video"
            }
        ],      
        password : {
            type : String,
            required : [true , "password is required"]
        },
        refreshToken : {
            type : String
        }
        },
        {
            timestamps : true
        }
)

// pre hook is used to do some work on data before it is just going to store in db(similar to app.use() in syntaxing)
// schema.pre ("event , callback")
// here ,we will use pre hook to encryt the password jsut before it iis going to be stored.
userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next();        // encrypt the password only if the password has been changed. not for every entry in db
   
    this.password = bcrypt.hash(this.password , 10)        // no of rounds
    next()
})


// add custom method with userSchema

userSchema.methods.ispasswordCorrect =async function (password) {    // design customs methods using schema.methods.function() => {}
     return await bcrypt.compare(password ,this.password)   // return boolean
}

userSchema.methods.generateAccessToken = function () {     // TOKEN IS GENERATED 
   return  jwt.sign(        // below object is payload 
        {
            _id:this._id,                              // this is automaticallygenerated  bymongo db for each entry
            email  : this.email,                       // left is all is taken from the database.
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_EXPIRY_TOKEN
        }
    )
}



userSchema.methods.generateRefreshToken =function() {
     return jwt.sign(
        {   // payload
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
        }
     )
}
export const User = mongoose.model("User" , userSchema)   // name should be in captial and singular (mongoose will store it in small and plural format)