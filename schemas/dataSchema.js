const mongoose = require("mongoose");

module.exports = mongoose.model(
    "dataSchema",
    mongoose.Schema(
        {
            login: String,
            password: String,
            token: String,
            strongDays: [String],
            notStrongDays: [String]
        },
        { timestamps: true }
    ),
    "app_entry"
);