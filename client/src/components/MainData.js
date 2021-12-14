import React, { useState } from 'react';
import DataDetailed from './dataDetailed';
import { getBooks } from '../graphQL-Client/queries';
import { useQuery } from '@apollo/client';
const MainData = () => {
  const [bookIdSelected, setBookSelected] = useState(null);
  const { loading, data, error } = useQuery(getBooks);
  if (error) alert(error.message);
  if (loading) return <h1 onClick={() => alert(data)}>Loading</h1>;

  return (
    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
      {!loading && data && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: '60%',
            width: '100%',
          }}
        >
          {data.books.map((each, index) => {
            return (
              <div
                key={index}
                style={{
                  margin: '10px',
                  backgroundColor: 'lightblue',
                  width: '150px',
                  height: '150px',
                  fontSize: '1.5em',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => setBookSelected(each.id)}
              >
                <span> {each.name}</span>
              </div>
            );
          })}
        </div>
      )}
      <DataDetailed bookIdSelected={bookIdSelected} />
    </div>
  );
};

export default MainData;
