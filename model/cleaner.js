const mongoose = require("mongoose");

const userSechema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  shareCode: {
    type: String,
    required:true
  },
  visaType: {
    type: String,
    required: true},

  ni: {
    type: String,
  },
  workType: {
    type: String,
    enum: ["self employed", "paye"],
    required: true,
  },

  dob: {
    type: String,
    required: true,
  },
  iDImages: {
    type: [String],
    enum: ["addressImage", "passport"],
    required: true,
  },
  avatar: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },

  isVerified:{
    type:Boolean,
    default:false
  },

  role:{
    type:String,
    enum:["customer","cleaner", "admin"],
    required:true
  }
});

const userModel = mongoose.model("User", userSechema);
module.exports = userModel;
