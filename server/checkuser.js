const express = require('express');
const router = express.Router();
const User = require('./models/userModel');

const isAdmin =  async(req,res,next)=>{
const {id} = req.user;
const user = await User.findById(id);
if(user.role === 'admin'){
    console.log("This is Admin");
    next();
}
else{
    res.json("You should be an Admin to perform this");
}
};

    module.exports = { isAdmin };