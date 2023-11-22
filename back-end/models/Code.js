const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
    },
});

const Code = mongoose.model('Code', codeSchema);

module.exports = Code;
