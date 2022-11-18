const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Name required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Address required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number required"],
  },
  website: {
    type: String,
    required: [true, "Website required"],
  },
  PrEP: {
    type: Boolean,
  },
  PEP: {
    type: Boolean,
  },
  insurance: {
    type: Boolean,
  },
  testing: {
    type: Boolean,
  },
  longitude: {
    type: Number,
    required: [true, "Longitude required"],
  },
  latitude: {
    type: Number,
    required: [true, "Latitude required"],
  },
});

UserSchema.methods.toJSON = function () {
  const { password, _id, __v, ...user } = this.toObject();
  user.uid = _id; // uid is only for display purposes, _id still exists on the backend
  return user;
};

module.exports = model("User", UserSchema);
