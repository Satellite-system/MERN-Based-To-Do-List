const mongoose = require('mongoose');
const {Schema} = mongoose;

const ListSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   discription: {
      type: String
   },
   isCompleted: {
      type: Boolean,
      default: false
   },
   date: {
      type: Date,
      default: Date.now
   }
});

module.exports = mongoose.model('List', ListSchema);