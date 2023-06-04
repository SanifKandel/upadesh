const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    ismentor: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const mentor = mongoose.model("mentor", schema);

module.exports = mentor;
