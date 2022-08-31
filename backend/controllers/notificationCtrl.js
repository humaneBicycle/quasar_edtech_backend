const Notification=require('../models/notificationModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {tsend,send} = require('../middleware/responseSender');



const list=catchAsyncError(  async function(req ,res,){
const notification=await Notification.find({}).lean();
tsend(notification,'',res)
})

const create=catchAsyncError( async function(req ,res){

    const notification = new Notification(req.body);
    await notification.save()
    tsend(notification,'',res)

})

const read=catchAsyncError(async function(req ,res){
    const {notification_id}=req.body
    const notification=await Notificaton.findById(notification_id).lean();
       tsend(notification,'',res)
       
   })

const remove= catchAsyncError( async function(req ,res){
const {notification_id}=req.body
    const notification= await Notification.findById(notification_id)
await notification.remove();

    tsend({},'message deleted successfully',res)

})

const update = catchAsyncError( async function(req ,res){
const {notification_id}=req.body
   await Notification.findByIdAndUpdate(notification_id,req.body)
  const updatedvalue=await Notification.findById(notification_id).lean()
   tsend(updatedvalue,'updated successfully',res)
    

})

module.exports = {list,read,update,create,remove
}


   