const mongoose = require('mongoose')

var EmployeeSchema = new mongoose.Schema(
   {
       name: { type: String, lowercase: true, required: true },
       document: { type: String, required: true, unique: true },
       phone: { type: Number, required: true },
       email: {type: String, required: true},
       salary: { type: Number, required: true },
       gender: { type: String, required: true },
       dob: { type: Date, required: true },
       createdAt: { type: Date, default : Date.now()},
       uptadedAt: { type: Date, default : Date.now()}
   }
);

module.exports =  mongoose.model('employees', EmployeeSchema)