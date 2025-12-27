const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const profileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: [serviceSchema],
    review: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Unavailable",
    },
    images: {
      type: [String],
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinate: {
        type: [Number],
        required: true,
      },
      updatedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  },
  { timestamps: true }
);

profileSchema.index({location:"2dsphere"})

const profileModel = mongoose.model("Profile", profileSchema);
module.exports = profileModel;
