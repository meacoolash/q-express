import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    type: String,
    default: "Common",
  }],
  active: [{
    type: Boolean,
    default: true,
  }],
});

export default mongoose.model("User", UserSchema);

