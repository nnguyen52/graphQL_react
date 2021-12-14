import { gql } from '@apollo/client';
const addBook = gql`
  mutation addbook($name: String, $genre: String, $authorId: ID!) {
    createBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;
const addAuthor = gql`
  mutation addAuthor($name: String, $rating: String) {
    createAuthor(name: $name, rating: $rating) {
      id
      name
    }
  }
`;
export { addBook, addAuthor };
