import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBookDetail } from '../graphQL-Client/queries';
const DataDetailed = ({ bookIdSelected }) => {
  const [bookDetail, setBookDetail] = useState(null);
  const { loading, error, data } = useQuery(getBookDetail, {
    variables: {
      id: bookIdSelected,
    },
    skip: bookIdSelected === null,
  });
  if (error) console.log(error.message);
  useEffect(() => {
    if (loading) return;
    if (data && data !== bookDetail) setBookDetail(data.book);
  }, [bookIdSelected, loading, data]);
  if (loading) {
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '40%',
          backgroundColor: 'black',
          color: 'white',
          height: '300px',
        }}
      >
        Loading...
      </div>
    );
  }
  if (!bookDetail)
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '40%',
          backgroundColor: 'black',
          fontSize: '1.7em',
          color: 'white',
          height: '300px',
        }}
      >
        choose any data to see more details
      </div>
    );
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '40%',
        backgroundColor: 'lightgreen',
        fontSize: '1.7em',

        height: '300px',
        overflow: 'auto',
      }}
    >
      <h4>{bookDetail.name}</h4>
      {bookDetail.rating}
      <h5 style={{ color: 'white', backgroundColor: 'black' }}>{bookDetail.genre}</h5>
      author : <b>{bookDetail.author.name}</b>
      <h5>All data from this author:</h5>
      {bookDetail.author.books.map((each, index) => {
        return <div key={index}> + {each.name}</div>;
      })}
    </div>
  );
};

export default DataDetailed;
