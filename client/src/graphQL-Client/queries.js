import { gql } from '@apollo/client';
const getBooks = gql`
  query getBooksQuery {
    books {
      id
      name
    }
  }
`;
const getBookDetail = gql`
  # getBookDetail ($id) => $id is param
  query getBookDetail($id: ID!) {
    # book (id)=> id is from schema
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        rating
        books {
          id
          name
          genre
        }
      }
    }
  }
`;
const getAuthors = gql`
  query getAuthors {
    authors {
      id
      name
      rating
    }
  }
`;
export { getBooks, getBookDetail, getAuthors };
