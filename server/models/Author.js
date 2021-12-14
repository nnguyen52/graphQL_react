const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Book = require('./Book');
const AuthorSchema = new Schema({
  name: {
    type: String,
  },
  rating: {
    type: String,
  },
});
module.exports = mongoose.model('authors', AuthorSchema);
