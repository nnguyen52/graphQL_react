import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthors, getBooks } from '../graphQL-Client/queries';
import { addBook } from '../graphQL-Client/mutation';
const FormDataAddBook = () => {
  const { loading, error, data } = useQuery(getAuthors);
  const [newBook, setNewbook] = useState({
    name: '',
    genre: '',
    authorId: '',
  });
  const { name, genre, authorId } = newBook;

  // MUTATION
  // if call addBookFunc => use mutation
  // dataMutation: info of that mutation is happening
  const [addBookFunc, dataMutation] = useMutation(addBook);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !genre) return alert('please fill in the form (name, genre)!');
    if (authorId === '') return alert('please choose an author!');
    await addBookFunc({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooks }],
    });
    setNewbook({ name: '', genre: '', authorId: '' });
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: '1em', marginBottom: '1em', width: '100%', maxWidth: '40%' }}
    >
      <input
        style={{ display: 'block', width: '100%', margin: '10px' }}
        type="text"
        name="name"
        value={name}
        placeholder="Book name"
        onChange={(e) => setNewbook({ ...newBook, [e.target.name]: e.target.value })}
      />
      <input
        style={{ display: 'block', width: '100%', margin: '10px' }}
        type="text"
        name="genre"
        value={genre}
        placeholder="Book genre"
        onChange={(e) => setNewbook({ ...newBook, [e.target.name]: e.target.value })}
      />
      <select
        name="authorId"
        disabled={loading}
        onChange={(e) => setNewbook({ ...newBook, [e.target.name]: e.target.value })}
      >
        <option value="">Select an author</option>
        {data &&
          data.authors.map((each) => {
            return (
              <option value={each.id} key={each.id}>
                {each.name}
              </option>
            );
          })}
      </select>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          maxWidth: '100vw',
        }}
      >
        <button type="submit" className="btn btn-primary">
          Create new Data
        </button>
      </div>
    </form>
  );
};

export default FormDataAddBook;
