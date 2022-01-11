const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,

    },

    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    countryCode: {
        type: String,
        required: true,
        trim: true,
      },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);