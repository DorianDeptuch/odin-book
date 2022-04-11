let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const { format } = require("date-fns");

let NotificationSchema = new Schema(
  {
    content: { type: String },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
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
