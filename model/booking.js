const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    cleaner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    jobTitle: {
      type: String,
      required: true,
    },
    jobRef: {
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
    images: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["rescheduled", "inProgress", "cancelled", "completed", "pending"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const bookingModel= mongoose.model("Booking",bookingSchema);
module.exports=bookingModel;