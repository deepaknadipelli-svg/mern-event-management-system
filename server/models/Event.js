
const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
  name:String,
  organizer:String,
  location:String,
  date:Date,
  description:String,
  capacity:Number,
  category:String
},{timestamps:true})
module.exports = mongoose.model('Event',eventSchema)
