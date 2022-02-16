let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const { format } = require("date-fns");

let CommentSchema = new Schema({
  content: { type: String, required: true },
  likes: { type: Number },
  author: { type: String, required: true },
  // author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
});

CommentSchema.virtual("dateFormatted").get(function () {
  // return this.date;
  return format(this.date, "PPpp");
});

module.exports = mongoose.model("Comment", CommentSchema);
