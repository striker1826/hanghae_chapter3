const mongoose = require("mongoose");

// required: 무조건 필요한지
const commentSchema = new mongoose.Schema({
      commentId: {
         type: String,
         required: true
      },
      password: {
         type: String,
         required: true,
         unique: true
      },

      user: {
         type: String,
         required: true,
         unique: true
      },

      content: {
         type: String
      },

      createdAt: {type:Date,default:Date.now}
})

module.exports = mongoose.model("comment", commentSchema);