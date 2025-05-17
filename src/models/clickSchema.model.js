import mongoose, { Schema } from "mongoose";

const clickSchema = new Schema({
  timestamp: String,
  ip: String,
  city: String,
  region: String,
  deviceType: String,
  os: String,
  deviceVendor: String,
  referrer: String,
  redirectedTo: String,
});
export const Click = mongoose.model("Click", clickSchema);
