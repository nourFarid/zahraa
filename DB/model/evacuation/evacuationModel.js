const mongoose = require("mongoose");

const evacuationSchema = new mongoose.Schema(
{
studentId : {type: mongoose.ObjectId, ref: 'User'},
studentName:{type:String},
College:{type:String},
roomId:{type: mongoose.ObjectId, ref: 'Rooms'},
evacuationDate :{type: Date}, // إخلاء السكن
evacuationType : {type : String, enum:['نصف العام الدراسي' , 'نهاية العام الدراسي']},
evacuationReason :{type: String, enum :[  'إخلاء تحويل', 'إخلاء نهائي','إخلاء اجازات' , 'إخلاء انتقالات']},

})

module.exports = mongoose.model("evacuation", evacuationSchema);
