const mongodbMethods = require('../data/db');

const resolvers = {
  // QUERY
  Query: {
    books: async (parent, args, context) => await context.mongodbMethods.getBooks(),
    book: async (parent, args, { mongodbMethods }) => await mongodbMethods.getBookDetails(args.id),
    authors: async (parent, args, { mongodbMethods }) => await mongodbMethods.getAuthors(),
    author: async (parent, args, { mongodbMethods }) => {
      return await mongodbMethods.getAuthorDetails(args.id);
    },
  },
  Book: {
    // assume every bbook has 1 author
    author: async (parent, args, { mongodbMethods }) => {
      console.log('author parent: ', parent);
      console.log('author args: ', args);
      return await mongodbMethods.getAuthorDetails(parent.authorId);
    },
  },
  Author: {
    books: async (parent, args, { mongodbMethods }) => {
      console.log('book parent: ', parent);
      console.log('book args: ', args);
      return await mongodbMethods.getBooks({ authorId: parent.id });
    },
  },

  //   MUTATION
  Mutation: {
    createAuthor: async (parent, args, { mongodbMethods }) => {
      return await mongodbMethods.createAuthor(args);
    },
    createBook: async (parent, args, { mongodbMethods }) => {
      return await mongodbMethods.createBook(args);
    },
  },
};

module.exports = resolvers;
