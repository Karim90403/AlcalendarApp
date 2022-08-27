const mongoose = require("mongoose");

module.exports = mongoose.model(
    "entrySchema",
    mongoose.Schema(
        {
            strongDays: [String],
            notStrongDays: [String]
        },
        { timestamps: true }
    ),
    "app_entry"
);