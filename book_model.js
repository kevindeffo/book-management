const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    publishedDate: {
        type: Date,
        require: true
    },
    userPreferences: {
        type: Object,
        default: {}
    },
    recommendationScore: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Book', bookSchema);
