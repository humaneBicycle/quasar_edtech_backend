const mongoose = require('mongoose');   
const crypto = require('crypto');




const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        trim:true,
        default:'user'
        // required:['Name is required']
    },
    user_id:{
        type:String,
        trim:true,
        unique:[true,'user id is already taken']

    },
    phone_number:{
        type:Number,
        require:[function(value){
            if(this.is_anonymous){
            return false
        }else
        {return true}},'please Enter your phone number']
    }
    ,
    // email:{
    //     type:String,
    //     trim:true,
    //     dropDups: true,
    //     match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    //     required:[function(value){
    //         if(this.is_anonymous||this.phone_number){
    //         return false
    //     }else {return true}},'Email is required']
    // },


analysis:[String]    ,
upcommingeventsubbed:[{
    _id:false,
    user_id:String,
    event_id:mongoose.Schema.Types.ObjectId,
    is_paid:Boolean,
    price:Number,
    lesson_id:mongoose.Schema.Types.ObjectId,
    subscribed_at:Number,
     title:{
        type:String
    },
    time:{
        date_full: String,
        date: Number,
        month: String,
        year: Number
        },
    venue:{
        type:String
    }

}], 
is_anonymous:{
    type:Boolean,
    default:false
},
lessons_completed:{
    type:Number,
default:0},
video_watched:{
    type:Number,
default:0},
test_given:{
    type:Number,
default:0},
avg_percentage_test:{
    type:Number,
default:0},
last_lesson:{
title:{
    type:String,
    default:'User has not seen any lesson'
},
    lesson_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Lesson',
    default:undefined
}

},
last_unit:{
title:{
    type:String,
    trim:true,
    default:''

},
    unit_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Unit'
}

},
total_answer_given:Number,
total_question_asked:Number,
last_lesson_progress:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Progress'
},
units_completed:[{
   
}]
  
}
,{timestamps:{createdAt:'created_at',updatedAt:'updated_at'}});


 module.exports= mongoose.model('User',userSchema);
    
    
    
    
    
    
