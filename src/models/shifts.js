const { Schema, model } = require("mongoose");

const shiftSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    timings: {
      startTime: {
        type: String,
        trim: true,
        required: true,
      },
      endTime: {
        type: String,
        trim: true,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Shift = model("Shift", shiftSchema);
module.exports = Shift;
