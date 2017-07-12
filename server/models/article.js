const mongoose = require('mongoose');
const moment = require('moment');

const articleSchema = new mongoose.Schema({
    article_title: String,
    article_cat: String,
    article_content: String,
    createdTime: {
        type: Date,
        default: moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
    }
});

module.exports = mongoose.model('Article', articleSchema);