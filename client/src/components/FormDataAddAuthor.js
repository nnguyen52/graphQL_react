import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthors } from '../graphQL-Client/queries';
import { addAuthor } from '../graphQL-Client/mutation';
const FormDataAddBook = () => {
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    rating: '',
  });
  const { name, rating } = newAuthor;
  const { loading, error, data } = useQuery(getAuthors);
  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return alert('please wait for server and try again!');
    if (
      data &&
      data.authors
        .map((e) => e.name)
        .findIndex((item) => item.toLowerCase() === name.trim().toLowerCase()) > -1
    )
      return alert('this author existed! please choose another one');
    if (!rating) alert('please fill the rating (comment)');
    await addAuthorFunc({ variables: { name, rating }, refetchQueries: [{ query: getAuthors }] });
    setNewAuthor({ name: '', rating: '' });
  };
  // MUTATION
  const [addAuthorFunc, dataMutation] = useMutation(addAuthor);
  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: '1em', marginBottom: '1em', width: ' 100%', maxWidth: '40%' }}
    >
      <input
        style={{ display: 'block', width: '100%', margin: '10px' }}
        type="text"
        name="name"
        value={name}
        placeholder="Author name"
        onChange={(e) => setNewAuthor({ ...newAuthor, [e.target.name]: e.target.value })}
      />
      <input
        style={{ display: 'block', width: '100%', margin: '10px' }}
        type="text"
        name="rating"
        value={rating}
        placeholder="Author Rating"
        onChange={(e) => setNewAuthor({ ...newAuthor, [e.target.name]: e.target.value })}
      />
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
          Create new Author
        </button>
      </div>
    </form>
  );
};

export default FormDataAddBook;
