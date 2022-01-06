let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  sex: { type: String, enum: ["Male", "Female"] },
  age: { type: Number },
  hometown: { type: String },
  bio: { type: String },
  maritalStatus: { type: String },
  school: { type: String },
  hobbies: [{ type: String }],
  posts: [{ type: String }],
});

UserSchema.virtual("url").get(function () {
  return "/profile/" + this._id;
});
module.exports = mongoose.model("User", UserSchema);
