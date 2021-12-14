const Authors = require('../models/Author');
const Books = require('../models/Book');

const mongodbMethods = {
  getBooks: async (condition = null) =>
    condition === null ? await Books.find() : await Books.find(condition),
  getAuthors: async () => await Authors.find(),
  createBook: async (args) => {
    const newBook = new Books(args);
    return await newBook.save();
  },
  createAuthor: async (args) => {
    const newAuthor = new Authors(args);
    return await newAuthor.save();
  },
  getBookDetails: async (id) => {
    return await Books.findById(id);
  },
  getAuthorDetails: async (id) => {
    return await Authors.findById(id);
  },
};

module.exports = mongodbMethods;
