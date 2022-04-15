let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const { format } = require("date-fns");

let FriendRequestSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

FriendRequestSchema.virtual("dateFormatted").get(function () {
  // return this.date;
  return format(this.date, "PPpp");
});

module.exports = mongoose.model("FriendRequest", FriendRequestSchema);
