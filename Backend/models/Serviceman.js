const mongoose = require("mongoose");

const servicemanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    category: {
      type: String,
      required: true,
      enum: [
        "Electrician",
        "Plumber",
        "Cleaner",
        "Mechanic",
        "Helper",
        "Home Tutor",
        "Beauty & Salon",
        "Carpenter",
        "Painter",
        "Appliance Repair",
        "Cook",
      ],
    },
    experience: { type: Number, required: true }, // in years
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    hourlyRate: { type: Number, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Serviceman", servicemanSchema);
