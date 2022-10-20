const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Create Schema
const QuerySchema = new Schema({
    exam_name: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    question_number: {
        type: Number,
        required: true
    },
    ta_roll: {
        type: String,
        required: true
    },
    std_roll: {
        type: String,
        required: true
    },
    ta_comment: {
        type: String,
        required: false
    },
    std_comment: {
        type: String,
        required: false
    },
    IsActive: {
        type: Boolean,
        required: true
    }
},
    {timestamps: true});
module.exports = Query = mongoose.model("query", QuerySchema);
