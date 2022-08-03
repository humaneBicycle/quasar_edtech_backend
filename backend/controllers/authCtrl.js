const User=require('../models/userModel');
const express=require('express');
const mongoose =require('mongoose') ;
const jwt=require('jsonwebtoken');
const config=require('../config/config')

const catchAsyncError = require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');





const signin= catchAsyncError( async function(req,res){

        const user= await User.findOne({email:req.body.email})
        if(!user){
            return res.status(401).json({error:"User not found"})

        }
  if(!user.isValidPassword(req.body.password)){
    return res.status(401).json({error:"Email or Password does not match"})
  }
  const token=jwt.sign({_id:user._id},config.JWT_SECRET_KEY)
  res.cookie('t',token,{expire:new Date+10000});
  console.log('test')
  
return res.status(200).json({
    token,
    user:{
        _id:user._id,
        name:user.name,
        email:user.email
    }
})


})


const signout=catchAsyncError( function(req,res){

    res.clearCookie('t');
    return res.status(200).json({
        message:"signed out"
    })

})

const anonymous=catchAsyncError( async function(req,res){

   
    const {phone_number}=req.body
    
    if(phone_number===undefined){
        const a =Math.floor( Math.random() * (200000000000-1) + 1);
     
        req.body={
            name:"Anonymous",
           email:`rand${a}@jjfkj.com`
        }
    }


    // console.log(req.body);
    let user = new User(req.body);
    
    
    await user.save()
    
   const {_id}=user
   user1= await User.findOne({_id})
   console.log(user1);

    res.status(200).json({
        success: true,
        message: 'user signed up successfully',
        data:user1

    })


})


const requireSignin=function(req,res){

    
}


const hasAuthorisation=function(req,res){



}


module.exports={anonymous,signin,signout,requireSignin,hasAuthorisation}