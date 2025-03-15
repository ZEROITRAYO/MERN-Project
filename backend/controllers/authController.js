const User = require('../models/User')
const jwt  = require("jsonwebtoken");

//generate JWT token
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: "1h"}); 
}


//register user
exports.registerUser = async(req,res) => {
    const{fullName, email, password, profileurl} = req.body;

    //Validation for checking mssing fields
    if(!fullName || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    try{
        //check if email already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exist"});
        }

        //Create the User
        const user  = await User.create({
            fullName,
            email,
            password,
            profileurl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),           
        });


    }
    catch(error){
        res.status(500).json({message: " Error registering the user", error});
    }
};

//login user
exports.loginUser = async(req,res) => {};

//r 
exports.getUserInfo = async(req,res) => {};