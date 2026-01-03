
const mongoose=require('mongoose');

const cleanerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    email:{
      type:String,
      required:true
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },

    // Verification fields
    visaType: { type: String, required: true },
    niNumber: { type: String },
    workType: { type: String, enum: ["self-employed", "paye"], required: true },
    dob: { type: Date, required: true },
    idImages: [
      {
        type: { type: String, enum: ["passport", "address"], required: true },
        url: { type: String, required: true },
      },
    ],
    shareCode: { type: String, required: true },

    // Public profile info
    bio: { type: String, maxLength: 500 },
    avatar: String,
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },
    availability: { type: String, enum: ["available", "unavailable"], default: "unavailable" },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  },
  { timestamps: true }
);

// Required for geo queries
cleanerProfileSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("CleanerProfile", cleanerProfileSchema);

