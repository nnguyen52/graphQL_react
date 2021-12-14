import './App.css';
import { useState, useEffect } from 'react';
import DataDetailed from './components/dataDetailed';
import FormDataAddBook from './components/formData';
import FormDataAddAuthor from './components/FormDataAddAuthor';
// api
// GraphQL
import { ApolloClient, ApolloProvider, gql, InMemoryCache } from '@apollo/client';
import MainData from './components/MainData';
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1 className="text-center w-100 py-3 bg-black text-white"> My data</h1>
        {/* form data */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginLeft: '20px',
            marginRight: '20px',
          }}
        >
          <FormDataAddBook />
          <FormDataAddAuthor />
        </div>
        {/* book list */}
        <MainData />
      </div>
    </ApolloProvider>
  );
}

export default App;
