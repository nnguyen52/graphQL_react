const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    id: ID
    name: String
    genre: String
    # assume each book has only 1 author
    author: Author
  }
  type Author {
    # ! mean must be something (not null or undefined)
    id: ID!
    name: String
    rating: String
    # assume each author can have many books
    books: [Book]
  }

  #   ROOT TYPE
  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
  }
  type Mutation {
    createAuthor(name: String, rating: String): Author
    createBook(name: String, genre: String, authorId: ID!): Book
  }
`;

module.exports = typeDefs;
