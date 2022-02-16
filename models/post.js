const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { format } = require("date-fns");

let PostSchema = new Schema({
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Schema.Types.ObjectId, ref: "Comment" },
  author: { type: String, required: true },
  // author: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  photo: { type: String },
});

PostSchema.virtual("dateFormatted").get(function () {
  // return this.date;
  return format(this.date, "PPpp");
});

module.exports = mongoose.model("Post", PostSchema);
