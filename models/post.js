const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { format } = require("date-fns");

let PostSchema = new Schema(
  {
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    // author: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    photo: { type: String },
  },
  {
    timestamps: true,
  }
);

PostSchema.virtual("dateFormatted").get(function () {
  // return this.date;
  return format(this.date, "PPpp");
});

module.exports = mongoose.model("Post", PostSchema);
