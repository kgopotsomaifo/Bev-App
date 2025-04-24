const mongoose = require("mongoose");

// define a schema and export
const clubSchema = new mongoose.Schema({
  outletName: {
    type: String,
    required: true,
  },
  brandName: String,
  location: String,
  status: String,
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("clubs", clubSchema);
