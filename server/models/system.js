const mongoose = require('mongoose');

const systemSchema = new mongoose.Schema({
    blog_poster: String,
    blog_title: String,
    blog_desc: String
});

module.exports = mongoose.model('System', systemSchema);