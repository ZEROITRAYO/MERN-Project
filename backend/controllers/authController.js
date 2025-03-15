const User = require('../models/User')
const jwt  = require("jsonwebtoken");

//generate JWT token
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn: "1h"}); 
}


//register user
exports.registerUser = async(req,res) => {
    const{fullName, email, password, profileImageUrl} = req.body;

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
            profileImageUrl
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),           
        });


    }
    catch(err){
        res.status(500).json({message: " Error registering the user", error:err.message});
    }
};

//login user
exports.loginUser = async(req,res) => {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        try{
            const user = await User.findOne({email}); 
            if(!user|| !await user.comparePassword(password)){
                return res.status(404).json({message: "Invalid credentials"});
            }


            res.status(200).json({
                id: user._id,
                user,
                token: generateToken(user._id),
            });
        }
        catch(err){
            res.status(500).json({message: "Error logging in the user", error:err.message}); 
        }
};

//get user info
exports.getUserInfo = async(req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json(user);
    }

    catch{
        res.status(500).json({message: "Error getting user info", error:err.message});
    }
};