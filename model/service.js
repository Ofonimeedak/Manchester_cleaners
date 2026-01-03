const mongoose=require('mongoose')

const serviceSchema = new mongoose.Schema(
  {
    cleaner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "regular",
        "deep",
        "endOfTenancy",
        "office",
        "commercial",
        "carpet"
      ],
      required: true,
    },

    pricePerHour: {
      type: Number,
      min: 13,
      required: true,
    },

    minimumHours: {
      type: Number,
      default: 3,
    },

    estimatedDuration: {
      type: Number, // minutes
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
 const serviceModel= mongoose.model("Service", serviceSchema);
 module.export=serviceModel;