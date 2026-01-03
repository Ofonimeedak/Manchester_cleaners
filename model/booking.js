const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema(
  {
    cleaner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // assigned when accepted
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    jobRef: {
      type: String,
      required: true,
      unique: true,
    },

    location: {
      address: { type: String, required: true },
      postCode: { type: String, required: true },
      lat: Number,
      lng: Number,
    },

    images: {
      type: [String], // before / after photos
    },

    jobDescription: {
      type: String,
      required: true,
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    serviceDuration: {
      type: Number, // minutes
      required: true,
    },

    rate: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",     // waiting for cleaner
        "accepted",    // cleaner accepted
        "inProgress",  // cleaner started
        "completed",   // finished
        "cancelled",   // cancelled by cleaner/customer
        "rescheduled",
      ],
      default: "pending",
    },

    cancellation: {
      cancelledBy: {
        type: String,
        enum: ["customer", "cleaner", "system"],
      },
      reason: String,
      cancelledAt: Date,
    },

    payment: {
      status: {
        type: String,
        enum: ["pending", "paid", "refunded"],
        default: "pending",
      },
      transactionRef: String,
    },

    acceptedAt: Date,
    startedAt: Date,
    completedAt: Date,
  },
  { timestamps: true }
);


const bookingModel = mongoose.model("Booking", bookingSchema);
module.exports = bookingModel;
