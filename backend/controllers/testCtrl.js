const Lesson=require('../models/lessonModel');
const Progress=require('../models/progressModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {send,tsend}=require('../middleware/responseSender')

const startTest=catchAsyncError(async function(req,res){
   const {lesson_id,unit_id,user_id}=req.body
    const test = await Lesson.findById(lesson_id).select('title num_question time_allowed questions');
    let testProgress= await Progress.findOne({user_id})//.select('test_answers option_choosed test_evaluation test_taken avg_test_score');
    // console.log(testProgress)
const arr=testProgress.test_evaluation
console.log(arr)
startTime=Date.now();
    const test_record={
        lesson_id:lesson_id,
        start_time:startTime,
        submit_time:undefined,
        test_score:undefined
        }

        arr.push(test_record);
    
    // const index = arr.findIndex(object => {
    //     return object.lesson_id == lesson_id}
    // )
    // if (index !== -1) {
    //     arr[index].name = 'John';
    //   }
    await testProgress.save()
    tsend(test,'Test started successfully',res)
// testProgress.test_evaluation[lesson_id]

})
const submitTest=catchAsyncError(async function(req,res,next){
  
    const {lesson_id,unit_id,user_id}=req.body
    const testProgress= await Progress.findOne({user_id}).select('test_evaluation'); 
    const arr=testProgress.test_evaluation
submitTime=Date.now();

const index = arr.findIndex(object => {
        return object.lesson_id == lesson_id}
    )
    if (index !== -1) {
        arr[index].submit_time = submitTime;
    }
    else{
        next(new errorHandler('you cannot sumbit before start of test',500))
    }
      await  testProgress.save()
    tsend(testProgress,'Test submitted successfuly',res)

})
// const submitTest=catchAsyncError(async function(req,res){

// })

module.exports={startTest,submitTest}
