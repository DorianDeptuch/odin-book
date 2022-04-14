let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const { format } = require("date-fns");

let NotificationSchema = new Schema(
  {
    content: { type: String },
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    recipient: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
    type: {
      type: String,
      enum: [
        "Poke",
        "Friend Request Accept",
        "Liked Comment",
        "Liked Post",
        "Comment On Post",
        "Friend Posted",
        "Welcome Notification",
      ],
    },
  },
  {
    timestamps: true,
  }
);

NotificationSchema.virtual("dateFormatted").get(function () {
  // return this.date;
  return format(this.date, "PPpp");
});

module.exports = mongoose.model("Notification", NotificationSchema);
