import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is Required"]
    },
    email:{
        type:String,
        required:[true, "EMail is required"],
        unique: true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required: [true, "Password is Required"],
        minlength: [6, "Password Should be at least 6 charecters long"],


    },
    cartItems:[
        {
            quantity:{
                type: Number,
                default: 1
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        }
    ],
    role:{
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
}, {
    // created at and updated user
    timestamps: true
});

 

 // bcrypt code pre save hook to hash  password before saving to database
 userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
        
    } catch (error) {
        next(error)
        
    }
    
 })

 // compare password

 userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);

    
 };

 const User = mongoose.model("User", userSchema);

 export default User;